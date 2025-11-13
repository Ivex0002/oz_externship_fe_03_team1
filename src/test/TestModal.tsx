import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { useModal } from '@/hooks/useModal'
import type { ModalPropsMap, ModalType } from '@/types/Modal'
import { toast } from 'react-toastify'

type ModalTestItem<T extends ModalType> = {
  modalType: T
  title: string
  subTitle?: string
  modalProps?: ModalPropsMap[T]
}

type ModalTestUnion = {
  [K in Exclude<ModalType, null>]: ModalTestItem<K>
}[Exclude<ModalType, null>]

const modalTestList: ModalTestUnion[] = [
  {
    modalType: 'SCHEDULE',
    title: '새 스케줄 추가',
    modalProps: { studyGroupId: '1', scheduleId: 1 },
  },
  {
    modalType: 'DETAIL_SCHEDULE',
    title: '스케줄 상세',
    modalProps: { studyGroupId: '1', scheduleId: 1 },
  },
  {
    modalType: 'DATE_PICKER',
    title: '날짜 선택',
    modalProps: { target: 'start' },
  },
  { modalType: 'LECTURE_CHOOSING', title: '강의 선택' },
  {
    modalType: 'REVIEW',
    title: '리뷰 작성',
    modalProps: { studyGroupId: '57c71ffc-1a31-484f-8807-8fb985f63e7b' },
  },
  {
    modalType: 'REVIEW_DETAIL',
    title: '리뷰 상세',
    modalProps: { studyGroupId: '57c71ffc-1a31-484f-8807-8fb985f63e7b' },
  },
]

function TestModal() {
  const { openModal, closeModal, openConfirm } = useModal()

  const options = {
    message: '리더를 위임하시겠습니까?',
    onConfirm: () => {
      toast.info('모달-토스트 테스트')
    },
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
