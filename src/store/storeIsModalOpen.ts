import { create } from 'zustand'

interface ModalOpen {
  isModalOpen: boolean
  SetModalOpen: (isOpen: boolean) => void
}
export const storeModalOpen = create<ModalOpen>((set) => ({
  isModalOpen: false,
  SetModalOpen: (isOpen) => set(() => ({ isModalOpen: isOpen })),
}))
