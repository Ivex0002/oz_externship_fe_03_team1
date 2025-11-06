import { useDayPicker, type MonthCaptionProps } from 'react-day-picker'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import dayjs from '@/lib/dayjs'

export const DatePickerCaption = (props: MonthCaptionProps) => {
  const { goToMonth, nextMonth, previousMonth, dayPickerProps } = useDayPicker()
  const { startMonth, endMonth } = dayPickerProps

  const date = props.calendarMonth.date
  const year = dayjs(date).get('year')
  const month = dayjs(date).get('month') + 1

  const canGoPrev =
    !startMonth || date > dayjs(startMonth).set('date', 1).toDate()
  const canGoNext = !endMonth || date < dayjs(endMonth).set('date', 1).toDate()

  const goToday = () => {
    const today = dayjs()
    // 날짜는 1일로 맞춰서 월 전환만 하도록
    goToMonth?.(today.set('date', 1).toDate())
  }

  return (
    <div className="flex items-center justify-between pb-6">
      <button
        className={`rounded px-2 py-1 hover:bg-gray-100 ${
          !canGoPrev ? 'cursor-not-allowed opacity-40' : ''
        }`}
        onClick={() =>
          canGoPrev &&
          previousMonth &&
          goToMonth?.(dayjs(date).subtract(1, 'month').toDate())
        }
      >
        <ChevronLeft />
      </button>
      <div className="flex items-center gap-4">
        <span className="text-lg font-bold text-gray-900">
          {year}년 {month}월
        </span>
        <button
          className="text-primary-500 hover:text-primary-600 pt-1 text-sm hover:cursor-pointer"
          onClick={goToday}
        >
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
          goToMonth?.(dayjs(date).add(1, 'month').toDate())
        }
      >
        <ChevronRight />
      </button>
    </div>
  )
}
