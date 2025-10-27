// import { useLoaderData } from 'react-router'
import { reviewDetailData } from '@/assets/dummyData/reviewList'
import ReviewDetailAverage from './ReviewDetailAverage'
import ReviewDetailCard from './ReviewDetailCard'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { dummyUser } from '@/assets/dummyData/dummyUser'

const ReviewDetailModal = () => {
  //loader 설정하면 아래 코드로 변경
  //   const reviewDetailData = useLoaderData<ReviewDetailData>()
  const reviews = reviewDetailData.results
  reviews.sort(
    (a, b) =>
      new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
  )

  const isPostedReview = reviews.some(
    (review) => review.user.id === dummyUser.id
  )

  return (
    <div className="w-[672px]">
      <main className="flex flex-col items-center p-6">
        <ReviewDetailAverage
          averageRating={reviewDetailData.averageRating}
          totalReview={reviewDetailData.count}
        />
        <div className="flex flex-col">
          {reviews.map((review) => (
            <ReviewDetailCard
              key={review.id}
              review={review}
              isMine={isPostedReview}
            />
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
