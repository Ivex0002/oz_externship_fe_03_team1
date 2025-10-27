type Lectures = {
  id: number
  title: string
  instructor: string
}[]

export type StudyGroup = {
  id: number
  name: string
  profile_img_url: string
  max_headcount: number
  start_at: string
  end_at: string
  lectures: Lectures
  status: 'PENDING' | 'ONGOING' | 'ENDED'
  current_headcount: number
  is_leader: boolean
  review_count: number
  star_rating_avr: number
  is_reviewed: boolean
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
