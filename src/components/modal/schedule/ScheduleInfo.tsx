import { BasicInput } from '@/components/basicComponents/input/BasicInput'
import { storeSchedule } from '@/store/storeSchedule'
import { Calendar } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DatePickerModal } from '../datePicker/DatePickerModal'
import { storeDatePicker } from '@/store/storeDatePicker'
import dayjs from '@/lib/dayjs'

export const ScheduleInfo = () => {
  const [titleValue, setTitleValue] = useState('')
  const [objectiveValue, setObjectiveValue] = useState('')
  const [dateValue, setDateValue] = useState('')
  const [startTimeValue, setStartTimeValue] = useState('')
  const [endTimeValue, setEndTimeValue] = useState('')
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false)

  const { previousSchedule, isEdit } = storeSchedule()
  const { date, setMode } = storeDatePicker()

  useEffect(() => {
    setMode('single')
    if (date) setDateValue(dayjs(date).format('YYYY-MM-DD'))
    if (!isEdit) return
    if (isEdit && previousSchedule) {
      setTitleValue(previousSchedule.title)
      setObjectiveValue(previousSchedule.objective)
      setDateValue(previousSchedule.session_date)
      setStartTimeValue(previousSchedule.start_time)
      setEndTimeValue(previousSchedule.end_time)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, dateValue])

  const handleOpenDatePicker = () => {
    setIsOpenDatePicker((prev) => !prev)
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="scheduleTitle" className="text-sm font-medium">
          스케줄명 <span className="text-danger-600">*</span>
        </label>
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
        <label htmlFor="scheduleGoal" className="text-sm font-medium">
          스터디 목표 <span className="text-danger-600">*</span>
        </label>
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
        <label htmlFor="scheduleDate" className="text-sm font-medium">
          스터디 날짜 <span className="text-danger-600">*</span>
        </label>
        <div
          className="relative cursor-pointer"
          onClick={() => handleOpenDatePicker()}
        >
          <BasicInput
            id="scheduleDate"
            name="session_date"
            placeholder="날짜를 선택하세요"
            value={dateValue}
            readOnly
          />
          <Calendar className="absolute top-1/2 right-3 h-[16px] w-[16px] -translate-y-1/2 text-gray-400 hover:text-gray-600" />
          {isOpenDatePicker && (
            <div className="absolute top-0 right-0 z-50 rounded-2xl bg-white shadow-xl">
              <DatePickerModal />
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="scheduleStartTime" className="text-sm font-medium">
            시작 시간 <span className="text-danger-600">*</span>
          </label>
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
          <label htmlFor="scheduleEndTime" className="text-sm font-medium">
            종료 시간 <span className="text-danger-600">*</span>
          </label>
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
