import type { UserNotification } from '@/types/Notification'

export const dummyNotifications: UserNotification[] = [
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
