import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { storeModalOpen } from '@/store/storeModalOpen'

export const ConfirmModal = () => {
  const { modalState, closeModal } = storeModalOpen()
  const { modalType, modalProps } = modalState

  if (modalType !== 'CONFIRM') return null
  if (!modalProps) return null

  const {
    message,
    onConfirm,
    onCancel,
    confirmText = '확인',
    cancelText = '취소',
  } = modalProps as {
    message: string
    onConfirm: () => void | Promise<void>
    onCancel?: () => void
    confirmText?: string
    cancelText?: string
  }

  const handleConfirm = async () => {
    await onConfirm?.()
    closeModal()
  }

  const handleCancel = () => {
    onCancel?.()
    closeModal()
  }

  return (
    <div className="flex w-sm flex-col justify-center py-5">
      <div className="flex w-full flex-col pt-3 pb-5 text-center text-xl text-gray-900">
        {message}
      </div>
      <div className="flex w-full justify-between gap-5 px-8 pt-5">
        <BasicButton
          variant="outline"
          onClick={handleCancel}
          className="w-full flex-1"
        >
          {cancelText}
        </BasicButton>
        <BasicButton
          variant="primary"
          onClick={handleConfirm}
          className="w-full flex-1"
        >
          {confirmText}
        </BasicButton>
      </div>
    </div>
  )
}
