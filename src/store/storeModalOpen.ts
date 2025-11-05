import type { ModalPropsMap, ModalType } from '@/types/Modal'
import { create } from 'zustand'

interface ModalState<T extends ModalType = ModalType> {
  isModalOpen: boolean
  modalType: T | null
  title?: string
  subTitle?: string
  modalProps?: ModalPropsMap[T]
}

interface ModalStore {
  modalState: ModalState
  openModal: <T extends ModalType>(
    modalType: T,
    options?: {
      title?: string
      subTitle?: string
      modalProps?: ModalPropsMap[T]
    }
  ) => void
  closeModal: () => void
  clearModal: () => void
}

const initState: ModalState = {
  isModalOpen: false,
  modalType: null,
  title: '',
  subTitle: '',

  modalProps: {},
}

export const storeModalOpen = create<ModalStore>((set) => ({
  modalState: initState,

  openModal: (modalType, options) =>
    set(() => ({
      modalState: {
        isModalOpen: true,
        modalType,
        title: options?.title || '',
        subTitle: options?.subTitle || '',
        modalProps: options?.modalProps || {},
      },
    })),

  closeModal: () => {
    set((cur) => ({
      modalState: { ...cur.modalState },
    }))
    setTimeout(() => {
      set(() => ({ modalState: initState }))
    }, 250)
  },

  clearModal: () => set(() => ({ modalState: initState })),
}))
