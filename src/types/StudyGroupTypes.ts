type Lectures = {
  id: number
  title: string
  instructor: string
}[]

// 스터디 그룹만 id 값이 uuid로 들어옴
export type StudyGroup = {
  id: string
  name: string
  profile_img_url: string
  max_headcount: number
  start_at: string
  end_at: string
  lectures: Lectures
  status: 'PENDING' | 'ONGOING' | 'ENDED'
  current_headcount: number
  is_leader: boolean
}

export interface StudyGroupForm {
  name: string
  description: string
  startDate: string
  endDate: string
  maxMembers: number
  lectures: string[]
  image: File | null
}
