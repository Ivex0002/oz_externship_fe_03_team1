import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../queryKeys'
import { api } from '@/api/api'

export type Ordering =
  | 'created_at'
  | '-created_at'
  | 'updated_at'
  | '-updated_at'
  | null

interface ReviewParams {
  page: number
  page_size?: number | null
  groupId: string
  ordering?: Ordering
}

export const useQueryReview = (params: ReviewParams) => {
  return useQuery({
    queryKey: queryKeys.studies.groups.reviews(params.groupId),
    queryFn: () =>
      api.v1.studies.groups(params.groupId).reviews.GET(undefined, {
        params: {
          page: params.page,
          page_size: params.page_size,
          ordering: params.ordering,
        },
      }),
  })
}
