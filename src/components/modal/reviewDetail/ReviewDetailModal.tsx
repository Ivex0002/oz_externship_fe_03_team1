// import { useLoaderData } from 'react-router'
import { reviewDetailData } from '@/assets/dummyData/reviewList'
import ReviewDetailAverage from './ReviewDetailAverage'
import ReviewDetailCard from './ReviewDetailCard'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { dummyUser } from '@/assets/dummyData/dummyUser'
import { useModal } from '@/hooks/useModal'
import { useParams } from 'react-router'
import { storeReview } from '@/store/storeReview'
import dayjs from '@/lib/dayjs'

const ReviewDetailModal = () => {
  const { modalToModal } = useModal()
  const { basicStudyInfo, setPreviousMyReview } = storeReview()

  const params = useParams()
  //loader 설정하면 아래 코드로 변경
  //   const reviewDetailData = useLoaderData<ReviewDetailData>()
  const reviewList = reviewDetailData.results
  reviewList.sort((a, b) =>
    dayjs(a.updated_at).isBefore(dayjs(b.updated_at)) ? 1 : -1
  )

  const myReview = reviewList.find((review) => review.user.id === dummyUser.id)
  const isReviewed = !!myReview

  const handleClickPostReview = () => {
    if (isReviewed) return

    modalToModal(`/modal/post_review/${params.studyGroupId}`, '리뷰 작성')
  }

  const handleClickEditReview = () => {
    if (!isReviewed) return

    setPreviousMyReview(myReview, basicStudyInfo)
    modalToModal(
      `/modal/edit_review/${params.studyGroupId}/${myReview.id}`,
      '리뷰 수정'
    )
  }

  return (
    <div className="w-[672px]">
      <main className="flex flex-col items-center p-6">
        <ReviewDetailAverage
          averageRating={reviewDetailData.averageRating}
          totalReview={reviewDetailData.count}
        />
        <div className="flex flex-col">
          {reviewList.map((review) => (
            <ReviewDetailCard
              key={review.id}
              review={review}
              isMine={review === myReview}
            />
          ))}
        </div>
      </main>
      <footer className="flex justify-center border-t border-gray-200 p-6">
        {isReviewed ? (
          <span>
            <BasicButton size="medium" onClick={handleClickEditReview}>
              내 리뷰 수정하기
            </BasicButton>
          </span>
        ) : (
          <span>
            <BasicButton size="medium" onClick={handleClickPostReview}>
              내 리뷰 작성하기
            </BasicButton>
          </span>
        )}
      </footer>
    </div>
  )
}

export default ReviewDetailModal
