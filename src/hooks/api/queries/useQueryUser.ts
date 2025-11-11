import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../queryKeys'
import { api } from '@/api/api'

export const useQueryUser = () => {
  return useQuery({
    queryKey: queryKeys.users.me(),
    queryFn: () => api.v1.users.me.GET(),
  })
}
