// Notification 이 이미 있는 타입 명이라 겹침 방지를 위해 user를 붙임
export type UserNotification = {
  id: number
  message: string
  type: NotificationType
  is_read: boolean
  created_at: string
}

export type NotificationType =
  | 'application'
  | 'approval'
  | 'rejection'
  | 'new_member'
  | 'study_end'
  | 'upcoming_schedule'
  | 'today_schedule'
  | 'record_writing'
