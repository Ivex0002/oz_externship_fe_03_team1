type StudyLecture = {
  uuid: string
  thumbnail_img_url: string
  title: string
  instructor: string
  url_link: string
}

// 스터디 그룹만 id 값이 uuid로 들어옴
export type StudyGroup = {
  uuid: string
  name: string
  profile_img_url: string
  max_headcount: number
  start_at: string
  end_at: string
  lectures: StudyLecture[]
  status: 'PENDING' | 'ONGOING' | 'ENDED'
  current_headcount: number
  is_leader: boolean
}

export interface StudyGroupForm {
  name: string
  introduction: string
  profile_img_url: string | null // 선택이니까 null 허용
  start_at: string
  end_at: string
  max_headcount: number
  status: 'PENDING' | 'ONGOING' | 'ENDED'
  lectures: StudyLecture[]
}

export type StudyGroupPost = {
  name: string
  introduction: string
  profile_img_url: string | null
  start_at: string
  end_at: string
  max_headcount: number
  // api 명세서를 기준으로 작성 - 이후 변경 가능성 있음
  // (스웨거) uuid[] 라고 기입되어 있음
  lectures: string[]
}

export type StudyGroupUpdate = {
  name: string
  introduction: string
  profile_img_url: string | null
  start_at: string
  end_at: string
  max_headcount: number
  lectures: string[]
}
