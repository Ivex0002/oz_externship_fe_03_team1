import { storeModalOpen, type ModalType } from '@/store/storeModalOpen'

type OpenConfirmFn = (options: {
  message: string
  onConfirm: () => void | Promise<void>
  onCancel?: () => void
  title?: string
  subTitle?: string
  confirmText?: string
  cancelText?: string
}) => void

export const useModal = () => {
  const { openModal, closeModal } = storeModalOpen.getState()

  const modalToModal = <T extends Record<string, unknown>>(
    modalType: ModalType,
    options?: {
      title?: string
      subTitle?: string
      modalProps?: T
    }
  ) => {
    closeModal()
    setTimeout(() => {
      openModal(modalType, options)
    }, 250)
  }

  const openConfirm: OpenConfirmFn = (options) => {
    openModal('CONFIRM', {
      title: options.title ?? '확인',
      subTitle: options.subTitle ?? '',
      modalProps: {
        message: options.message,
        onConfirm: options.onConfirm,
        onCancel: options.onCancel,
        confirmText: options.confirmText ?? '확인',
        cancelText: options.cancelText ?? '취소',
      },
    })
  }

  return { openModal, closeModal, modalToModal, openConfirm }
}
