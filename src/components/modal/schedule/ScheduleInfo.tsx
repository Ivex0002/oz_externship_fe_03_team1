import { BasicInput } from '@/components/basicComponents/input/BasicInput'
import { useState } from 'react'

const ScheduleInfo = () => {
  const [titleValue, setTitleValue] = useState('')
  const [goalValue, setGoalValue] = useState('')
  const [dateValue, setDateValue] = useState('')
  const [startTimeValue, setStartTimeValue] = useState('')
  const [endTimeValue, setEndTimeValue] = useState('')

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">
          스케줄명 <span className="text-danger-600">*</span>
        </h3>
        <BasicInput
          id="scheduleTitle"
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          placeholder="스케쥴 제목을 입력하세요"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">
          스터디 목표 <span className="text-danger-600">*</span>
        </h3>
        <BasicInput
          id="scheduleGoal"
          value={goalValue}
          onChange={(e) => setGoalValue(e.target.value)}
          placeholder="이번 스터디에서 달성하고자 하는 목표를 입력하세요"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">
          스터디 날짜 <span className="text-danger-600">*</span>
        </h3>
        <BasicInput
          id="scheduleDate"
          value={dateValue}
          onChange={(e) => setDateValue(e.target.value)}
          type="date"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">
            시작 시간 <span className="text-danger-600">*</span>
          </h3>
          <BasicInput
            id="scheduleStartTime"
            value={startTimeValue}
            onChange={(e) => setStartTimeValue(e.target.value)}
            type="time"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">
            종료 시간 <span className="text-danger-600">*</span>
          </h3>
          <BasicInput
            id="scheduleEndTime"
            value={endTimeValue}
            onChange={(e) => setEndTimeValue(e.target.value)}
            type="time"
            required
          />
        </div>
      </div>
    </section>
  )
}

export default ScheduleInfo
