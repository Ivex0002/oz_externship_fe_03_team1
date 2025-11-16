import type { chatMember, ChatMessage, chatPanel, ChatRoom } from '@/types/Chat'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface storeChat {
  isPanelOpen: boolean
  currentPanel: chatPanel
  currentChatRoomUUID: string | null
  messages: ChatMessage[]
  chatRooms: ChatRoom[]
  totalUnreadCount: number
  chatMembers: chatMember[]

  setIsPanelOpen: (isOpen: boolean) => void
  setCurrentPanel: (panel: chatPanel) => void
  setMessages: (messages: ChatMessage[]) => void
  addMessage: (message: ChatMessage) => void
  setChatRooms: (chatRooms: ChatRoom[]) => void
  togglePanel: (studyGroupUUID?: string) => void
  setOnlineUsers: (users: chatMember[]) => void
}

// 헬퍼 함수
const getTotalUnreadCount = (chatRooms: ChatRoom[]) =>
  chatRooms.reduce((acc, room) => acc + room.unread_message_count, 0)

export const storeChat = create<storeChat>()(
  subscribeWithSelector((set) => {
    return {
      isPanelOpen: false,
      currentPanel: 'sessions',
      currentChatRoomUUID: null,
      chatRooms: [],
      messages: [],
      totalUnreadCount: 0,
      chatMembers: [],

      setIsPanelOpen: (isOpen) => set({ isPanelOpen: isOpen }),
      setCurrentPanel: (panel) => set({ currentPanel: panel }),
      setMessages: (messages) => set({ messages: messages }),
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),

      setChatRooms: (Chatrooms) => {
        // console.log({ Chatrooms })

        return set({ chatRooms: Chatrooms })
      },
      togglePanel: (studyGroupUUID?) =>
        set((state) => ({
          currentPanel:
            state.currentPanel === 'sessions' ? 'messages' : 'sessions',
          currentChatRoomUUID:
            state.currentPanel === 'sessions' ? studyGroupUUID : null,
        })),
      setOnlineUsers: (users) => set({ chatMembers: users }),
    }
  })
)

// 구독
storeChat.subscribe(
  (state) => state.chatRooms,
  (chatRooms) => {
    const totalUnread = getTotalUnreadCount(chatRooms)
    storeChat.setState({
      totalUnreadCount: totalUnread,
    })
  }
)
