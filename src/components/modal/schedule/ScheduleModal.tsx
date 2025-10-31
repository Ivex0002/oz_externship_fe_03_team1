import { ScheduleParticipantsSelecting } from './ScheduleParticipantsSelecting'
import { useEffect, useState } from 'react'
import { ScheduleInfo } from './ScheduleInfo'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { useModal } from '@/hooks/useModal'
import { storeSchedule } from '@/store/storeSchedule'
import { useParams } from 'react-router'

export type Participant = {
  id: number
  nickname: string
  is_leader: boolean
}

export const ScheduleModal = () => {
  const [selectedParticipants, setSelectedParticipants] = useState<
    Participant[]
  >([])
  const { id } = useParams<{ id: string }>()
  const { closeModal, modalToModal } = useModal()
  const { previousSchedule, isEdit, clearSchedules } = storeSchedule()

  useEffect(() => {
    if (!isEdit) return // 수정이 아닌 경우 초기화하지 않음
    if (previousSchedule) {
      setSelectedParticipants(previousSchedule.schedule_members)
    }
  }, [isEdit, previousSchedule])

  const handleClickCancel = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isEdit) {
      clearSchedules()
      modalToModal(`/modal/schedule_detail/${id}`, '스케줄 상세보기')
      return
    }
    clearSchedules()
    closeModal()
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const form = e.currentTarget // 이벤트가 걸린 <form> 요소
    const formData = new FormData(form) // 모든 input 데이터 수집

    const data = Object.fromEntries(formData.entries())
    const payload = {
      title: data.title,
      objective: data.objective,
      session_date: data.session_date,
      start_time: data.start_time,
      end_time: data.end_time,
      schedule_members: selectedParticipants.map((member) => member.id),
    }

    // api 로직

    // api 통신 성공시
    // closeModal()
  }

  return (
    <form onSubmit={onSubmit} className="w-[672px] text-gray-900">
      <main className="flex flex-col gap-6 p-6">
        <ScheduleInfo />

        <ScheduleParticipantsSelecting
          selectedParticipants={selectedParticipants}
          setSelectedParticipants={setSelectedParticipants}
        />
      </main>
      <footer className="flex w-full justify-end gap-3 border-t border-gray-200 p-6">
        <BasicButton variant="outline" size="large" onClick={handleClickCancel}>
          취소
        </BasicButton>
        <BasicButton variant="primary" size="large" type="submit">
          {isEdit ? '수정하기' : '추가하기'}
        </BasicButton>
      </footer>
    </form>
  )
}
