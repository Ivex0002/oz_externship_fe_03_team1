import { useMutation } from '@tanstack/react-query';
import { delegateLeader, expelMember, leaveStudyGroup } from '@/hooks/api/studyGroupApi';
import { queryKeys } from '@/hooks//api/queryKeys';
import { queryClient } from './api/queryClient';

export const useStudyGroupMutation = (studyGroupId: string) => {

  // 1. 리더 위임 mutation (기존 로직)
  const delegateLeaderMutation = useMutation({
    mutationFn: (targetUserId: string) =>
      delegateLeader({ studyGroupId, targetUserId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.studies.groups.members(studyGroupId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.studies.groups.detail(studyGroupId),
      });
    },
    onError: (error) => {
      console.error('리더 위임 실패:', error);
    },
  });

  // 2. 멤버 추방 mutation (기존 로직)
  const expelMemberMutation = useMutation({
    mutationFn: (targetMemberId: string) =>
      expelMember({ studyGroupId, targetMemberId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.studies.groups.members(studyGroupId),
      });
    },
    onError: (error) => {
      console.error('멤버 추방 실패:', error);
    },
  });

  // 3. 스터디 그룹 나가기 mutation
  const leaveGroupMutation = useMutation({
    // 인자가 필요 없으므로 studyGroupId만 클로저로 캡처하여 호출
    mutationFn: () => leaveStudyGroup(studyGroupId), 
    onSuccess: () => {
      // 나가면 목록에서 사라져야 하므로 스터디 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: queryKeys.studies.groups.lists(),
      });
      // 현재 페이지를 떠나므로 상세 정보 캐시는 제거 (removeQueries)
      queryClient.removeQueries({
        queryKey: queryKeys.studies.groups.detail(studyGroupId),
      });
    },
    onError: (error) => {
      console.error('스터디 그룹 나가기 실패:', error);
    },
  });

  return {
    delegateLeader: delegateLeaderMutation,
    expelMember: expelMemberMutation,
    leaveStudyGroup: leaveGroupMutation, 
  };
};