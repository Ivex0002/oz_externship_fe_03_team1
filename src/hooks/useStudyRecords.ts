import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/hooks/api/queryKeys'
import { toast } from 'react-toastify'
import axios from 'axios'
import type { StudyRecord } from '@/types/Schedule'
import { useEffect } from 'react'

// API 함수
const fetchStudyRecordsAPI = async (groupId: string): Promise<StudyRecord[]> => {
  const response = await axios.get(
    `/api/v1/studies/groups/${groupId}/notes`
  )
  return response.data
}

export const useStudyRecords = (groupId: string) => {
  const query = useQuery({
    queryKey: queryKeys.studies.groups.notes(groupId),
    queryFn: () => fetchStudyRecordsAPI(groupId),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분 (v5에서는 cacheTime -> gcTime)
    retry: 1, // 실패 시 1번만 재시도
  })

  // 에러 발생 시 toast 표시
  useEffect(() => {
    if (query.isError) {
      const error = query.error as any
      const errorMessage = error?.response?.data?.message || '스터디 기록을 불러오는데 실패했습니다.'
      toast.error(errorMessage)
      console.error('스터디 기록 조회 실패:', error)
    }
  }, [query.isError, query.error])

  return query
}