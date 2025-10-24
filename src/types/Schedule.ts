type ScheduleParticipant = {
  id: number
  nickname: string
  is_leader: boolean
}

export type Schedule = {
  id: number
  title: string
  goal: string
  date: string
  startTime: string
  endTime: string
  create_at: string
  participants: ScheduleParticipant[]
}
