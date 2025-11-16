import { useMutation } from '@tanstack/react-query'
import { api } from '@/api/api'
import type { StudyGroupPost } from '@/types/StudyGroupTypes'
import { queryClient } from '../queryClient'
import { queryKeys } from '../queryKeys'
import { toast } from 'react-toastify'

export const useCreateStudyGroupMutation = () => {
  return useMutation({
    mutationFn: (formData: StudyGroupPost) => {
      return api.v1.studies.groups.POST(formData)
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.studies.groups.all(),
      })
      toast.success('스터디 그룹이 생성되었습니다!')
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          '스터디 그룹 생성에 실패했습니다. 다시 시도해주세요.'
      )
    },
  })
}
