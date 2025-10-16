import DatePickerModal from '../components/modal/datePicker/DatePickerModal'

function TestH() {
  const title = '스터디 시작일 선택'
  // const currentDate = new Date()
  // const year = currentDate.getFullYear()
  // const month = currentDate.getMonth()
  // const startMonth = new Date(year, month, 1)
  return (
    <div>
      <DatePickerModal title={title} />
    </div>
  )
}

export default TestH
