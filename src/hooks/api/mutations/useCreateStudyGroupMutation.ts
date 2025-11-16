import { useMutation } from '@tanstack/react-query'
import { api } from '@/api/api'
import type { StudyGroupPost } from '@/types/StudyGroupTypes'
import { queryClient } from '../queryClient'
import { queryKeys } from '../queryKeys'

export const useCreateStudyGroupMutation = () => {
  return useMutation({
    mutationFn: (formData: StudyGroupPost) => {
      return api.v1.studies.groups.POST(formData)
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.studies.groups.all(),
      })
    },

    onError: (error) => {
      console.error('스터디 그룹 생성 실패:', error)
    },
  })
}
