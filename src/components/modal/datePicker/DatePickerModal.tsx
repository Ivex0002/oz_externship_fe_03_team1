import { useState } from 'react'
import { DayPicker, type MonthCaptionProps } from 'react-day-picker'
import { ko } from 'react-day-picker/locale'
import 'react-day-picker/style.css'
import DatePickerHeader from './DatePickerHeader'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type DatePickerModalProps = {
  title: string
}

const DatePickerModal = ({ title }: DatePickerModalProps) => {
  const [selected, setSelected] = useState<Date>()

  const Caption = (props: MonthCaptionProps) => {
    const date = props.calendarMonth.date
    const year = date.getFullYear()
    const month = date.getMonth() + 1

    return (
      <div className="flex justify-between">
        <button>
          <ChevronLeft />
        </button>
        <div className="flex gap-4">
          <p className="font-bold">
            {year}년 {month}월
          </p>
          <button>오늘</button>
        </div>
        <button>
          <ChevronRight />
        </button>
      </div>
    )
  }

  return (
    <div className="w-[308px]">
      <DatePickerHeader title={title} />
      <DayPicker
        animate
        mode="single"
        disabled={{ before: new Date() }}
        locale={ko}
        navLayout="around"
        showOutsideDays
        selected={selected}
        onSelect={setSelected}
        components={{ MonthCaption: Caption }}
        footer={
          selected
            ? `선택한 날짜 : ${selected.toLocaleDateString()}`
            : '날짜를 선택하세요.'
        }
        classNames={{
          today: 'text-black',
          selected: 'border-2 rounded-full border-[#facc15]',
          chevron: 'fill-gray-700',
        }}
      />
    </div>
  )
}

export default DatePickerModal
