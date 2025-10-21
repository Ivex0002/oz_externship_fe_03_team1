// BasicModal.tsx
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useLocation, Outlet } from 'react-router'
import { storeModalOpen } from '@/store/storeModalOpen'
import ModalHeader from '@/components/modal/ModalHeader'
import { useModal } from '@/hooks/useModal'

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
export default function BasicModal() {
  const location = useLocation()
  const modalRef = useRef<HTMLDivElement>(null)
  const { closeModal } = useModal()

  // Zustand store
  const isModalOpen = storeModalOpen((state) => state.modalState.isModalOpen)
  const setModalState = storeModalOpen((state) => state.setModalState)

  // navigate를 통해 들어온 값들
  const { title, subTitle } = storeModalOpen().modalState

  // 무한 랜더링 방지 및 린트 회피용 ref
  const setModalOpenRef = useRef(setModalState)
  const isModalOpenRef = useRef(isModalOpen)
  const closeModalRef = useRef(closeModal)

  // location이 변경될 때마다 모달 상태 확인
  useEffect(() => {
    const smorc = setModalOpenRef.current
    const imorc = isModalOpenRef.current

    const isModalRoute = location.pathname.startsWith('/modal')
    if (isModalRoute && !imorc) {
      smorc({ isModalOpen: true })
      document.body.style.overflow = 'hidden'
    } else if (!isModalRoute && imorc) {
      smorc({ isModalOpen: false })
      document.body.style.overflow = 'unset'
    }

    // 예상 오류 시나리오
    // 1. Modal A 열림 → isModalOpen = true
    // 2. 비정상적으로 컴포넌트 언마운트 (예: 에러, 라우트 변경)
    // 3. 클린업 함수가 제대로 선언되지 않을 경우 모달 상태 변수와 스크롤이 비정상 동작 가능
    // 따라서 중복되지만 상태관리 함수와 스크롤을 명시함
    // 위의 else if는 경로 이동에 따른 모달 상태관리
    // 아래의 return 클린업 함수는 비정상 종료 대응용 안전장치
    return () => {
      smorc({ isModalOpen: false })
      document.body.style.overflow = 'unset'
    }
  }, [location.pathname])

  // esc 누를시 이전 경로로 이동
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModalRef.current()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  // 포커스 트랩
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusableElements.length > 0) {
        ;(focusableElements[0] as HTMLElement).focus()
      }
    }
  }, [isModalOpen])

  const modalAnim = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const contentAnim = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
  }

  return createPortal(
    <AnimatePresence mode="wait">
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          variants={modalAnim}
          role="dialog"
          aria-modal="true"
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.25 }}
          onClick={() => closeModalRef.current()}
        >
          <motion.div
            className="relative rounded-xl bg-white shadow-2xl"
            variants={contentAnim}
            ref={modalRef}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', stiffness: 280, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <ModalHeader title={title} subTitle={subTitle} />
              <Outlet />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
