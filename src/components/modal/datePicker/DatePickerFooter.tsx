import { useModal } from '@/hooks/useModal'
import { BasicButton } from '../../basicComponents/BasicButton/BasicButton'
import { storeDatePicker } from '@/store/storeDatePicker'

interface DatePickerFooterProps {
  selected: Date | undefined
  target?: string | null
}

export const DatePickerFooter = ({
  selected,
  target,
}: DatePickerFooterProps) => {
  const { closeModal } = useModal()
  const { mode, setStartDate, setEndDate, setDate } = storeDatePicker()

  const handleClickCancel = (e: React.MouseEvent) => {
    e.preventDefault()
    if (mode === 'single' || target === 'single') return
    else closeModal()
  }

  const handleClickConfirm = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!selected) return
    if (target === 'start') {
      setStartDate(selected)
      closeModal()
    }
    if (target === 'end') {
      setEndDate(selected)
      closeModal()
    }
    if (mode === 'single' || target === 'single') setDate(selected)
  }

  return (
    <footer className="flex w-full items-center justify-between border-t border-gray-300 p-6">
      <p className="text-gray-600">
        {selected
          ? `선택한 날짜 : ${selected.toLocaleDateString()}`
          : '날짜를 선택하세요.'}
      </p>
      <div className="flex gap-3">
        <BasicButton variant="outline" size="large" onClick={handleClickCancel}>
          취소
        </BasicButton>
        <BasicButton
          variant="secondary"
          size="large"
          onClick={handleClickConfirm}
        >
          선택완료
        </BasicButton>
      </div>
    </footer>
  )
}
