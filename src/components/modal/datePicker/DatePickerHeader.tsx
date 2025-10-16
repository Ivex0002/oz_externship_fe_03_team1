import { X } from 'lucide-react'

type DatePickerHeaderProps = {
  title: string
}

const DatePickerHeader = ({ title }: DatePickerHeaderProps) => {
  return (
    <header className="flex w-full justify-between border-b border-gray-300 py-5">
      <h1>{title}</h1>
      <button>
        <X size={18} />
      </button>
    </header>
  )
}

export default DatePickerHeader
