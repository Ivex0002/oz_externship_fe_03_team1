type ScheduleParticipant = {
  id: number
  nickname: string
  is_leader: boolean
}

export type Schedule = {
  id?: number
  title: string
  goal: string
  date: string
  startTime: string
  endTime: string
  created_at?: string
  participants: ScheduleParticipant[]
}
