// BasicModal.tsx
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router'
import { ChevronLeft } from 'lucide-react'
import { storeModalOpen } from '../../../store/storeIsModalOpen'

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
  const navigate = useNavigate()
  const location = useLocation()
  const modalRef = useRef<HTMLDivElement>(null)

  // Zustand store
  const { isModalOpen, SetModalOpen } = storeModalOpen()
  const prevPath = location.state?.prevPath || '/'

  // 닫기 로직
  const handleClose = useCallback(() => {
    SetModalOpen(false)
    navigate(prevPath, { replace: true })
  }, [SetModalOpen, navigate, prevPath])

  // location이 변경될 때마다 모달 상태 확인
  useEffect(() => {
    const isModalRoute = location.pathname.startsWith('/modal')
    if (isModalRoute && !isModalOpen) {
      SetModalOpen(true)
      document.body.style.overflow = 'hidden'
    } else if (!isModalRoute && isModalOpen) {
      SetModalOpen(false)
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
      SetModalOpen(false)
      document.body.style.overflow = 'unset'
    }
  }, [location.pathname, isModalOpen, SetModalOpen])

  // esc 누를시 이전 경로로 이동
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [handleClose])

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
          onClick={handleClose}
        >
          <motion.div
            className="relative max-h-[90vh] w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl"
            variants={contentAnim}
            ref={modalRef}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', stiffness: 280, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center border-b bg-white/90 p-4 backdrop-blur-sm">
              <ChevronLeft
                onClick={handleClose}
                className="h-6 w-6 cursor-pointer text-gray-500 transition-colors hover:text-gray-700"
                aria-label="창 닫기"
              />
            </div>

            <div className="max-h-[calc(90vh-3.5rem)] overflow-y-auto p-4">
              <Outlet />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
