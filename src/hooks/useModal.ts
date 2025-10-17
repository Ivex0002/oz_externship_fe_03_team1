import { storeModalOpen } from '@/store/storeModalOpen'
import { useEffect, useRef } from 'react'
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
  const isClosingRef = useRef(false)

  // 모달 열기
  const openModal = (modalPath: string, title: string, subTitle?: string) => {
    const currentPath = location.pathname
    navigate(modalPath)
    storeModalOpen.getState().setModalState({
      isModalOpen: true,
      prevPath: currentPath,
      title: title,
      subTitle: subTitle,
    })
  }

  // 모달 닫기
  const closeModal = () => {
    const { prevPath } = storeModalOpen.getState().modalState
    if (prevPath) {
      isClosingRef.current = true
      navigate(prevPath, { replace: true })
    }
  }

  // 모달 닫을때 상태 초기화
  // 기존에 clearModal이 과도하게 실행되는 문제가 있었으나, isClosingRef 참조형으로 변경하여 해결
  useEffect(() => {
    const { modalState, clearModal } = storeModalOpen.getState()

    if (isClosingRef.current && location.pathname === modalState.prevPath) {
      clearModal()
      isClosingRef.current = false
    }
  }, [location.pathname])

  return { openModal, closeModal } as const
}
