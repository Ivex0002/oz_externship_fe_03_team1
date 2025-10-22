import { Star } from 'lucide-react'

function RatedStar({ rating }: { rating: number }) {
  return (
    <span className="flex">
      {Array.from({ length: 5 }, (_, i) => i).map((star) => (
        <Star
          key={star}
          className="text-primary-400"
          size={18}
          fill={rating >= star + 0.5 ? '#facc15' : 'white'}
        />
      ))}
    </span>
  )
}

export default RatedStar
