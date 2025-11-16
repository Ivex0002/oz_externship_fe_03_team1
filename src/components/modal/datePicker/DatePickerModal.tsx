import { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { ko } from 'react-day-picker/locale'
import 'react-day-picker/style.css'
import { DatePickerCaption } from './DatePickerCaption'
import { DatePickerFooter } from './DatePickerFooter'
import dayjs from '@/lib/dayjs'
import { motion } from 'framer-motion'
import { storeModalOpen } from '@/store/storeModalOpen'
import type { ModalPropsMap } from '@/types/Modal'
import { storeDatePicker } from '@/store/storeDatePicker'

export const DatePickerModal = () => {
  const today = dayjs().toDate()
  const [month, setMonth] = useState(dayjs(today).set('date', 1).toDate())
  const [selected, setSelected] = useState<Date>()

  const { startDate, endDate, date, mode } = storeDatePicker()
  const { modalState } = storeModalOpen()

  const modalProps = modalState.modalProps

  const target = modalProps
    ? (modalProps as ModalPropsMap['DATE_PICKER']).target
    : null

  useEffect(() => {
    // if (!target) return
    if (target === 'start' && startDate) setSelected(startDate)

    if (target === 'end' && endDate) setSelected(endDate)

    if ((target === 'single' || mode === 'single') && date) setSelected(date)
  }, [target, startDate, endDate, date, mode])

  // if (!target) return null

  const disabledStartDate = {
    before: today,
    after: endDate ? dayjs(endDate).subtract(5, 'day').toDate() : undefined,
  }

  const disabledEndDate = {
    before: startDate
      ? dayjs(startDate).add(5, 'day').toDate()
      : dayjs(today).add(5, 'day').toDate(),
  }

  return (
    <motion.div
      layout
      transition={{ duration: 0.15, ease: 'linear' }}
      className="flex w-[448px] flex-col items-center rounded-xl"
    >
      <motion.div
        key={month.getMonth()} // month가 바뀔 때 새로 렌더링
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="h-[403.93px]"
      >
        <DayPicker
          mode="single"
          disabled={target === 'start' ? disabledStartDate : disabledEndDate}
          locale={ko}
          navLayout="around"
          showOutsideDays
          selected={selected}
          onSelect={setSelected}
          month={month}
          onMonthChange={setMonth}
          startMonth={
            selected
              ? dayjs(selected).set('date', 1).toDate()
              : dayjs(today).set('date', 1).toDate()
          }
          components={{ MonthCaption: DatePickerCaption }}
          classNames={{
            today: 'text-black',
            selected:
              'rounded-lg outline outline-2 outline-primary-400 outline-offset-[-2px] transition-colors duration-200',
            chevron: 'text-gray-600 pb-2',
            outside: 'text-gray-300',
            day_button:
              'rounded-lg w-[53.7px] h-[40px] hover:cursor-pointer outline outline-2 outline-transparent transition-colors duration-200 hover:bg-gray-100',
            disabled: 'text-gray-400 hover:cursor-not-allowed',
          }}
          className="py-6"
        />
      </motion.div>

      <DatePickerFooter selected={selected} target={target} />
    </motion.div>
  )
}
