import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { ko } from 'react-day-picker/locale'
import 'react-day-picker/style.css'
import DatePickerCaption from './DatePickerCaption'
import DatePickerFooter from './DatePickerFooter'
import ModalHeader from '../ModalHeader'

type DatePickerModalProps = {
  title: string
  startMonth?: Date
}

const DatePickerModal = ({ title, startMonth }: DatePickerModalProps) => {
  const [selected, setSelected] = useState<Date>()

  return (
    <div className="flex w-[448px] flex-col items-center rounded-xl">
      <ModalHeader title={title} />
      <DayPicker
        mode="single"
        disabled={{ before: new Date() }}
        locale={ko}
        navLayout="around"
        startMonth={startMonth ?? undefined}
        showOutsideDays
        selected={selected}
        onSelect={setSelected}
        components={{ MonthCaption: DatePickerCaption }}
        classNames={{
          today: 'text-black',
          selected: 'border-2 rounded-full border-primary-400',
          month_caption: 'hidden',
          chevron: 'hidden',
          outside: 'text-gray-400',
          day_button: 'w-[53.7px] h-[40px]',
        }}
        className="py-6"
      />
      <DatePickerFooter selected={selected} />
    </div>
  )
}

export default DatePickerModal
