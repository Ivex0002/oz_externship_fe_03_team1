import { useMutation } from '@tanstack/react-query'
import { queryKeys } from '@/hooks/api/queryKeys'
import { queryClient } from '@/hooks/api/queryClient'
import { toast } from 'react-toastify'
import { api } from '@/api/api'

export const useStudyGroupMutation = (studyGroupId: string) => {
  // 1. 리더 위임 mutation
  const delegateLeaderMutation = useMutation({
    mutationFn: (targetMemberId: string) => 
      api.v1.studies.groups(studyGroupId)['delegate-leader'].POST({target_member_uuid:targetMemberId}),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.studies.groups.members(studyGroupId),
      })
      toast.success('리더 위임이 완료되었습니다.')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  // 2. 멤버 추방 mutation
  const expelMemberMutation = useMutation({
    mutationFn: (targetMemberId: string) =>
      api.v1.studies.groups(studyGroupId)['kick-member'].DELETE({target_member_uuid:targetMemberId}),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.studies.groups.members(studyGroupId),
      })
      toast.success('멤버가 추방되었습니다.')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  // 3. 스터디 그룹 나가기 mutation
  const leaveGroupMutation = useMutation({
    mutationFn: () => api.v1.studies.groups(studyGroupId).leave.DELETE(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.studies.groups.lists(),
      })
      queryClient.removeQueries({
        queryKey: queryKeys.studies.groups.detail(studyGroupId),
      })
      toast.success('스터디 그룹을 나갔습니다.')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return {
    delegateLeader: delegateLeaderMutation,
    expelMember: expelMemberMutation,
    leaveStudyGroup: leaveGroupMutation,
  }
}