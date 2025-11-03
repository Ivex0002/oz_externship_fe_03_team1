import { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { ko } from 'react-day-picker/locale'
import 'react-day-picker/style.css'
import { DatePickerCaption } from './DatePickerCaption'
import { DatePickerFooter } from './DatePickerFooter'
import dayjs from '@/lib/dayjs'
import { useSearchParams } from 'react-router'
import { storeStudyGroupDate } from '@/store/storeStudyGroupDate'

export const DatePickerModal = () => {
  const [selected, setSelected] = useState<Date>()
  const params = useSearchParams()
  const target = params[0].get('target')

  const { previousStartDate, previousEndDate } = storeStudyGroupDate()

  const today = dayjs().toDate()

  useEffect(() => {
    if (target === 'start' && previousStartDate) {
      setSelected(previousStartDate)
    }
    if (target === 'end' && previousEndDate) {
      setSelected(previousEndDate)
    }
  }, [target, previousStartDate, previousEndDate])

  return (
    <div className="flex w-[448px] flex-col items-center rounded-xl">
      <DayPicker
        mode="single"
        disabled={
          target === 'start'
            ? {
                before: today,
                after: previousEndDate
                  ? dayjs(previousEndDate).subtract(5, 'day').toDate()
                  : undefined,
              }
            : {
                before: previousStartDate
                  ? dayjs(previousStartDate).add(5, 'day').toDate()
                  : dayjs(today).add(5, 'day').toDate(),
              }
        }
        locale={ko}
        navLayout="around"
        showOutsideDays
        selected={selected}
        onSelect={setSelected}
        startMonth={dayjs(today).set('date', 1).toDate()}
        components={{ MonthCaption: DatePickerCaption }}
        classNames={{
          today: 'text-black',
          selected: 'border-2 rounded-full border-primary-400',
          month_caption: 'hidden',
          chevron: 'hidden',
          outside: 'text-gray-300',
          day_button: 'w-[53.7px] h-[40px]',
          disabled: 'text-gray-400 hover:cursor-not-allowed',
        }}
        className="py-6"
      />
      <DatePickerFooter selected={selected} target={target} />
    </div>
  )
}
