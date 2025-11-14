import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/hooks/api/queryKeys'
import { api } from '@/api/api'

export const useQueryStudyRecords = (groupId: string) => {
  return useQuery({
    queryKey: queryKeys.studies.groups.notes(groupId),
    queryFn: () => api.v1.studies.groups(groupId).notes.GET()
  })
}