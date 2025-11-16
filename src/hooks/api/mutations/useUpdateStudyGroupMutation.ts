import { useMutation } from '@tanstack/react-query'
import { api } from '@/api/api'
import type { StudyGroupUpdate } from '@/types/StudyGroupTypes'
import { queryClient } from '../queryClient'
import { queryKeys } from '../queryKeys'

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
    },

    onError: (error) => {
      console.error('스터디 그룹 수정 실패:', error)
    },
  })
}
