import { Star } from 'lucide-react'

type ReviewDetailAverageProps = {
  averageRating: number
  totalReview: number
}

const ReviewDetailAverage = ({
  averageRating,
  totalReview,
}: ReviewDetailAverageProps) => {
  return (
    <div className="flex w-[672px] flex-col items-center">
      <div className="flex items-center justify-center gap-2 pb-6 text-2xl font-bold">
        <span className="flex">
          {Array.from({ length: 5 }, (_, i) => i).map((star) => (
            <Star
              key={star}
              className="text-primary-400"
              size={18}
              fill={averageRating >= star + 0.5 ? '#facc15' : 'white'}
            />
          ))}
        </span>
        {averageRating}
      </div>
      총 {totalReview}개의 리뷰
    </div>
  )
}

export default ReviewDetailAverage
