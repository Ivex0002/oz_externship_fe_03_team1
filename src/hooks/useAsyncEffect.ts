import { useEffect } from 'react'
import { toast } from 'react-toastify'

/**
 * 비동기 effect를 공통화한 훅
 *
 * @param storeSelector 구독할 스토어 (필요 없으면 null)
 * @param asyncFn 실행할 비동기 함수 (필수)
 * @param onSuccess 성공 시 실행할 콜백 (res를 인자로 받음)
 * @param deps 의존성 배열
 */
export const useAsyncEffect = <R>(
  asyncFn: () => Promise<R>,
  onSuccess: (res: R) => void,
  deps: React.DependencyList
) => {
  useEffect(() => {
    ;(async () => {
      try {
        const res = await asyncFn()
        if (res !== undefined) onSuccess(res)
      } catch (error) {
        toast.error(`${error}`)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
