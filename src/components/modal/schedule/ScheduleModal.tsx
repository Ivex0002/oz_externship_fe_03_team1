import { BasicInput } from '@/components/basicComponents/input/BasicInput'
import ScheduleParticipantsSelecting from './ScheduleParticipantsSelecting'
import { useState } from 'react'

type Participant = {
  id: number
  nickname: string
  is_leader: boolean
}

const ScheduleModal = () => {
  const [selectedParticipants, setSelectedParticipants] = useState<
    Participant[]
  >([])

  return (
    <form className="w-[672px] text-gray-900">
      <main className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">
            스케줄명 <span className="text-danger-600">*</span>
          </h3>
          <BasicInput placeholder="스케쥴 제목을 입력하세요" required />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">
            스터디 목표 <span className="text-danger-600">*</span>
          </h3>
          <BasicInput
            placeholder="이번 스터디에서 달성하고자 하는 목표를 입력하세요"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">
            스터디 날짜 <span className="text-danger-600">*</span>
          </h3>
          <BasicInput type="date" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">
              시작 시간 <span className="text-danger-600">*</span>
            </h3>
            <BasicInput type="time" required />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">
              종료 시간 <span className="text-danger-600">*</span>
            </h3>
            <BasicInput type="time" required />
          </div>
        </div>

        <ScheduleParticipantsSelecting
          selectedParticipants={selectedParticipants}
          setSelectedParticipants={setSelectedParticipants}
        />
      </main>
    </form>
  )
}

export default ScheduleModal
