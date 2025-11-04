import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { useModal, type ConfirmOptions } from '@/hooks/useModal'
import type { ModalType } from '@/store/storeModalOpen'

const modalTestList: {
  modalType: Exclude<ModalType, null>
  title: string
  subTitle?: string
  modalProps?: Record<string, unknown>
}[] = [
  { modalType: 'SCHEDULE', title: '새 스케줄 추가' },
  {
    modalType: 'DETAIL_SCHEDULE',
    title: '스케줄 상세',
    modalProps: { scheduleId: 1 },
  },
  { modalType: 'DATE_PICKER', title: '날짜 선택' },
  { modalType: 'LECTURE_CHOOSING', title: '강의 선택' },
  {
    modalType: 'REVIEW',
    title: '리뷰 작성',
    modalProps: { studyGroupId: 1 },
  },
  {
    modalType: 'REVIEW_DETAIL',
    title: '리뷰 상세',
    modalProps: { studyGroupId: 1 },
  },
]

function TestModal() {
  const { openModal, closeModal, openConfirm } = useModal()

  const options: ConfirmOptions = {
    message: '리더를 위임하시겠습니까?',
    onConfirm: closeModal,
    onCancel: closeModal,
  }

  return (
    <div className="m-auto mt-20 flex flex-col gap-2">
      {modalTestList.map((modal) => (
        <BasicButton
          key={modal.modalType}
          onClick={() =>
            openModal(modal.modalType, {
              title: modal.title,
              subTitle: modal.subTitle,
              modalProps: modal.modalProps,
            })
          }
        >
          {modal.title}
        </BasicButton>
      ))}
      <BasicButton onClick={() => openConfirm(options)}>확인창</BasicButton>
    </div>
  )
}

export default TestModal
