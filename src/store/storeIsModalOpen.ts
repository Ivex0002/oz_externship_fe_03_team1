import { create } from 'zustand'

interface storeIsModalOpen {
  isModalOpen: boolean
  SetModalOpen: (isOpen: boolean) => void
}
export const storeIsModalOpen = create<storeIsModalOpen>((set) => ({
  isModalOpen: false,
  SetModalOpen: (isOpen) => set(() => ({ isModalOpen: isOpen })),
}))
