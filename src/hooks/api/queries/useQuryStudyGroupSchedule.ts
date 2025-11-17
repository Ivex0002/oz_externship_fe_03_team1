import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../queryKeys'
import { api } from '@/api/api'

interface StudyGroupScheduleParams {
  groupId: string | undefined
}

export const useQueryStudyGroupSchedule = (params: StudyGroupScheduleParams) => {
    return useQuery({
    queryKey: queryKeys.studies.groups.schedules(params.groupId),
    queryFn: () =>
      {if(!params.groupId) throw new Error("스터디 그룹 을 받아올 수 없습니다.")
        return api.v1.studies.groups(params.groupId).schedules.GET()},
  })
}