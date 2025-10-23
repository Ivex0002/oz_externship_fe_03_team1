import { dummySchedule } from '@/assets/dummyData/dummySchedule'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { useModal } from '@/hooks/useModal'
import DetailScheduleInfo from './DetailScheduleInfo'
import DetailScheduleSelectedParticipants from './DetailScheduleSelectedParticipants'

const DetailScheduleModal = () => {
  const { closeModal } = useModal()

  const handleClickCancel = (e: React.MouseEvent) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <div className="w-[672px] text-gray-900">
      <main className="flex flex-col gap-6 p-6">
        <DetailScheduleInfo />
        <DetailScheduleSelectedParticipants />
      </main>
      <footer className="flex w-full items-center justify-between gap-3 border-t border-gray-200 p-6">
        <span className="text-xs text-gray-500">
          생성일: {dummySchedule.create_at}
        </span>
        <div className="flex gap-3">
          <BasicButton type="primary" size="medium" onClick={handleClickCancel}>
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
