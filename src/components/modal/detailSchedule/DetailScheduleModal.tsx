import { dummySchedule } from '@/assets/dummyData/dummySchedule'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { useModal } from '@/hooks/useModal'
import { DetailScheduleInfo } from './DetailScheduleInfo'
import { DetailScheduleSelectedParticipants } from './DetailScheduleSelectedParticipants'
import dayjs from '@/lib/dayjs'
import { storeSchedule } from '@/store/storeSchedule'
import { useParams } from 'react-router'
import type { ScheduleParams } from '@/types/Params'

export const DetailScheduleModal = () => {
  const { scheduleId, studyGroupId } = useParams<ScheduleParams>()
  const { modalToModal } = useModal()
  const { setPreviousSchedule, setIsEdit } = storeSchedule()
  const formattedCreatedScheduleDate = dayjs(dummySchedule.created_at).format(
    'LLL'
  )

  const handleClickEdit = () => {
    setPreviousSchedule(dummySchedule)
    setIsEdit(true)
    if (!studyGroupId || !scheduleId) return
    modalToModal('SCHEDULE', {
      title: '스케줄 수정',
      modalProps: { studyGroupId, scheduleId: scheduleId },
    })
  }

  const handleClickDelete = () => {
    // api 로직
    // api 성공시
    // closeModal()
  }

  return (
    <div className="w-[672px] text-gray-900">
      <main className="flex flex-col gap-6 p-6">
        <DetailScheduleInfo />
        <DetailScheduleSelectedParticipants />
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
