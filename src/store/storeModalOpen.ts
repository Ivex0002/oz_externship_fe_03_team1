import { create } from 'zustand'

type ModalState = {
  isModalOpen: boolean
  prevPath: string
  title: string
  subTitle?: string
  isClosing: boolean

  isConfirm?: boolean
  message?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void
}
interface storeModalState {
  modalState: ModalState

  setModalState: (state: Partial<ModalState>) => void
  clearModal: () => void
}

const initState: ModalState = {
  isModalOpen: false,
  prevPath: '',
  title: '',
  subTitle: '',
  isClosing: false,

  isConfirm: false,
  message: '',
  confirmText: '확인',
  cancelText: '취소',
  onConfirm: undefined,
  onCancel: undefined,
}

export const storeModalOpen = create<storeModalState>((set) => ({
  modalState: initState,
  setModalState: (newState) =>
    set((cur) => ({ modalState: { ...cur.modalState, ...newState } })),
  clearModal: () => set(() => ({ modalState: initState })),
}))
