export type Review = {
  id: number
  star_rating: number
  content: string
  updated_at: string
  user: { id: number; nickname: string }
}

export type ReviewDetailData = {
  count: number
  averageRating: number
  next: string | null
  previous: string | null
  results: Review[]
}

export type ReviewForm = {
  star_rating: number
  content: string
}
