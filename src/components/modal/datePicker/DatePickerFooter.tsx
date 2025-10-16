type DatePickerFooterProps = {
  selected: Date | undefined
}

const DatePickerFooter = ({ selected }: DatePickerFooterProps) => {
  return (
    <footer className="flex w-full justify-between border-t border-gray-300 p-5">
      <p>
        {selected
          ? `선택한 날짜 : ${selected.toLocaleDateString()}`
          : '날짜를 선택하세요.'}
      </p>
      <div className="flex gap-3">
        <button>취소</button>
        <button>선택완료</button>
      </div>
    </footer>
  )
}

export default DatePickerFooter
