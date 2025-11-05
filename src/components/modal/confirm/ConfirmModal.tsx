import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { storeModalOpen } from '@/store/storeModalOpen'
import type { ModalPropsMap } from '@/types/Modal'

// modalProps: {
//   message: options.message,
//   onConfirm: options.onConfirm,
//   onCancel: options.onCancel,
//   confirmText: options.confirmText ?? '확인',
//   cancelText: options.cancelText ?? '취소',
// },

export const ConfirmModal = () => {
  const { modalState, closeModal } = storeModalOpen()
  const { modalType, modalProps } = modalState

  if (modalType !== 'CONFIRM' || !modalProps) return null

  const props = modalProps as ModalPropsMap['CONFIRM']

  const handleConfirm = async () => {
    await props.onConfirm?.()
    closeModal()
  }

  const handleCancel = () => {
    props.onCancel?.()
    closeModal()
  }

  return (
    <div className="flex w-sm flex-col justify-center py-5">
      <div className="flex w-full flex-col pt-3 pb-5 text-center text-xl text-gray-900">
        {props.message}
      </div>
      <div className="flex w-full justify-between gap-5 px-8 pt-5">
        <BasicButton
          variant="outline"
          onClick={handleCancel}
          className="w-full flex-1"
        >
          {props.cancelText ?? '취소'}
        </BasicButton>
        <BasicButton
          variant="primary"
          onClick={handleConfirm}
          className="w-full flex-1"
        >
          {props.confirmText ?? '확인'}
        </BasicButton>
      </div>
    </div>
  )
}
