import { dummySchedule } from '@/assets/dummyData/dummySchedule'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { useModal } from '@/hooks/useModal'
import DetailScheduleInfo from './DetailScheduleInfo'
import DetailScheduleSelectedParticipants from './DetailScheduleSelectedParticipants'
import dayjs from '@/lib/dayjs'
import { storeSchedule } from '@/store/storeSchedule'
import { useParams } from 'react-router'

const DetailScheduleModal = () => {
  const params = useParams<{ id: string }>()
  const { modalToModal } = useModal()
  const { setPreviousSchedule, setIsEdit } = storeSchedule()
  const formattedCreatedScheduleDate = dayjs(dummySchedule.created_at).format(
    'LLL'
  )

  const handleClickEdit = () => {
    setPreviousSchedule(dummySchedule)
    setIsEdit(true)
    modalToModal(`/modal/edit_schedule/${params.id}`, '스케줄 수정')
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
