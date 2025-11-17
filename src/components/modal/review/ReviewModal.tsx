import { useReviewMutation } from '@/hooks/api/mutations/useReviewMutation'
import { BasicButton } from '../../basicComponents/BasicButton/BasicButton'
import { ReviewRating } from './ReviewRating'
import { ReviewText } from './ReviewText'
import { useModal } from '@/hooks/useModal'
import dayjs from '@/lib/dayjs'
import { storeReview } from '@/store/storeReview'
import { useEffect, useState } from 'react'
import { storeModalOpen } from '@/store/storeModalOpen'
import type { ModalPropsMap } from '@/types/Modal'

const ReviewStudyBasicInfo = () => {
  const { basicStudyInfo } = storeReview()

  const startDate = dayjs(basicStudyInfo?.start_at).format('LL')
  const endDate = dayjs(basicStudyInfo?.end_at).format('LL')
  const period = `${startDate} ~ ${endDate}`

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[16px] font-medium">{basicStudyInfo?.name}</h3>
      <p className="text-sm font-normal text-gray-500">{period}</p>
    </div>
  )
}

export const ReviewModal = () => {
  const [rating, setRating] = useState(0)
  const [reviewInputValue, setReviewInputValue] = useState('')

  const { closeModal } = useModal()
  const { modalState } = storeModalOpen()
  const modalProps = modalState.modalProps
  const groupId = modalProps
    ? (modalProps as ModalPropsMap['REVIEW']).studyGroupId
    : ''

  const { previousMyReview, isEditReview, clearReviews } = storeReview()

  const { postReview, patchReview } = useReviewMutation(groupId)

  useEffect(() => {
    if (!isEditReview) {
      setRating(0)
      setReviewInputValue('')
    }
    if (isEditReview) {
      setRating(previousMyReview.rating)
      setReviewInputValue(previousMyReview.content)
    }
  }, [isEditReview, previousMyReview])

  const reviewRequestBody = {
    rating: previousMyReview.rating !== rating ? rating : undefined,
    content:
      previousMyReview.content !== reviewInputValue
        ? reviewInputValue
        : undefined,
  }

  const handleClickCancel = (e: React.MouseEvent) => {
    e.preventDefault()
    closeModal()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!groupId) return

    if (isEditReview) {
      patchReview.mutate({
        reviewId: previousMyReview.id,
        ...reviewRequestBody,
      })
    } else {
      postReview.mutate({
        rating: rating,
        content: reviewInputValue,
      })
    }

    clearReviews()
    closeModal()
  }

  return (
    <form className="w-[448px]">
      <main className="p-6">
        <ReviewStudyBasicInfo />
        <ReviewRating rating={rating} setRating={setRating} />
        <ReviewText
          inputValue={reviewInputValue}
          setInputValue={setReviewInputValue}
        />
      </main>
      <footer className="flex w-full justify-between gap-2.5 p-6 pt-0">
        <BasicButton
          variant="outline"
          onClick={(e) => handleClickCancel(e)}
          size="medium"
          className="w-full flex-1"
        >
          <span>취소</span>
        </BasicButton>
        <BasicButton
          className="w-full flex-1"
          variant="secondary"
          onClick={handleSubmit}
          size="medium"
        >
          <span>작성 완료</span>
        </BasicButton>
      </footer>
    </form>
  )
}
