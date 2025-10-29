export type chatPanel = 'sessions' | 'messages'

type UserId = number

export type ChatUser = {
  id: UserId
  is_online: boolean
  nickName: string
}

export type ChatMessage = {
  id: number
  session_id: number
  sender: UserId
  content: string
  created_at: string
  is_read: boolean
}

export type ChatSession = {
  id: number
  title: string
  last_sender: UserId
  last_message: string
  updated_at: string
  member: UserId[]
}

export type ChatSessionUI = ChatSession & {
  unreadCount: number
}
