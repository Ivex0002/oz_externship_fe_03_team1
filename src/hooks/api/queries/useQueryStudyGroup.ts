import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../queryKeys'
import { api } from '@/api/api'
import type { PageReq } from '@/types/ApiLink'

export const useQueryStudyGroup = (params: PageReq) => {
  return useQuery({
    queryKey: queryKeys.studies.groups.list(params),
    queryFn: () => api.v1.studies.groups.GET(undefined, { params }),
  })
}
