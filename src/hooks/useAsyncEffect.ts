import { useEffect, useState } from 'react'
import type { AxiosResponse } from 'axios'

interface UseAsyncEffectOptions<R> {
  asyncFn: (signal?: AbortSignal) => Promise<R | AxiosResponse<R>>
  onSuccess?: (data: R) => void
  onError?: (error: unknown) => void
  finallyFn?: () => void
  deps?: React.DependencyList
}

/**
 * useAsyncEffect
 * - abort 처리
 * - 로딩 / 에러 상태 관리
 * - AxiosResponse 자동 언랩
 */
export const useAsyncEffect = <R>({
  asyncFn,
  onSuccess,
  onError,
  finallyFn,
  deps = [],
}: UseAsyncEffectOptions<R>) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    ;(async () => {
      setLoading(true)

      try {
        const res = await asyncFn(signal)

        if (signal.aborted) return

        const data =
          res && typeof res === 'object' && 'data' in res
            ? (res as AxiosResponse<R>).data
            : res

        if (onSuccess && data) onSuccess(data)
      } catch (err) {
        if (signal.aborted) return

        onError?.(err)
      } finally {
        if (!signal.aborted) setLoading(false)
        if (finallyFn) finallyFn()
      }
    })()

    return () => {
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { loading }
}
