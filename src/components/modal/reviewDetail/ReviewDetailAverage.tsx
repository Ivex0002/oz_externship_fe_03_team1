import { RatedStar } from '@/components/basicComponents/ratedStar/RatedStar'

interface ReviewDetailAverageProps {
  averageRating: number | undefined
  totalReview: number | undefined
}

export const ReviewDetailAverage = ({
  averageRating,
  totalReview,
}: ReviewDetailAverageProps) => {
  if (averageRating === undefined || totalReview === undefined) return null

  return (
    <div className="flex w-full flex-col items-center gap-2 border-b border-gray-200 pb-6 text-gray-600">
      <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-900">
        <RatedStar rating={averageRating} />
        {averageRating}
      </div>
      총 {totalReview}개의 리뷰
    </div>
  )
}
