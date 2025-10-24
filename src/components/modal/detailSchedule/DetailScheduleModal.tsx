import { dummySchedule } from '@/assets/dummyData/dummySchedule'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { useModal } from '@/hooks/useModal'
import DetailScheduleInfo from './DetailScheduleInfo'
import DetailScheduleSelectedParticipants from './DetailScheduleSelectedParticipants'
import dayjs from '@/lib/dayjs'

const DetailScheduleModal = () => {
  const { modalToModal } = useModal()
  const formattedCreatedScheduleDate = dayjs(dummySchedule.create_at).format(
    'LLL'
  )

  const handleClickEdit = (e: React.MouseEvent) => {
    e.preventDefault()
    modalToModal('/modal/add_schedule', '스케줄 수정')
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
          <BasicButton type="primary" size="medium" onClick={handleClickEdit}>
            수정
          </BasicButton>
          <BasicButton type="danger" size="medium">
            삭제
          </BasicButton>
        </div>
      </footer>
    </div>
  )
}

export default DetailScheduleModal
