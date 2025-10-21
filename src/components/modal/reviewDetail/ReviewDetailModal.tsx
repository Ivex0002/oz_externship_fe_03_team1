// import { useLoaderData } from 'react-router'
import { reviewDetailList } from '@/assets/dummyData/reviewList'
import ReviewDetailAverage from './ReviewDetailAverage'
import ReviewDetailCard from './ReviewDetailCard'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'

const ReviewDetailModal = () => {
  //loader 설정하면 아래 코드로 변경
  //   const reviewDetailList = useLoaderData<ReviewDetailList>()
  const reviews = reviewDetailList.reviews
  reviews.sort(
    (a, b) =>
      new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
  )

  const isPostedReview = reviews.some((review) => review.isMine === true)

  return (
    <div className="w-[672px]">
      <main className="flex flex-col items-center p-6">
        <ReviewDetailAverage
          averageRating={reviewDetailList.averageRating}
          totalReview={reviewDetailList.totalReview}
        />
        <div className="flex flex-col">
          {reviews.map((review) => (
            <ReviewDetailCard key={review.id} review={review} />
          ))}
        </div>
      </main>
      <footer className="flex justify-center border-t border-gray-200 p-6">
        {isPostedReview ? (
          <span>
            <BasicButton size="medium">내 리뷰 수정하기</BasicButton>
          </span>
        ) : (
          <span>
            <BasicButton size="medium">내 리뷰 작성하기</BasicButton>
          </span>
        )}
      </footer>
    </div>
  )
}

export default ReviewDetailModal
