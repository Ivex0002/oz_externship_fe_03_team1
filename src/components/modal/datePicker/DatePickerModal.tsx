import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { ko } from 'react-day-picker/locale'
import 'react-day-picker/style.css'

const DatePickerModal = () => {
  const [selected, setSelected] = useState<Date>()
  return (
    <div>
      <DayPicker
        animate
        mode="single"
        disabled={{ before: new Date() }}
        locale={ko}
        navLayout="around"
        showOutsideDays
        selected={selected}
        onSelect={setSelected}
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
