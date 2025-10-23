import { storeModalOpen } from '@/store/storeModalOpen'
import { useEffect } from 'react'
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

  const { modalState, setModalState, clearModal } = storeModalOpen()

  // 모달 열기
  const openModal = (modalPath: string, title: string, subTitle?: string) => {
    const currentPath = location.pathname
    navigate(modalPath)
    setModalState({
      prevPath: currentPath,
      title: title,
      subTitle: subTitle,
      isClosing: false,
    })
  }

  /**
   * 모달에서 다른 모달로 이동(prevPath 옵션을 위해 분리)
   * 모달 > 다른 모달 이동 완료된 상태에서 뒤로가기 : navigate(-1)
   * 모달 > 다른 모달 이동 완료된 상태에서 모달 닫기 : closeModal()
   */
  const modalToModal = (
    modalPath: string,
    title: string,
    subTitle?: string
  ) => {
    navigate(modalPath)
    setModalState({
      title: title,
      subTitle: subTitle,
    })
  }

  // 모달 닫기
  const closeModal = () => {
    const { prevPath } = storeModalOpen.getState().modalState
    if (prevPath) {
      setModalState({ isClosing: true })
      navigate(prevPath, { replace: true })
    }
  }

  useEffect(() => {
    if (modalState.isClosing && location.pathname === modalState.prevPath) {
      clearModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return { openModal, closeModal, modalToModal } as const
}
