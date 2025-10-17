import { useModal } from '@/hooks/useModal'
import { BasicButton } from '../../basicComponents/BasicButton/BasicButton'

type DatePickerFooterProps = {
  selected: Date | undefined
}

const DatePickerFooter = ({ selected }: DatePickerFooterProps) => {
  const { closeModal } = useModal()

  const handleClickCancel = (e: React.MouseEvent) => {
    e.preventDefault()
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
        <BasicButton
          type="outline"
          size="large"
          onClick={(e) => handleClickCancel(e)}
        >
          취소
        </BasicButton>
        <BasicButton type="secondary" size="large">
          선택완료
        </BasicButton>
      </div>
    </footer>
  )
}

export default DatePickerFooter
