import { useMutation } from '@tanstack/react-query'
import { queryKeys } from '@/hooks/api/queryKeys'
import { queryClient } from '@/hooks/api/queryClient'
import { toast } from 'react-toastify'
import axios from 'axios'

interface CreateStudyRecordParams {
  title: string
  summary: string
  groupId: string
}

// API 함수
const createStudyRecordAPI = async (params: CreateStudyRecordParams) => {
  const response = await axios.post(
    '/api/v1/studies/notes',
    {
      title: params.title,
      summary: params.summary,
      group_id: params.groupId,
    }
  )
  return response.data
}

export const useStudyRecordMutation = (groupId: string) => {
  const createRecordMutation = useMutation({
    mutationFn: (params: Omit<CreateStudyRecordParams, 'groupId'>) =>
      createStudyRecordAPI({ ...params, groupId }),
    onSuccess: () => {
      // 스터디 기록 목록 새로고침
      queryClient.invalidateQueries({
        queryKey: queryKeys.studies.groups.notes(groupId),
      })
      toast.success('스터디 기록이 작성되었습니다.')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || '스터디 기록 작성에 실패했습니다.'
      toast.error(errorMessage)
      console.error('스터디 기록 작성 실패:', error)
    },
  })

  return {
    createRecord: createRecordMutation,
  }
}