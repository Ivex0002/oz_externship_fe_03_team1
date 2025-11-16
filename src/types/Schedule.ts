export type Participant = {
  id: number
  user: {
    uuid: string
    nickname: string
  }
  is_leader: boolean
}

export type ScheduleDetail = {
  uuid?: string
  title: string
  objective: string
  session_date: string
  start_time: string
  end_time: string
  created_at?: string
  participants: Participant[]
}

export type Schedule = {
  uuid?: string
  title: string
  session_date: string
  start_time: string
  end_time: string
}

// 스터디 기록 타입
export type StudyRecord = {
  id: number
  title: string
  summary: string
  author: {
    id: number
    nickname: string
  }
  created_at: string
}

// API 응답 타입
export type StudyRecordsResponse = {
  count: number
  next: string | null
  previous: string | null
  results: StudyRecord[]
  page: number
  size: number
  order: string
  group_id: string
}
