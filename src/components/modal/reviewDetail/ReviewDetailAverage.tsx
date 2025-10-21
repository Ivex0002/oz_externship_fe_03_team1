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
    <div className="flex w-full flex-col items-center gap-2 border-b border-gray-200 pb-6 text-gray-600">
      <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-900">
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
