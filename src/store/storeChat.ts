import { dummyMessages, dummySessions } from '@/assets/dummyData/dummyChat'
import type {
  ChatMessage,
  chatPanel,
  ChatSession,
  ChatSessionUI,
} from '@/types/Chat'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface storeChat {
  isPanelOpen: boolean
  currentPanel: chatPanel
  currentSession: number | null
  messages: ChatMessage[]
  sessions: ChatSessionUI[]
  totalUnreadCount: number

  setIsPanelOpen: (isOpen: boolean) => void
  setCurrentPanel: (panel: chatPanel) => void
  setMessages: (messages: ChatMessage[]) => void
  addMessage: (message: ChatMessage) => void
  setMessagesAsAllRead: (sessionId: number) => void
  setSessions: (sessions: ChatSessionUI[]) => void
  togglePanel: (sessionId?: number) => void
  markAllAsRead: (sessionId: number) => void
}

// 헬퍼 함수
const getUnreadCount = (sessionId: number, messages: ChatMessage[]) =>
  messages.filter((m) => m.session_id === sessionId && !m.is_read).length

const getTotalUnreadCount = (messages: ChatMessage[]) =>
  messages.filter((m) => !m.is_read).length

const mapSessionsToUI = (
  sessions: ChatSession[],
  messages: ChatMessage[]
): ChatSessionUI[] =>
  sessions.map((session) => ({
    ...session,
    unreadCount: getUnreadCount(session.id, messages),
  }))

// TODO
// 1. initMessages 수정할 필요가 있음
//    어느 세션의 메시지인가?
//    []로 설정했다가 나중에 받아올건가?
//    당장은 dummyMessages에 세션 필터 걸고 쓰지만
//    나중에는 세션별로 GET 메서드를 활용해 메시지 배열을 가져오는게 맞음
//
// 2. 현재 스토어 상에서 totalUnreadCount를 관리하지만,
//    반드시 모든 메시지 배열을 가지고 있어야 한다는 점에서 불필요하게 많은 통신이 필요함
//    백엔드에서 totalUnreadCount 와 세션별 unreadCount를 전달해주는게 훨씬 적은 데이터를 사용함
//    지금 당장은 목데이터를 만지는 수준이라 직접 로직을 작성했으나 추후에 간소화할 필요가 있음
export const storeChat = create<storeChat>()(
  subscribeWithSelector((set) => {
    const initMessages = dummyMessages
    const initSessions = mapSessionsToUI(dummySessions, initMessages)

    return {
      isPanelOpen: false,
      currentPanel: 'sessions',
      currentSession: null,
      sessions: initSessions,
      messages: initMessages,
      // initSessions 에서 각 안읽은 메시지 개수 뽑아와서 합산
      totalUnreadCount: getTotalUnreadCount(initMessages),

      setIsPanelOpen: (isOpen) => set(() => ({ isPanelOpen: isOpen })),
      setCurrentPanel: (panel) => set(() => ({ currentPanel: panel })),
      setMessages: (messages) => set(() => ({ messages: messages })),
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      setMessagesAsAllRead: (sessionId) =>
        set((state) => ({
          messages: [
            ...state.messages.map((el) =>
              el.session_id === sessionId ? { ...el, is_read: true } : el
            ),
          ],
        })),
      setSessions: (sessions) => set({ sessions }),
      togglePanel: (sessionId?) =>
        set((state) => ({
          currentPanel:
            state.currentPanel === 'sessions' ? 'messages' : 'sessions',
          currentSession: state.currentPanel === 'sessions' ? sessionId : null,
        })),
      markAllAsRead: (sessionId) =>
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.session_id === sessionId ? { ...msg, is_read: true } : msg
          ),
        })),
    }
  })
)

// 구독
storeChat.subscribe(
  (state) => state.messages,
  (messages) => {
    const updatedSessions = mapSessionsToUI(
      storeChat.getState().sessions,
      messages
    )
    const totalUnread = getTotalUnreadCount(messages)
    storeChat.setState({
      sessions: updatedSessions,
      totalUnreadCount: totalUnread,
    })
  }
)
