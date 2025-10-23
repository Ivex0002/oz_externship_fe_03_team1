import { useModal } from '@/hooks/useModal'
import { storeModalOpen } from '@/store/storeModalOpen'
import { X } from 'lucide-react'

const ModalHeader = () => {
  const { closeModal } = useModal()
  const { title, subTitle } = storeModalOpen().modalState

  const handleClickCancel = (e: React.MouseEvent) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <header className="flex justify-between border-b border-gray-300 p-6 text-gray-900">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        <h2 className="text-sm font-normal text-gray-500">{subTitle}</h2>
      </div>
      <button onClick={(e) => handleClickCancel(e)} className="cursor-pointer">
        <X size={18} className="text-gray-400" />
      </button>
    </header>
  )
}

export default ModalHeader
