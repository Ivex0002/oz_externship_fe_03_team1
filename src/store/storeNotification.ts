import { dummyNotifications } from '@/assets/dummyData/dummyNotification'
import type { UserNotification } from '@/types/Notification'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export type filterKey = 'all' | 'unread' | 'read'
interface StoreNoti {
  notiArr: UserNotification[]
  filtered: UserNotification[]
  currentFilter: filterKey
  isNotiPanelOpen: boolean
  unreadCount: number
  readCount: number
  setIsNotiPanelOpen: (val: boolean) => void
  setNotiArr: (notis: UserNotification[]) => void
  addNoti: (noti: UserNotification) => void
  filterNoti: (key: filterKey) => void
  markAllAsRead: () => void
}

/**
 * 키값에 따른 알림 필터링 로직
 */
const applyFilter = (notifications: UserNotification[], filter: filterKey) => {
  return notifications.filter((el) =>
    filter === 'all' ? true : filter === 'unread' ? !el.is_read : el.is_read
  )
}

export const storeNotification = create<StoreNoti>()(
  subscribeWithSelector((set) => {
    // TODO : 초기값 나중에 api 받아와야 함
    const initialNotiArr = dummyNotifications
    return {
      notiArr: initialNotiArr,
      filtered: initialNotiArr,
      currentFilter: 'all',
      isNotiPanelOpen: false,
      unreadCount: initialNotiArr.filter((el) => !el.is_read).length,
      readCount: initialNotiArr.filter((el) => el.is_read).length,
      setIsNotiPanelOpen: (val) => set(() => ({ isNotiPanelOpen: val })),
      setNotiArr: (notis) => set(() => ({ notiArr: notis })),
      addNoti: (noti) =>
        set((state) => ({ notiArr: [...state.notiArr, noti] })),
      filterNoti: (key) =>
        set((state) => ({
          currentFilter: key,
          filtered: applyFilter(state.notiArr, key),
        })),
      markAllAsRead: () => {
        set((state) => ({
          notiArr: state.notiArr.map((noti) => ({ ...noti, is_read: true })),
        }))
      },
    }
  })
)

// notiArr 변화에 따라 스토어 내부값 자동으로 변경 해주는 로직
storeNotification.subscribe(
  (state) => state.notiArr,
  (notiArr) => {
    const state = storeNotification.getState()
    storeNotification.setState({
      unreadCount: notiArr.filter((n) => !n.is_read).length,
      readCount: notiArr.filter((n) => n.is_read).length,
      filtered: applyFilter(notiArr, state.currentFilter),
    })
  }
)
