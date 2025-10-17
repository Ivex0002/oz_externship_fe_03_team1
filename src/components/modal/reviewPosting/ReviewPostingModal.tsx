import type { StudyGroup } from '../../../types/StudyGroup'
import { BasicButton } from '../../basicComponents/BasicButton/BasicButton'
import ReviewRating from './ReviewRating'
import ReviewText from './ReviewText'
import { useModal } from '@/hooks/useModal'
// import { useLoaderData } from 'react-router'

const ReviewPostingModal = () => {
  const studyGroup: StudyGroup = {
    id: 1,
    name: 'string',
    introduction: 'string',
    profile_img_url: 'string',
    max_headcount: 10,
    start_at: '2025-10-16T13:29:17.588Z',
    end_at: '2025-10-16T13:29:17.588Z',
    lectures: [1],
  }
  //loader 설정시 아래 코드로 변경
  // const studyGroup = useLoaderData<StudyGroup>()

  const start = new Date(studyGroup.start_at)
  const startYear = start.getFullYear()
  const startMonth = start.getMonth() + 1
  const startDate = start.getDate()

  const end = new Date(studyGroup.end_at)
  const endYear = end.getFullYear()
  const endMonth = end.getMonth() + 1
  const endDate = end.getDate()
  const { closeModal } = useModal()

  const handleClickCancel = (e: React.MouseEvent) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <form className="w-[448px]">
      <main className="p-5">
        <div className="flex flex-col gap-3">
          <h3 className="text-[16px] font-medium">{studyGroup.name}</h3>
          <p className="text-sm font-normal text-gray-500">
            {startYear}년 {startMonth}월 {startDate}일 ~ {endYear}년 {endMonth}
            월 {endDate}일
          </p>
        </div>
        <ReviewRating />
        <ReviewText />
      </main>
      <footer className="flex w-[448px] gap-2.5">
        <BasicButton
          type="outline"
          onClick={(e) => handleClickCancel(e)}
          size="medium"
        >
          <span className="w-[calc(50%-5px)]">취소</span>
        </BasicButton>
        <BasicButton type="secondary" size="medium">
          <span className="w-[calc(50%-5px)]">작성 완료</span>
        </BasicButton>
      </footer>
    </form>
  )
}

export default ReviewPostingModal
