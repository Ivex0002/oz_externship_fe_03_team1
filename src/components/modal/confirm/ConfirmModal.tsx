import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { storeModalOpen } from '@/store/storeModalOpen'

export const ConfirmModal = () => {
  const { modalState } = storeModalOpen()
  const {
    isConfirm,
    message,
    confirmText = '확인',
    cancelText = '취소',
    onConfirm,
    onCancel,
  } = modalState

  if (!isConfirm) return null

  return (
    <div className="flex w-sm flex-col justify-center py-5">
      <div className="flex w-full flex-col pt-3 pb-5 text-center text-xl text-gray-900">
        {message}
      </div>
      <div className="flex w-full justify-between gap-5 px-8 pt-5">
        <BasicButton
          variant="outline"
          onClick={onCancel}
          className="w-full flex-1"
        >
          {cancelText}
        </BasicButton>
        <BasicButton
          variant="primary"
          onClick={onConfirm}
          className="w-full flex-1"
        >
          {confirmText}
        </BasicButton>
      </div>
    </div>
  )
}
