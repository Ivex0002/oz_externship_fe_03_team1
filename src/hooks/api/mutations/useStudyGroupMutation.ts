import { useMutation } from '@tanstack/react-query'
import { queryKeys } from '@/hooks/api/queryKeys'
import { queryClient } from '@/hooks/api/queryClient'
import { toast } from 'react-toastify'
import axios from 'axios'

// API 함수들
const delegateLeaderAPI = async (studyGroupId: string, targetMemberId: string) => {
  const response = await axios.post(
    `/api/v1/studies/groups/${studyGroupId}/delegate-leader`,
    { target_member_uuid: targetMemberId }
  )
  return response.data
}

const expelMemberAPI = async (studyGroupId: string, targetMemberId: string) => {
  const response = await axios.delete(
    `/api/v1/studies/groups/${studyGroupId}/kick-member`,
    { data: { target_member_uuid: targetMemberId } }
  )
  return response.data
}

const leaveStudyGroupAPI = async (studyGroupId: string) => {
  const response = await axios.delete(
    `/api/v1/studies/groups/${studyGroupId}/leave`
  )
  return response.data
}

export const useStudyGroupMutation = (studyGroupId: string) => {
  // 1. 리더 위임 mutation
  const delegateLeaderMutation = useMutation({
    mutationFn: (targetMemberId: string) => 
      delegateLeaderAPI(studyGroupId, targetMemberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.studies.groups.members(studyGroupId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.studies.groups.detail(studyGroupId),
      })
      toast.success('리더 위임이 완료되었습니다.')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || '리더 위임에 실패했습니다.'
      toast.error(errorMessage)
      console.error('리더 위임 실패:', error)
    },
  })

  // 2. 멤버 추방 mutation
  const expelMemberMutation = useMutation({
    mutationFn: (targetMemberId: string) =>
      expelMemberAPI(studyGroupId, targetMemberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.studies.groups.members(studyGroupId),
      })
      toast.success('멤버가 추방되었습니다.')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || '멤버 추방에 실패했습니다.'
      toast.error(errorMessage)
      console.error('멤버 추방 실패:', error)
    },
  })

  // 3. 스터디 그룹 나가기 mutation
  const leaveGroupMutation = useMutation({
    mutationFn: () => leaveStudyGroupAPI(studyGroupId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.studies.groups.lists(),
      })
      queryClient.removeQueries({
        queryKey: queryKeys.studies.groups.detail(studyGroupId),
      })
      toast.success('스터디 그룹을 나갔습니다.')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || '스터디 그룹 나가기에 실패했습니다.'
      toast.error(errorMessage)
      console.error('스터디 그룹 나가기 실패:', error)
    },
  })

  return {
    delegateLeader: delegateLeaderMutation,
    expelMember: expelMemberMutation,
    leaveStudyGroup: leaveGroupMutation,
  }
}