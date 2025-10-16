import { X } from 'lucide-react'

type ModalHeaderProps = {
  title: string
  subTitle?: string | null
}

const ModalHeader = ({ title, subTitle = null }: ModalHeaderProps) => {
  return (
    <header className="flex w-full justify-between border-b border-gray-300 p-6">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">{title}</h1>
        <h2 className="text-sm font-normal text-gray-500">{subTitle}</h2>
      </div>
      <button>
        <X size={18} />
      </button>
    </header>
  )
}

export default ModalHeader
