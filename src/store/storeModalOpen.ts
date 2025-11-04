import { create } from 'zustand'

export type ModalType =
  | null
  | 'REVIEW'
  | 'REVIEW_DETAIL'
  | 'DATE_PICKER'
  | 'LECTURE_CHOOSING'
  | 'SCHEDULE'
  | 'DETAIL_SCHEDULE'

interface ModalState {
  isModalOpen: boolean
  modalType: ModalType
  title?: string
  subTitle?: string
  modalProps?: Record<string, unknown>
}

interface ModalStore {
  modalState: ModalState
  openModal: (
    modalType: ModalType,
    options?: {
      title?: string
      subTitle?: string
      modalProps?: Record<string, unknown>
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
