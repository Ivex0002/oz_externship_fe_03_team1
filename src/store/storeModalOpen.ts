import { create } from 'zustand'

type ModalState = {
  isModalOpen: boolean
  prevPath: string
  title: string
  subTitle?: string
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
}

export const storeModalOpen = create<storeModalState>((set) => ({
  modalState: initState,
  setModalState: (newState) =>
    set((cur) => ({ modalState: { ...cur.modalState, ...newState } })),
  clearModal: () => set(() => ({ modalState: initState })),
}))
