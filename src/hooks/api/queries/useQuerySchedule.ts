import { api } from '@/api/api'
import { queryKeys } from '../queryKeys'
import { useQuery } from '@tanstack/react-query'

export interface ScheduleDetailParams {
  scheduleId: string
}

// (스웨거) 강의 목록 검색, 필터링, 정렬 조회 기능 누락
export const useQueryScheduleDetail = (params: ScheduleDetailParams) => {
  const { scheduleId } = params
  return useQuery({
    queryKey: queryKeys.studies.groups.schedules(scheduleId),
    queryFn: () => api.v1.studies.schedules(scheduleId).GET(),
  })
}
