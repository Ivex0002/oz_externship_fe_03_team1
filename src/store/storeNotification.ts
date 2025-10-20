import type { UserNotification } from '@/types/Notification'
import { create } from 'zustand'

interface StoreNoti {
  notiArr: UserNotification[]
  isNotiPanelOpen: boolean
  setIsNotiPanelOpen: (val: boolean) => void
  setNotiArr: (notis: UserNotification[]) => void
  addNoti: (noti: UserNotification) => void
}

export const storeNotification = create<StoreNoti>((set) => ({
  notiArr: [],
  isNotiPanelOpen: false,
  setIsNotiPanelOpen: (val) => set(() => ({ isNotiPanelOpen: val })),
  setNotiArr: (notis) => set(() => ({ notiArr: notis })),
  addNoti: (noti) => set((state) => ({ notiArr: [...state.notiArr, noti] })),
}))
