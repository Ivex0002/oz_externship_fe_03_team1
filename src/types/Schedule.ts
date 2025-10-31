export type Member = {
  id: number
  nickname: string
  is_leader: boolean
}

export type Schedule = {
  id?: number
  title: string
  objective: string
  session_date: string
  start_time: string
  end_time: string
  created_at?: string
  schedule_members: Member[]
}
