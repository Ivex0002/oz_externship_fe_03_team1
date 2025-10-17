import { storeModalOpen } from '@/store/storeModalOpen'
import { X } from 'lucide-react'

type ModalHeaderProps = {
  title: string
  subTitle?: string | null
}

const ModalHeader = ({ title, subTitle = null }: ModalHeaderProps) => {
  const { setModalOpen: SetModalOpen } = storeModalOpen()

  const handleClickCancel = (e: React.MouseEvent) => {
    e.preventDefault()
    SetModalOpen(false)
  }

  return (
    <header className="flex w-full justify-between border-b border-gray-300 p-6 text-gray-900">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">{title}</h1>
        <h2 className="text-sm font-normal text-gray-500">{subTitle}</h2>
      </div>
      <button onClick={(e) => handleClickCancel(e)}>
        <X size={18} />
      </button>
    </header>
  )
}

export default ModalHeader
