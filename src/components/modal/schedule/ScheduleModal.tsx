import ScheduleParticipantsSelecting from './ScheduleParticipantsSelecting'
import { useEffect, useState } from 'react'
import ScheduleInfo from './ScheduleInfo'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { useModal } from '@/hooks/useModal'
import { storeSchedule } from '@/store/storeSchedule'

type Participant = {
  id: number
  nickname: string
  is_leader: boolean
}

const ScheduleModal = () => {
  const [selectedParticipants, setSelectedParticipants] = useState<
    Participant[]
  >([])
  const { closeModal } = useModal()
  const { previousSchedule } = storeSchedule()
  const isEdit =
    window.location.pathname === '/modal/edit_schedule' ? true : false

  useEffect(() => {
    if (isEdit) return // 수정이 아닌 경우 초기화하지 않음
    if (previousSchedule) {
      setSelectedParticipants(previousSchedule.participants)
    }
  }, [isEdit, previousSchedule])

  const handleClickCancel = (e: React.MouseEvent) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <form className="w-[672px] text-gray-900">
      <main className="flex flex-col gap-6 p-6">
        <ScheduleInfo />

        <ScheduleParticipantsSelecting
          selectedParticipants={selectedParticipants}
          setSelectedParticipants={setSelectedParticipants}
        />
      </main>
      <footer className="flex w-full justify-end gap-3 border-t border-gray-200 p-6">
        <BasicButton type="outline" size="large" onClick={handleClickCancel}>
          취소
        </BasicButton>
        <BasicButton type="primary" size="large">
          추가하기
        </BasicButton>
      </footer>
    </form>
  )
}

export default ScheduleModal
