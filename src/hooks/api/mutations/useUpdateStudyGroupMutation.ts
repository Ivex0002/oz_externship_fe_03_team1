import { useMutation } from '@tanstack/react-query'
import { api } from '@/api/api'
import type { StudyGroupUpdate } from '@/types/StudyGroupTypes'
import { queryClient } from '../queryClient'
import { queryKeys } from '../queryKeys'
import { toast } from 'react-toastify'

export const useUpdateStudyGroupMutation = () => {
  return useMutation({
    mutationFn: ({
      group_uuid,
      payload,
    }: {
      group_uuid: string
      payload: StudyGroupUpdate
    }) => {
      return api.v1.studies.groups(group_uuid).PUT(payload)
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.studies.groups.all(),
      })
      toast.success('스터디 그룹이 수정되었습니다!')
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        '스터디 그룹 수정에 실패했습니다. 다시 시도해주세요.'

      toast.error(message)
    },
  })
}
