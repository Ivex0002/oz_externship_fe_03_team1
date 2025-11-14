// Notification 이 이미 있는 타입 명이라 겹침 방지를 위해 user를 붙임
export type UserNotification = {
  id: number
  user_id: number
  type_display: string
  created_at: string
  content: string
  type: NotificationType
  is_read: boolean
  back_url_link: string
  user: number
}

export type NotificationType =
  | 'APPLICATION_CREATED'
  | 'APPLICATION_STATUS_APPROVAL'
  | 'APPLICATION_STATUS_REJECTION'
  | 'STUDY_MEMBER_JOINED'
  | 'STUDY_REVIEW_REQUEST'
  | 'STUDY_SCHEDULE_UPCOMING'
  | 'STUDY_SCHEDULE_TODAY'
  | 'STUDY_RECORD_CREATED'
