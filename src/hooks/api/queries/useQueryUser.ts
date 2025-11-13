import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../queryKeys'
import { api } from '@/api/api'

interface UseQueryUserOptions {
  enabled?: boolean
  refetchOnMount?: boolean
}

export const useQueryUser = (options?: UseQueryUserOptions) => {
  return useQuery({
    queryKey: queryKeys.users.me(),
    enabled: options?.enabled ?? true,
    queryFn: () => api.v1.users.me.GET(),
    refetchOnMount: options?.refetchOnMount,
  })
}
