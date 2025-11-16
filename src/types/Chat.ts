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
  content: string
  created_at: string
  id: number
  sender: ChatSender
  study_group_uuid: string
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
