export type Review = {
  id: number
  rating: number
  reviewText: string
  updated_at: string
  isMine: boolean
}

export type ReviewDetailList = {
  averageRating: number
  totalReview: number
  reviews: Review[]
}
