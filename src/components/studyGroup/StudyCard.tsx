import { Calendar, Book } from 'lucide-react'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import type { StudyGroup } from '@/types/StudyGroupTypes'
import RatedStar from '../basicComponents/ratedStar/RatedStar'
import dayjs from '@/lib/dayjs'
import { useModal } from '@/hooks/useModal'
import { useEffect } from 'react'
import { storeReview } from '@/store/storeReview'
import { reviewDetailData } from '@/assets/dummyData/reviewList'
import { dummyUser } from '@/assets/dummyData/dummyUser'

// StudyCard 컴포넌트
const StudyCard = ({ study }: { study: StudyGroup }) => {
  const { openModal } = useModal()
  const { reviewData, setReviewData, setPreviousMyReview, setBasicStudyInfo } =
    storeReview()

  const reviewList = reviewDetailData.results
  const myReview = reviewList.find((review) => review.user.id === dummyUser.id)
  const isReviewed = !!myReview

  const startDate = dayjs(study.start_at).format('LL')
  const endDate = dayjs(study.end_at).format('LL')
  const period = `${startDate} ~ ${endDate}`

  const basicStudyInfo = {
    id: study.id,
    name: study.name,
    start_at: study.start_at,
    end_at: study.end_at,
  }

  useEffect(() => {
    if (study.status === 'ONGOING') return
    if (study.status === 'ENDED') {
      // todo 스터디 리뷰 api 호출
      // setReviewData(api로 받아온 리뷰 데이터)
      setReviewData(reviewDetailData)
    }
  }, [study.status, setReviewData])

  const handleClickDetailReview = () => {
    if (study.status === 'ONGOING') return

    setBasicStudyInfo(basicStudyInfo)
    openModal(`/modal/review_detail/${study.id}`, '리뷰 상세', study.name)
  }

  const handleClickPostReview = () => {
    if (isReviewed) return

    setBasicStudyInfo(basicStudyInfo)
    openModal(`/modal/post_review/${study.id}`, '리뷰 작성')
  }

  const handleClickEditReview = () => {
    if (!isReviewed) return

    setPreviousMyReview(myReview, basicStudyInfo)
    openModal(`/modal/edit_review/${study.id}/${myReview.id}`, '리뷰 수정')
  }

  return (
    <div className="flex min-h-[360px] w-96 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      {/* 이미지 섹션 */}
      <div className="relative">
        <img
          src={study.profile_img_url}
          alt={study.name}
          className="h-52 w-full object-cover"
        />

        {/* 진행 상태 - 좌측 상단 */}
        <span
          className={`absolute top-3 left-3 rounded-full px-2 py-0.5 text-[11px] text-white ${
            study.status === 'ONGOING' ? 'bg-green-500' : 'bg-gray-400'
          }`}
        >
          {study.status === 'ONGOING' ? '진행중' : '완료'}
        </span>

        {/* 리더 표시 - 우측 상단 */}
        {study.is_leader && (
          <span className="border-primary-500 bg-primary-500 absolute top-3 right-3 rounded-full border-2 px-3 py-1 text-xs font-semibold text-white shadow-sm">
            리더
          </span>
        )}

        {/* 인원수 - 좌측 하단 */}
        <span className="absolute bottom-3 left-3 rounded-md border border-white bg-white px-2 py-0.5 text-xs font-semibold text-gray-800">
          {study.current_headcount}/{study.max_headcount}
        </span>
      </div>

      {/* 본문 */}
      <div className="flex flex-grow flex-col p-5">
        <h3 className="mb-2 text-lg font-semibold">{study.name}</h3>

        <p className="mb-3 text-sm text-gray-600">
          <span className="flex items-center gap-1 font-medium text-gray-800">
            <Calendar size={16} className="text-gray-700" /> 스터디 기간
          </span>
          <span className="mt-1 block">{period}</span>
        </p>

        <p className="mb-2 text-sm text-gray-600">
          <span className="flex items-center gap-1 font-medium text-gray-800">
            <Book size={16} className="text-gray-700" /> 스터디 강의
          </span>
          {study.lectures.map((lec) => (
            <span key={lec.id} className="mt-0.5 block">
              - {lec.title}
            </span>
          ))}
        </p>
      </div>

      {/* 완료 / 진행 상태 구분 */}
      {study.status === 'ENDED' ? (
        <div className="relative flex w-full flex-col items-stretch border-t border-gray-100 px-5 py-5">
          <div className="mb-2 flex w-full justify-between">
            {/* 별점 표시 */}
            <div className="flex items-center gap-2 font-medium text-gray-700">
              스터디 리뷰
              <div className="flex items-center gap-1">
                <RatedStar rating={reviewData.averageRating} />
                <span className="flex items-center text-xs text-gray-500">
                  {reviewData.averageRating} {`(${reviewData.count})`}
                </span>
              </div>
            </div>

            <span
              onClick={handleClickDetailReview}
              className="text-primary-500 hover:text-primary-600 cursor-pointer text-sm font-medium transition hover:underline"
            >
              상세보기
            </span>
          </div>

          {/* 버튼이 카드 하단 전체를 꽉 채움 */}
          <BasicButton
            variant={isReviewed ? 'secondary' : 'primary'}
            size="small"
            onClick={isReviewed ? handleClickEditReview : handleClickPostReview}
          >
            {isReviewed ? '리뷰 수정하기' : '리뷰 작성하기'}
          </BasicButton>
        </div>
      ) : (
        <div className="flex justify-end border-t border-gray-100 px-5 py-3">
          <span className="text-primary-500 hover:text-primary-600 cursor-pointer text-sm font-medium transition hover:underline">
            자세히 보기 →
          </span>
        </div>
      )}
    </div>
  )
}

export default StudyCard
