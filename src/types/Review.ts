export type Review = {
  id?: number
  star_rating: number
  content: string
  updated_at?: string
  user?: { id: number; nickname: string }
}

export type ReviewDetailList = {
  count: number
  next: string | null
  previous: string | null
  results: Review[]
}
