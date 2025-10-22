import RatedStar from '@/components/basicComponents/ratedStar/RatedStar'
import type { Review } from '@/types/Review'
import { formattedReviewUpdatedDate } from '@/utils/formattedDate'

const ReviewDetailCard = ({ review }: { review: Review }) => {
  const formattedUpdatedDate = formattedReviewUpdatedDate(review.updated_at)

  return (
    <div className="w-full border-t border-gray-100 py-6">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 text-gray-700">
          <RatedStar rating={review.rating} />
          {review.rating}/5
          {review.isMine && (
            <span className="bg-primary-100 text-primary-800 rounded-sm px-2 py-1">
              내 리뷰
            </span>
          )}
        </div>
        <span className="text-sm font-normal text-gray-500">
          {formattedUpdatedDate}
        </span>
      </div>
      <div className="font-normal text-gray-700">{review.reviewText}</div>
    </div>
  )
}

export default ReviewDetailCard
