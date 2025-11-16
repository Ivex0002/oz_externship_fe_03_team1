import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../queryKeys'
import { api } from '@/api/api'

interface StudyGroupDetailParams {
  groupId: string | undefined
}

export const useQueryStudyGroupDetail = (params: StudyGroupDetailParams) => {
    return useQuery({
    queryKey: queryKeys.studies.groups.detail(params.groupId),
    queryFn: () =>
      {if(!params.groupId) throw new Error("스터디 그룹 상세내역을 받아올 수 없습니다.")
        return api.v1.studies.groups(params.groupId).GET()},
  })
}