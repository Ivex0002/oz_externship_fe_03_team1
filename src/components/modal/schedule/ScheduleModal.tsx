import { ScheduleMembersSelecting } from './ScheduleParticipantsSelecting'
import { useEffect, useState } from 'react'
import { ScheduleInfo } from './ScheduleInfo'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { useModal } from '@/hooks/useModal'
import { storeSchedule } from '@/store/storeSchedule'
import type { Member } from '@/types/Schedule'
import { storeModalOpen } from '@/store/storeModalOpen'
import type { ModalPropsMap } from '@/types/Modal'
import { useScheduleMutation } from '@/hooks/api/mutations/useScheduleMutation'
import { toast } from 'react-toastify'

export const ScheduleModal = () => {
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([])
  const { closeModal, modalToModal } = useModal()
  const { previousSchedule, isEdit, clearSchedules } = storeSchedule()

  const { modalState } = storeModalOpen()
  const modalProps = modalState.modalProps
  const { studyGroupId, scheduleId } = modalProps as ModalPropsMap['SCHEDULE']

  const { postSchedule, patchSchedule } = useScheduleMutation(studyGroupId)

  useEffect(() => {
    if (!isEdit) return // 수정이 아닌 경우 초기화하지 않음
    if (previousSchedule) {
      setSelectedMembers(previousSchedule.participants)
    }
  }, [isEdit, previousSchedule])

  const handleClickCancel = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isEdit) {
      clearSchedules()
      if (!studyGroupId || !scheduleId) return
      modalToModal('DETAIL_SCHEDULE', {
        title: '스케줄 상세보기',
        modalProps: { studyGroupId, scheduleId: Number(scheduleId) },
      })
      return
    }
    clearSchedules()
    closeModal()
  }

  const onSubmitSchedule: React.FormEventHandler<HTMLFormElement> = (e) => {
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
      participants: selectedMembers.map((member) => member.uuid),
    }

    if (isEdit) {
      if (!studyGroupId || !scheduleId) return

      const patchParams = {
        scheduleId: scheduleId,
        title:
          previousSchedule.title !== payload.title ? payload.title : undefined,
        objective:
          previousSchedule.objective !== payload.objective
            ? payload.objective
            : undefined,
        session_date:
          previousSchedule.session_date !== payload.session_date
            ? payload.session_date
            : undefined,
        start_time:
          previousSchedule.start_time !== payload.start_time
            ? payload.start_time
            : undefined,
        end_time:
          previousSchedule.end_time !== payload.end_time
            ? payload.end_time
            : undefined,
        participants:
          previousSchedule.participants.map(
            (participant) => participant.uuid
          ) !== payload.participants
            ? payload.participants
            : undefined,
      }
      patchSchedule.mutate(patchParams)

      if (patchSchedule.isError) return toast.error(patchSchedule.error.message)
    } else {
      postSchedule.mutate(payload)

      if (postSchedule.isError) return toast.error(postSchedule.error.message)
    }
    clearSchedules()
    closeModal()
  }

  return (
    <form onSubmit={onSubmitSchedule} className="w-[672px] text-gray-900">
      <main className="flex flex-col gap-6 p-6">
        <ScheduleInfo />

        <ScheduleMembersSelecting
          selectedMembers={selectedMembers}
          setSelectedMembers={setSelectedMembers}
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
