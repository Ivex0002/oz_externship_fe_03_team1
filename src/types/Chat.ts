export type chatPanel = 'sessions' | 'messages'

type UserId = number

export type ChatUser = {
  id: UserId
  is_online: boolean
  nickName: string
}

type ChatSender = {
  id: number
  nickname: string
}

export type ChatMessage = {
  id: number
  sender: ChatSender
  content: string
  is_read: boolean
  created_at: string
}

type LastMessage = {
  id: number
  content: string
  sender_nickname: string
  created_at: string
}

export type ChatRoom = {
  uuid: string
  name: string
  last_message: LastMessage | null
  unread_message_count: number
  created_at: string
  updated_at: string
}
