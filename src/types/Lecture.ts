type LectureCategory = {
  id: number
  name: string
}

export type Lecture = {
  id: number
  uuid: string
  title: string
  instructor: string
  thumbnail_img_url: string
  categories: LectureCategory[]
  difficulty: string
  original_price: number
  discount_price: number
  platform: string
  average_rating: string
  url_link: string
  is_bookmarked: boolean
  duration: number // 단위: 분
}

export type ApiLectureList = {
  count: number
  next: string
  previous: string
  results: Lecture[]
  user_nickname: string
  recommended_lectures: Lecture[]
}
