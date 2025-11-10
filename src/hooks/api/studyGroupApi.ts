import { api } from "@/api/api";

interface StudyGroupLeaderAuthorityParams {
  studyGroupId: string;
  targetMemberId: string;
}
// 리더 위임 API
export const delegateLeader = async (params: StudyGroupLeaderAuthorityParams) => {
  const { studyGroupId, targetMemberId } = params;
  const response = await api.v1.studies.groups(studyGroupId).delegate$leader.POST({
    target_member_uuid: targetMemberId,
  });
  return response;
};

// 멤버 추방 API
export const expelMember = async (params: StudyGroupLeaderAuthorityParams) => {
  const { studyGroupId, targetMemberId } = params;
  const response = await api.v1.studies.groups(studyGroupId).members(targetMemberId).DELETE();
  return response;
};

// 스터디 그룹 나가기 API
export const leaveStudyGroup = async (studyGroupId: string) => {
  const response = await api.v1.studies.groups(studyGroupId).leave.DELETE();
  return response;
};