import { RatedStar } from '@/components/basicComponents/ratedStar/RatedStar'
import type { Review } from '@/types/Review'
import dayjs from '@/lib/dayjs'
import clsx from 'clsx'

type ReviewDetailCardProps = {
  review: Review
  index?: number
  isMine?: boolean
}

export const ReviewDetailCard = ({
  review,
  isMine,
  index,
}: ReviewDetailCardProps) => {
  const formattedUpdatedDate = dayjs(review.updated_at).format('LLL')

  return (
    <div
      className={clsx(
        'flex w-full flex-col gap-3 border-t border-gray-100 py-6',
        index === 0 && 'border-t-0'
      )}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2 text-gray-700">
          <RatedStar rating={review.rating} />
          {review.rating}/5
          {isMine && (
            <span className="bg-primary-100 text-primary-800 rounded-sm px-2 py-1">
              내 리뷰
            </span>
          )}
        </div>
        <span className="text-sm font-normal text-gray-500">
          {formattedUpdatedDate}
        </span>
      </div>
      <div className="font-normal text-gray-700">{review.content}</div>
    </div>
  )
}
