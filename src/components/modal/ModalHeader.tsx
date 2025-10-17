import { useModal } from '@/hooks/useModal'
import { X } from 'lucide-react'

type ModalHeaderProps = {
  title: string
  subTitle?: string | null
  onClose: () => void
}

const ModalHeader = ({ title, subTitle = null, onClose }: ModalHeaderProps) => {
  const { closeModal } = useModal()

  const handleClickCancel = (e: React.MouseEvent) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <header className="flex w-full justify-between border-b border-gray-300 p-6 text-gray-900">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">{title}</h1>
        <h2 className="text-sm font-normal text-gray-500">{subTitle}</h2>
      </div>
      <button onClick={(e) => handleClickCancel(e)}>
        <X size={18} onClick={() => onClose()} className="cursor-pointer" />
      </button>
    </header>
  )
}

export default ModalHeader
