import { useModal } from '@/hooks/useModal'
import { BasicButton } from '../../basicComponents/BasicButton/BasicButton'
import { storeStudyGroupDate } from '@/store/storeStudyGroupDate'

type DatePickerFooterProps = {
  selected: Date | undefined
  target?: string | null
}

const DatePickerFooter = ({ selected, target }: DatePickerFooterProps) => {
  const { closeModal } = useModal()
  const { setNewStartDate, setNewEndDate } = storeStudyGroupDate()

  const handleClickCancel = (e: React.MouseEvent) => {
    e.preventDefault()
    closeModal()
  }

  const handleClickConfirm = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!selected) return
    if (target === 'start') setNewStartDate(selected)
    if (target === 'end') setNewEndDate(selected)
    closeModal()
  }

  return (
    <footer className="flex w-full items-center justify-between border-t border-gray-300 p-6">
      <p className="text-gray-600">
        {selected
          ? `선택한 날짜 : ${selected.toLocaleDateString()}`
          : '날짜를 선택하세요.'}
      </p>
      <div className="flex gap-3">
        <BasicButton type="outline" size="large" onClick={handleClickCancel}>
          취소
        </BasicButton>
        <BasicButton type="secondary" size="large" onClick={handleClickConfirm}>
          선택완료
        </BasicButton>
      </div>
    </footer>
  )
}

export default DatePickerFooter
