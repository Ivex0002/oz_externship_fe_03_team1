// import { useLoaderData } from 'react-router'

import { reviewDetailList } from '@/assets/dummyData/reviewList'
import ReviewDetailAverage from './ReviewDetailAverage'

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

const ReviewDetailModal = () => {
  //loader 설정하면 아래 코드로 변경
  //   const reviewDetailList = useLoaderData<ReviewDetailList>()
  const reviews = reviewDetailList.reviews
  reviews.sort(
    (a, b) =>
      new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
  )

  return (
    <div className="w-[672px]">
      <main className="flex flex-col items-center gap-8 border-b border-gray-200 p-6">
        <ReviewDetailAverage
          averageRating={reviewDetailList.averageRating}
          totalReview={reviewDetailList.totalReview}
        />
      </main>
    </div>
  )
}

export default ReviewDetailModal
