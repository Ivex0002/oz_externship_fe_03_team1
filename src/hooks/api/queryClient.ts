import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      gcTime: 1000 * 60 * 10, // 10분
      retry: 1, // 재시도 1회
      refetchOnWindowFocus: false, // 포커스시 자동 재요청 비활성화
    },
    mutations: {
      retry: 0,
    },
  },
})
