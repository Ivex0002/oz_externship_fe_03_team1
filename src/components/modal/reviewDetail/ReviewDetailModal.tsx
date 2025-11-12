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
const PAGE_SIZE = 3

export const ReviewDetailModal = () => {
  const { setAccessToken, accessToken } = storeAccessToken()
  const dummyAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYzMDE4ODk3LCJpYXQiOjE3NjI5MzI0OTcsImp0aSI6ImE0MzNlMWEyMmVmMTQ4OTk4NzI3ZDNkMDhkMzY2NTg2IiwidXNlcl9pZCI6IjEifQ.rDLcLKHqt78FXKJgdzQluGdBDnTvmDBSXBsWuh16Tac'
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

  console.log(data)

  useEffect(() => {
    setAccessToken(dummyAccessToken)
    console.log(dummyAccessToken)
    console.log('accessToken', accessToken)
  }, [])

  const reviewList = reviewDetailData.results
  reviewList.sort((a, b) =>
    dayjs(a.updated_at).isBefore(dayjs(b.updated_at)) ? 1 : -1
  )

  const myReview = reviewList.find((review) => review.user.id === dummyUser.id)
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
