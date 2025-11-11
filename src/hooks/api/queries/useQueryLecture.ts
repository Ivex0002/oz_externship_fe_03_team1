import { api } from '@/api/api'
import { queryKeys } from '../queryKeys'
import { useQuery } from '@tanstack/react-query'

export interface LectureParams {
  page: number
  page_size: number
  search: string | null
}

// (스웨거) 강의 목록 검색, 필터링, 정렬 조회 기능 누락
export const useQueryLecture = (params: LectureParams) => {
  return useQuery({
    queryKey: queryKeys.lectures.list(params),
    queryFn: () => api.v1.lectures.GET(undefined, { params }),
  })
}

export const useQueryLectureCategories = () => {
  return useQuery({
    queryKey: queryKeys.lectures.categories(),
    queryFn: () => api.v1.lectures.categories.GET,
  })
}
