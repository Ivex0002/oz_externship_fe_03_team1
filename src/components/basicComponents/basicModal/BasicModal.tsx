import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { storeModalOpen } from '@/store/storeModalOpen'
import { ModalHeader } from '@/components/modal/ModalHeader'
import { useModal } from '@/hooks/useModal'

import { ReviewModal } from '@/components/modal/review/ReviewModal'
import { ReviewDetailModal } from '@/components/modal/reviewDetail/ReviewDetailModal'
import { DatePickerModal } from '@/components/modal/datePicker/DatePickerModal'
import { LectureChoosingModal } from '@/components/modal/lectureChoosing/LectureChoosingModal'
import { ScheduleModal } from '@/components/modal/schedule/ScheduleModal'
import { DetailScheduleModal } from '@/components/modal/detailSchedule/DetailScheduleModal'
import { ConfirmModal } from '@/components/modal/confirm/ConfirmModal'

export const BasicModal = () => {
  const modalRef = useRef<HTMLDivElement>(null)
  const { closeModal } = useModal()

  // Zustand store
  const { modalState } = storeModalOpen()
  const { isModalOpen, modalType } = modalState

  // ESC로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keyup', handleEsc)
    return () => window.removeEventListener('keyup', handleEsc)
  }, [closeModal])

  // 스크롤 잠금
  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

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

  // 모달 애니메이션
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

  // 렌더링할 모달 내용 선택
  const renderModalContent = () => {
    switch (modalType) {
      case 'REVIEW':
        return <ReviewModal />
      case 'REVIEW_DETAIL':
        return <ReviewDetailModal />
      case 'DATE_PICKER':
        return <DatePickerModal />
      case 'LECTURE_CHOOSING':
        return <LectureChoosingModal />
      case 'SCHEDULE':
        return <ScheduleModal />
      case 'DETAIL_SCHEDULE':
        return <DetailScheduleModal />
      case 'CONFIRM':
        return <ConfirmModal />
      default:
        return null
    }
  }

  return createPortal(
    isModalOpen && (
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        variants={modalAnim}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.1 }}
        role="dialog"
        aria-modal="true"
        onClick={closeModal}
      >
        <motion.div
          className="relative flex h-auto max-h-[90vh] flex-col items-center justify-center rounded-xl bg-white shadow-2xl"
          variants={contentAnim}
          ref={modalRef}
          initial="hidden"
          animate="visible"
          transition={{ type: 'spring', stiffness: 280, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="transparent-scrollbar p-6">
            <ModalHeader />
            {renderModalContent()}
          </div>
        </motion.div>
      </motion.div>
    ),
    document.body
  )
}
