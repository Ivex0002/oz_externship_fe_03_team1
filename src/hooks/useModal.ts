import { storeModalOpen } from '@/store/storeModalOpen'
import type { ModalPropsMap, ModalType } from '@/types/Modal'

export const useModal = () => {
  const { openModal, closeModal } = storeModalOpen.getState()

  const modalToModal = <T extends ModalType>(
    modalType: T,
    options?: {
      title?: string
      subTitle?: string
      modalProps?: ModalPropsMap[T]
    }
  ) => {
    closeModal()
    setTimeout(() => openModal(modalType, options), 250)
  }

  const openConfirm = (options: ModalPropsMap['CONFIRM']) => {
    openModal('CONFIRM', {
      title: '확인',
      subTitle: '',
      modalProps: options,
    })
  }

  return { openModal, closeModal, modalToModal, openConfirm }
}
