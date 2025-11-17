import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../queryKeys'
import { api } from '@/api/api'
import type { PageReq } from '@/types/ApiLink'

interface StudyGroupParams extends PageReq {
  status: 'ONGOING' | 'ENDED' | 'PENDING'
  page_size?: number
  search: string | null
}
export const useQueryStudyGroup = (params: StudyGroupParams) => {
  return useQuery({
    queryKey: queryKeys.studies.groups.list(params),
    queryFn: () =>
      api.v1.studies.groups.GET(undefined, {
        params: {
          is_member: true,
          status: params.status,
          page_size: params.page_size,
          search: params.search,
        },
      }),
  })
}
