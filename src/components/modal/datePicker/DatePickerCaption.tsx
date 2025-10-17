import { useDayPicker, type MonthCaptionProps } from 'react-day-picker'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const DatePickerCaption = (props: MonthCaptionProps) => {
  const { goToMonth, nextMonth, previousMonth, dayPickerProps } = useDayPicker()
  const { startMonth, endMonth } = dayPickerProps

  const date = props.calendarMonth.date
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  const canGoPrev =
    !startMonth ||
    date > new Date(startMonth.getFullYear(), startMonth.getMonth(), 1)
  const canGoNext =
    !endMonth || date < new Date(endMonth.getFullYear(), endMonth.getMonth(), 1)

  const goToday = () => {
    const today = new Date()
    // 날짜는 1일로 맞춰서 월 전환만 하도록
    goToMonth?.(new Date(today.getFullYear(), today.getMonth(), 1))
  }

  return (
    <div className="flex justify-between pb-6">
      <button
        className={`rounded px-2 py-1 hover:bg-gray-100 ${
          !canGoPrev ? 'cursor-not-allowed opacity-40' : ''
        }`}
        onClick={() =>
          canGoPrev &&
          previousMonth &&
          goToMonth?.(new Date(date.getFullYear(), date.getMonth() - 1, 1))
        }
      >
        <ChevronLeft />
      </button>
      <div className="flex items-center gap-4">
        <span className="font-bold text-gray-900">
          {year}년 {month}월
        </span>
        <button className="text-primary-500" onClick={goToday}>
          오늘
        </button>
      </div>
      <button
        className={`rounded px-2 py-1 hover:bg-gray-100 ${
          !canGoNext ? 'cursor-not-allowed opacity-40' : ''
        }`}
        onClick={() =>
          canGoNext &&
          nextMonth &&
          goToMonth?.(new Date(date.getFullYear(), date.getMonth() + 1, 1))
        }
      >
        <ChevronRight />
      </button>
    </div>
  )
}

export default DatePickerCaption
