import { create } from 'zustand'

interface NotiOpen {
  isNotiOpen: boolean
  SetIsNotiOpen: (val: boolean) => void
}
export const storeNotiOpen = create<NotiOpen>((set) => ({
  isNotiOpen: false,
  SetIsNotiOpen: (val) => set(() => ({ isNotiOpen: val })),
}))
