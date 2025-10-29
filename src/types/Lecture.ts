interface LectureCategory {
  id: number
  name: string
}

export interface Lecture {
  uuid: string
  title: string
  instructor: string
  thumbnail_img_url: string
  categories: LectureCategory[]
  difficulty: string
  original_price: number
  discount_price: number
  platform: string
  average_rating: number
  url_link: string
  is_bookmarked: boolean
  duration: number // 단위: 분
}
