import { Calendar, Book } from 'lucide-react'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import type { StudyGroup } from '@/types/StudyGroupTypes'
import { RatedStar } from '../basicComponents/ratedStar/RatedStar'
import dayjs from '@/lib/dayjs'
import { useModal } from '@/hooks/useModal'
import { useEffect, useState } from 'react'
import { storeReview } from '@/store/storeReview'
import { useNavigate } from 'react-router'
import { useQueryReview } from '@/hooks/api/queries/useQueryReview'
import { toast } from 'react-toastify'
import { storeAccessToken } from '@/store/storeAccessToken'

interface StudyCardProps {
  study: StudyGroup
}

export const StudyCard = ({ study }: StudyCardProps) => {
  const { setAccessToken } = storeAccessToken()
  const dummyAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYzMTcxNTkxLCJpYXQiOjE3NjMwODUxOTEsImp0aSI6IjYyMjU5Zjc0Mzc4MDQwYjA4NjkxMTk1YzMwZjYxMzI3IiwidXNlcl9pZCI6IjEifQ.5tLzNfKasuv_kr7Opvu_zP7EvayK4Z6cibRZdtJ0F8Q'
  useEffect(() => {
    setAccessToken(dummyAccessToken)
  }, [])
  const navigate = useNavigate()
  const { openModal } = useModal()
  const { setPreviousMyReview, setBasicStudyInfo } = storeReview()
  const [imgError, setImgError] = useState(false)

  const startDate = dayjs(study.start_at).format('LL')
  const endDate = dayjs(study.end_at).format('LL')
  const period = `${startDate} ~ ${endDate}`

  const basicStudyInfo = {
    id: study.id,
    name: study.name,
    start_at: study.start_at,
    end_at: study.end_at,
  }

  const reviewParams = {
    page: 1,
    groupId: study.id,
  }
  const { data, error, isError, isPending } = useQueryReview(reviewParams)

  const reviewData = data && data.data
  const reviewList = reviewData ? reviewData.results : []

  const myReview = reviewList.find((review) => review.isMine === true)
  const isReviewed = !!myReview

  console.log('reviewData', reviewData)

  const handleClickDetailReview = () => {
    if (study.status === 'ONGOING') return
    setBasicStudyInfo(basicStudyInfo)
    openModal('REVIEW_DETAIL', {
      title: '리뷰 상세',
      subTitle: study.name,
      modalProps: { studyGroupId: study.id },
    })
  }

  const handleClickPostReview = () => {
    if (isReviewed) return
    setBasicStudyInfo(basicStudyInfo)
    openModal('REVIEW', {
      title: '리뷰 작성',
      modalProps: { studyGroupId: study.id },
    })
  }

  const handleClickEditReview = () => {
    if (!isReviewed) return
    setPreviousMyReview(myReview, basicStudyInfo)
    openModal('REVIEW', {
      title: '리뷰 수정',
      modalProps: { studyGroupId: study.id, reviewId: myReview.id },
    })
  }

  const handleNavigateDetail = () => {
    navigate(`/study_group_detail/${study.id}`)
  }

  return (
    <div className="flex min-h-[360px] w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-52 w-full bg-gray-100">
        {!imgError && study.profile_img_url ? (
          <img
            src={study.profile_img_url}
            alt={study.name}
            className="h-52 w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="h-52 w-full bg-gray-200" />
        )}

        <span
          className={`absolute top-3 left-3 rounded-full px-2 py-0.5 text-[11px] text-white ${
            study.status === 'ONGOING' ? 'bg-green-500' : 'bg-gray-400'
          }`}
        >
          {study.status === 'ONGOING' ? '진행중' : '완료'}
        </span>

        {study.is_leader && (
          <span className="border-primary-500 bg-primary-500 absolute top-3 right-3 rounded-full border-2 px-3 py-1 text-xs font-semibold text-white shadow-sm">
            리더
          </span>
        )}

        <span className="absolute bottom-3 left-3 rounded-md border border-white bg-white px-2 py-0.5 text-xs font-semibold text-gray-800">
          {study.current_headcount}/{study.max_headcount}
        </span>
      </div>

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

      {isError && toast.error((error as Error).message)}

      {study.status === 'ENDED' ? (
        <div className="relative flex w-full flex-col items-stretch border-t border-gray-100 px-5 py-5">
          <div className="mb-2 flex w-full justify-between">
            <div className="flex items-center gap-2 font-medium text-gray-700">
              스터디 리뷰
              {isPending ? (
                <span className="text-xs text-gray-400">로딩 중...</span>
              ) : (
                <div className="flex items-center gap-1">
                  <RatedStar rating={reviewData?.meta.avg_rating || 0} />
                  <span className="flex items-center text-xs text-gray-500">
                    {reviewData?.meta?.avg_rating || 0}{' '}
                    {`(${reviewData?.count || 0})`}
                  </span>
                </div>
              )}
            </div>

            <span
              onClick={(e) => {
                e.stopPropagation()
                handleClickDetailReview()
              }}
              className="text-primary-500 hover:text-primary-600 cursor-pointer text-sm font-medium transition hover:underline"
            >
              상세보기
            </span>
          </div>

          <BasicButton
            variant={isReviewed ? 'secondary' : 'primary'}
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              if (isReviewed) {
                handleClickEditReview()
              } else {
                handleClickPostReview()
              }
            }}
          >
            {isReviewed ? '리뷰 수정하기' : '리뷰 작성하기'}
          </BasicButton>
        </div>
      ) : (
        <div
          className="flex cursor-pointer justify-end border-t border-gray-100 px-5 py-3"
          onClick={handleNavigateDetail}
        >
          <span className="text-primary-600 hover:text-primary-500 text-sm font-medium">
            자세히 보기 →
          </span>
        </div>
      )}
    </div>
  )
}
