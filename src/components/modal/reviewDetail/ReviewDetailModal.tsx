import { reviewDetailData } from '@/assets/dummyData/reviewList'
import { ReviewDetailAverage } from './ReviewDetailAverage'
import { ReviewDetailCard } from './ReviewDetailCard'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { dummyUser } from '@/assets/dummyData/dummyUser'
import { useModal } from '@/hooks/useModal'
import { storeReview } from '@/store/storeReview'
import dayjs from '@/lib/dayjs'
import {
  useQueryReview,
  type Ordering,
} from '@/hooks/api/queries/useQueryReview'
import { storeModalOpen } from '@/store/storeModalOpen'
import type { ModalPropsMap } from '@/types/Modal'
import { useEffect } from 'react'
import { storeAccessToken } from '@/store/storeAccessToken'

const ORDERING: Ordering = '-updated_at'
const PAGE_SIZE = null

export const ReviewDetailModal = () => {
  const { setAccessToken } = storeAccessToken()
  const dummyAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYzMDM4ODc1LCJpYXQiOjE3NjI5NTI0NzUsImp0aSI6IjU1YWMwMDQwOTllYTQyNzk4ZjcwOTI4NzcyYWVkNzgzIiwidXNlcl9pZCI6IjEifQ.A4HRA7yT0Y3iOPvL2H-aA9W1sKIXdCIzexxeCTVaZBs'
  const { modalToModal } = useModal()
  const { basicStudyInfo, setPreviousMyReview } = storeReview()

  const { modalState } = storeModalOpen()
  const modalProps = modalState.modalProps
  const groupId = (modalProps as ModalPropsMap['REVIEW_DETAIL']).studyGroupId

  const reviewParams = {
    page: 1,
    page_size: PAGE_SIZE,
    groupId: groupId,
    ordering: ORDERING,
  }
  const { data, error, isError, isPending } = useQueryReview(reviewParams)

  const reviewData = data && data.data
  const reviewList = reviewData ? reviewData.results : []

  console.log(data)

  useEffect(() => {
    setAccessToken(dummyAccessToken)
  }, [])

  const myReview = reviewList.find((review) => review.isMine === true)
  const isReviewed = !!myReview

  const handleClickPostReview = () => {
    if (isReviewed || !groupId) return

    modalToModal('REVIEW', {
      title: '리뷰 작성',
      modalProps: { studyGroupId: groupId },
    })
  }

  const handleClickEditReview = () => {
    if (!isReviewed) return

    setPreviousMyReview(myReview, basicStudyInfo)
    if (!groupId) return
    modalToModal('REVIEW', {
      title: '리뷰 수정',
      modalProps: { studyGroupId: groupId, reviewId: myReview.id },
    })
  }

  return (
    <div className="w-[672px]">
      <main className="flex flex-col items-center p-6">
        <ReviewDetailAverage
          averageRating={reviewData?.meta?.avg_rating}
          totalReview={reviewData?.meta?.count_total}
        />
        <div className="transparent-scrollbar flex h-[326px] w-full flex-col overflow-scroll">
          {reviewList &&
            reviewList.map((review, i) => (
              <ReviewDetailCard
                index={i}
                key={review.id}
                review={review}
                isMine={review.isMine}
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
