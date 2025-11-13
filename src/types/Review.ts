export type Review = {
  id: string
  isMine: boolean
  rating: number
  content: string
  created_at: string
  updated_at: string
}

export type ReviewDetailData = {
  count: number
  next: string | null
  previous: string | null
  results: Review[]
}

export type ReviewForm = {
  star_rating: number
  content: string
}

export interface ReviewApiResponse extends ReviewDetailData {
  meta: {
    avg_rating: number
    count_total: number
    group_id: string
    histogram: {
      1: number
      2: number
      3: number
      4: number
      5: number
    }
  }
}
