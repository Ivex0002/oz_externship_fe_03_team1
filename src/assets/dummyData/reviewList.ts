type Review = {
  id: number
  rating: number
  reviewText: string
  updated_at: string
  isMine: boolean
}

type ReviewDetailList = {
  averageRating: number
  totalReview: number
  reviews: Review[]
}

export const reviewDetailList: ReviewDetailList = {
  averageRating: 2.3,
  totalReview: 2,
  reviews: [
    {
      id: 1,
      rating: 4,
      reviewText:
        '스터디 리더님이 열정적으로 이끌어주셔서 끝까지 완주할 수 있었습니다. 다만 난이도가 조금 높았어요',
      updated_at: `${new Date().toISOString()}`,
      isMine: false,
    },
    {
      id: 2,
      rating: 5,
      reviewText:
        '동료들과의 협업 프로젝트가 특히 도움되었습니다. 실무 경험을 쌓을 수 있어서 좋았어요.',
      updated_at: `${new Date().toISOString()}`,
      isMine: true,
    },
  ],
}
