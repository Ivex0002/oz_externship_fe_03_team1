import type { StudyGroup } from '../../../types/StudyGroup'
import ModalHeader from '../ModalHeader'
import ReviewRating from './ReviewRating'
import ReviewText from './ReviewText'

const ReviewPostingModal = ({ studyGroup }: { studyGroup: StudyGroup }) => {
  const start = new Date(studyGroup.startDate)
  const startYear = start.getFullYear()
  const startMonth = start.getMonth() + 1
  const startDate = start.getDate()

  const end = new Date(studyGroup.endDate)
  const endYear = end.getFullYear()
  const endMonth = end.getMonth() + 1
  const endDate = end.getDate()

  return (
    <form className="w-[448px]">
      <ModalHeader title="리뷰 작성" />
      <main className="p-5">
        <div className="flex flex-col gap-3">
          <h3 className="text-[16px] font-medium">{studyGroup.title}</h3>
          <p className="text-sm font-normal text-gray-500">
            {startYear}년 {startMonth}월 {startDate}일 ~ {endYear}년 {endMonth}
            월 {endDate}일
          </p>
        </div>
        <ReviewRating />
        <ReviewText />
      </main>
      <footer className="flex gap-2.5">
        <button type="button" className="w-[195px]">
          취소
        </button>
        <button type="submit" className="w-[195px]">
          작성 완료
        </button>
      </footer>
    </form>
  )
}

export default ReviewPostingModal
