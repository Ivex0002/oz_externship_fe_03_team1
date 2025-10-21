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

const mockNotifications: UserNotification[] = [
  {
    id: 1,
    message:
      'Unity 게임 개발 프로젝트 팀원 모집 구인 공고에 대한 1건의 대기중인 지원자가 있습니다.',
    created_at: '12월 1일',
    type: 'application',
    is_read: false,
  },
  {
    id: 2,
    message:
      'React 실무 프로젝트 함께하실 분 모집합니다! 구인 공고에 대한 지원내역이 승인되었습니다.',
    created_at: '12월 1일',
    type: 'approval',
    is_read: true,
  },
  {
    id: 3,
    message:
      'React 실무 프로젝트 스터디에 김민지님이 참여했습니다. 환영해주세요!',
    created_at: '12월 1일',
    type: 'new_member',
    is_read: true,
  },
  {
    id: 4,
    message:
      'Vue.js 프론트엔드 개발팀 모집 구인 공고에 대한 지원내역이 거절되었습니다.',
    created_at: '12월 1일',
    type: 'rejection',
    is_read: false,
  },
]

/**
 * 키에 따른 알림 필터링 로직
 */
const applyFilter = (notifications: UserNotification[], filter: filterKey) => {
  return notifications.filter((el) =>
    filter === 'all' ? true : filter === 'unread' ? !el.is_read : el.is_read
  )
}

export const storeNotification = create<StoreNoti>()(
  subscribeWithSelector((set) => {
    // TODO : 초기값 나중에 api 받아와야 함
    const initialNotiArr = mockNotifications
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

/** notiArr 변화에 따라 스토어 내부값 자동으로 변경 해주는 로직 */
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
