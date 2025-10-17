export interface StudyGroupForm {
  name: string
  description: string
  startDate: string
  endDate: string
  maxMembers: number
  lectures: string[]
  image: File | null
}
