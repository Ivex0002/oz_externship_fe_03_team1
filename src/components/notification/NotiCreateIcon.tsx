import type { NotificationType } from '@/types/Notification'
import {
  Calendar1,
  CalendarCheck,
  CalendarRange,
  Check,
  NotebookPen,
  UserRoundPlus,
  UsersRound,
  X,
  type LucideIcon,
} from 'lucide-react'

type NotificationStyle = {
  Icon: LucideIcon
  bg: string
  text: string
}

// 팔레트에 없는 색상도 있어서 일단 전부 다 헥스값으로 지정
export const NOTIFICATION_STYLE: Record<NotificationType, NotificationStyle> = {
  APPLICATION_CREATED: { Icon: UserRoundPlus, bg: '#DBEAFE', text: '#2563EB' },
  APPLICATION_STATUS_APPROVAL: { Icon: Check, bg: '#DCFCE7', text: '#16A34A' },
  APPLICATION_STATUS_REJECTION: { Icon: X, bg: '#FEE2E2', text: '#DC2626' },
  STUDY_MEMBER_JOINED: { Icon: UsersRound, bg: '#F3E8FF', text: '#9333EA' },
  STUDY_REVIEW_REQUEST: { Icon: CalendarCheck, bg: '#FFEDD5', text: '#EA580C' },
  STUDY_SCHEDULE_UPCOMING: { Icon: Calendar1, bg: '#E0E7FF', text: '#4F46E5' },
  STUDY_SCHEDULE_TODAY: { Icon: CalendarRange, bg: '#FCE7F3', text: '#DB2777' },
  STUDY_RECORD_CREATED: { Icon: NotebookPen, bg: '#CCFBF1', text: '#0D9488' },
}

/**
 * 아이콘과 색상을 입력받아 원형 배경이 적용된 아이콘을 만들어주는 메서드
 * @param {NotificationStyle} 아이콘(Icon), 아이콘 색상(text), 배경색상(bg)
 * @returns 원형배경과 색상이 적용된 아이콘
 */
export const createIconNode = ({ Icon, text, bg }: NotificationStyle) => {
  return (
    <div
      className="flex h-8 w-8 items-center justify-center rounded-full"
      style={{
        backgroundColor: bg,
        color: text,
      }}
    >
      <Icon size={14} color={text} />
    </div>
  )
}
