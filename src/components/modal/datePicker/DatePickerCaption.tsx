import { useDayPicker, type MonthCaptionProps } from 'react-day-picker'
import dayjs from '@/lib/dayjs'

export const DatePickerCaption = (props: MonthCaptionProps) => {
  const { goToMonth } = useDayPicker()

  const date = props.calendarMonth.date
  const year = dayjs(date).get('year')
  const month = dayjs(date).get('month') + 1

  const goToday = () => {
    const today = dayjs()
    // 날짜는 1일로 맞춰서 월 전환만 하도록
    goToMonth?.(today.set('date', 1).toDate())
  }

  return (
    <div className="flex items-center justify-center gap-4 pb-6">
      <span className="text-lg font-bold text-gray-900">
        {year}년 {month}월
      </span>
      <button
        className="text-primary-500 hover:text-primary-600 pt-1 text-sm hover:cursor-pointer"
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          goToday()
        }}
      >
        오늘
      </button>
    </div>
  )
}
