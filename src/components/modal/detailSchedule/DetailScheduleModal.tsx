import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { useModal } from '@/hooks/useModal'
import { DetailScheduleInfo } from './DetailScheduleInfo'
import { DetailScheduleSelectedParticipants } from './DetailScheduleSelectedParticipants'
import dayjs from '@/lib/dayjs'
import { storeSchedule } from '@/store/storeSchedule'
import { storeModalOpen } from '@/store/storeModalOpen'
import type { ModalPropsMap } from '@/types/Modal'
import { useQueryScheduleDetail } from '@/hooks/api/queries/useQueryScheduleDetail'
import { toast } from 'react-toastify'
import { DetailScheduleSkeleton } from './DetailScheduleSkeleton'
import { useScheduleMutation } from '@/hooks/api/mutations/useScheduleMutation'

export const DetailScheduleModal = () => {
  const { openConfirm, openModal, closeModal, modalToModal } = useModal()
  const { setPreviousSchedule, setIsEdit } = storeSchedule()

  const { modalState } = storeModalOpen()
  const modalProps = modalState.modalProps
  const studyGroupId = modalProps
    ? (modalProps as ModalPropsMap['DETAIL_SCHEDULE']).studyGroupId
    : ''
  const scheduleId = modalProps
    ? (modalProps as ModalPropsMap['DETAIL_SCHEDULE']).scheduleId
    : ''

  const { deleteSchedule } = useScheduleMutation(studyGroupId)

  const { data, error, isError, isPending } = useQueryScheduleDetail({
    scheduleId,
  })
  if (isPending) return <DetailScheduleSkeleton />
  if (isError) return toast.error(error.message)

  const scheduleDetailData = data && data.data

  if (!studyGroupId || !scheduleId) return null

  const scheduleInfo = {
    title: scheduleDetailData?.title || '',
    objective: scheduleDetailData?.objective || '',
    session_date: scheduleDetailData?.session_date || '',
    start_time: scheduleDetailData?.start_time || '',
    end_time: scheduleDetailData?.end_time || '',
  }
  const participants = scheduleDetailData?.participants || []

  const formattedCreatedScheduleDate =
    dayjs(scheduleDetailData?.created_at).format('LLL') || ''

  const handleClickEdit = () => {
    setPreviousSchedule({ ...scheduleInfo, participants })
    setIsEdit(true)

    modalToModal('SCHEDULE', {
      title: '스케줄 수정',
      modalProps: {
        studyGroupId,
        scheduleId,
      },
    })
  }

  const handleClickDelete = () => {
    openConfirm({
      message: '정말로 스케줄을 삭제하시겠습니까?',
      onConfirm: () => {
        deleteSchedule.mutate({ scheduleId })
        closeModal()
      },
      onCancel: () => {
        openModal('DETAIL_SCHEDULE', {
          title: '스케줄 상세',
          modalProps: { studyGroupId, scheduleId },
        })
      },
    })
  }

  return (
    <div className="w-[672px] text-gray-900">
      <main className="flex flex-col gap-6 p-6">
        <DetailScheduleInfo scheduleInfo={scheduleInfo} />
        <DetailScheduleSelectedParticipants participants={participants} />
      </main>
      <footer className="flex w-full items-center justify-between gap-3 border-t border-gray-200 p-6">
        <span className="text-xs text-gray-500">
          생성일: {formattedCreatedScheduleDate}
        </span>
        <div className="flex gap-3">
          <BasicButton
            variant="primary"
            size="medium"
            onClick={handleClickEdit}
          >
            수정
          </BasicButton>
          <BasicButton
            variant="danger"
            size="medium"
            onClick={handleClickDelete}
          >
            삭제
          </BasicButton>
        </div>
      </footer>
    </div>
  )
}
