import { create } from 'zustand'

type ModalState = {
  isModalOpen: boolean
  prevPath: string
  title: string
  subTitle?: string
  isClosing: boolean
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
}

export const storeModalOpen = create<storeModalState>((set) => ({
  modalState: initState,
  setModalState: (newState) =>
    set((cur) => ({ modalState: { ...cur.modalState, ...newState } })),
  clearModal: () => set(() => ({ modalState: initState })),
}))
