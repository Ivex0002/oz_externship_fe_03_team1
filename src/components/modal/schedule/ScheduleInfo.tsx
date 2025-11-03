import { BasicInput } from '@/components/basicComponents/input/BasicInput'
import { storeSchedule } from '@/store/storeSchedule'
import { useEffect, useState } from 'react'

export const ScheduleInfo = () => {
  const [titleValue, setTitleValue] = useState('')
  const [objectiveValue, setObjectiveValue] = useState('')
  const [dateValue, setDateValue] = useState('')
  const [startTimeValue, setStartTimeValue] = useState('')
  const [endTimeValue, setEndTimeValue] = useState('')

  const { previousSchedule, isEdit } = storeSchedule()

  useEffect(() => {
    if (!isEdit) return
    if (isEdit && previousSchedule) {
      setTitleValue(previousSchedule.title)
      setObjectiveValue(previousSchedule.objective)
      setDateValue(previousSchedule.session_date)
      setStartTimeValue(previousSchedule.start_time)
      setEndTimeValue(previousSchedule.end_time)
    }
  }, [isEdit, previousSchedule])

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">
          스케줄명 <span className="text-danger-600">*</span>
        </h3>
        <BasicInput
          id="scheduleTitle"
          name="title"
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
          name="objective"
          value={objectiveValue}
          onChange={(e) => setObjectiveValue(e.target.value)}
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
          name="session_date"
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
            name="start_time"
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
            name="end_time"
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
