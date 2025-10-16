import { useNavigate, useLocation } from 'react-router'

/**
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { openModal } = useModal()
 *
 *  return (
 *  <button onClick={() => openModal('/modal/detail')}>
 *    모달 열기
 *  </button>
 *  )
 * }
 * ```
 */
export function useModal() {
  const navigate = useNavigate()
  const location = useLocation()

  const openModal = (modalPath: string) => {
    navigate(modalPath, {
      state: { prevPath: location.pathname },
    })
  }

  return { openModal } as const
}
