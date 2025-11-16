import { api } from '@/api/api'
import { queryKeys } from '../queryKeys'
import { useQuery } from '@tanstack/react-query'

export interface RecordDetailParams {
  groupId: string
  noteId: number
}

// (스웨거) 강의 목록 검색, 필터링, 정렬 조회 기능 누락
export const useQueryRecordDetail = (params: RecordDetailParams) => {
  return useQuery({
    queryKey: queryKeys.studies.groups.notes(params.groupId),
    queryFn: () => api.v1.studies.notes(params.noteId).GET(),
  })
}
