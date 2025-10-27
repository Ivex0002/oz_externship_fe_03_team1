import { BasicButton } from '../../basicComponents/BasicButton/BasicButton'
import ReviewRating from './ReviewRating'
import ReviewText from './ReviewText'
import { useModal } from '@/hooks/useModal'
import { studyGroup } from '@/assets/dummyData/studyGroup'
import dayjs from '@/lib/dayjs'
import { storeReview } from '@/store/storeReview'
import { useEffect, useState } from 'react'
// import { useLoaderData } from 'react-router'

const ReviewModal = () => {
  const [rating, setRating] = useState(0)
  const [reviewInputValue, setReviewInputValue] = useState('')
  //loader 설정시 아래 코드로 변경
  // const studyGroup = useLoaderData<StudyGroup>()

  const startDate = dayjs(studyGroup.start_at).format('LL')
  const endDate = dayjs(studyGroup.end_at).format('LL')
  const period = `${startDate} ~ ${endDate}`

  const { closeModal } = useModal()

  const { previousMyReview, isEditReview } = storeReview()

  useEffect(() => {
    if (!isEditReview) return
    if (isEditReview) {
      setRating(previousMyReview.star_rating)
      setReviewInputValue(previousMyReview.content)
    }
  }, [isEditReview, previousMyReview])

  const handleClickCancel = (e: React.MouseEvent) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <form className="w-[448px]">
      <main className="p-6">
        <div className="flex flex-col gap-3">
          <h3 className="text-[16px] font-medium">{studyGroup.name}</h3>
          <p className="text-sm font-normal text-gray-500">{period}</p>
        </div>
        <ReviewRating rating={rating} setRating={setRating} />
        <ReviewText
          inputValue={reviewInputValue}
          setInputValue={setReviewInputValue}
        />
      </main>
      <footer className="flex w-full justify-between gap-2.5 p-6 pt-0">
        <BasicButton
          type="outline"
          onClick={(e) => handleClickCancel(e)}
          size="medium"
          className="w-full flex-1"
        >
          <span>취소</span>
        </BasicButton>
        <BasicButton className="w-full flex-1" type="secondary" size="medium">
          <span>작성 완료</span>
        </BasicButton>
      </footer>
    </form>
  )
}

export default ReviewModal
