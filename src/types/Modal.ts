export type ModalType =
  | 'CONFIRM'
  | 'SCHEDULE'
  | 'DETAIL_SCHEDULE'
  | 'REVIEW'
  | 'REVIEW_DETAIL'
  | 'DATE_PICKER'
  | 'LECTURE_CHOOSING'

export interface ModalPropsMap {
  // [1] Confirm 모달
  CONFIRM: {
    message: string
    onConfirm: () => void | Promise<void>
    onCancel?: () => void
    confirmText?: string
    cancelText?: string
  }

  // [2] 스케줄 모달 2종 (공통 구조)
  // studyGroupId 만 uuid
  // 나머지는 int
  SCHEDULE: {
    studyGroupId: string
    scheduleId?: string
  }
  DETAIL_SCHEDULE: {
    studyGroupId: string
    scheduleId: string
  }

  // [3] 리뷰 작성/수정 모달
  REVIEW: {
    studyGroupId: string
    reviewId?: string
  }

  // [4] 리뷰 상세 모달
  REVIEW_DETAIL: {
    studyGroupId: string
  }

  // [5] 날짜 선택 모달
  DATE_PICKER: {
    target: 'start' | 'end' | 'single'
  }

  // 강의 선택 모달 현재 props 없음
  LECTURE_CHOOSING: Record<string, never>
}
