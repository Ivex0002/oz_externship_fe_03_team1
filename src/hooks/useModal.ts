import { storeModalOpen, type ModalType } from '@/store/storeModalOpen'

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

  return { openModal, closeModal, modalToModal }
}
