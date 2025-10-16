import { Star } from 'lucide-react'
import { useState } from 'react'

const ReviewRating = () => {
  const [rating, setRating] = useState(0)
  const ratingStarCount = [1, 2, 3, 4, 5]

  return (
    <div className="flex w-[448px] flex-col gap-3 pt-6">
      <h3 className="text-sm font-medium">
        별점 <span className="text-danger-600">*</span>
      </h3>
      <div>
        {ratingStarCount.map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="text-primary-400"
          >
            <Star fill={rating >= star ? '#facc15' : 'white'} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ReviewRating
