import { Calendar, Book } from 'lucide-react'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import type { StudyGroup } from '@/types/StudyGroupTypes'
import RatedStar from '../basicComponents/ratedStar/RatedStar'
import dayjs from '@/lib/dayjs'

// StudyCard 컴포넌트
const StudyCard = ({ study }: { study: StudyGroup }) => {
  const startDate = dayjs(study.start_at).format('YYYY.MM.DD')
  const endDate = dayjs(study.end_at).format('YYYY.MM.DD')
  const period = `${startDate} ~ ${endDate}`

  return (
    <div className="relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
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
          {study.status}
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
            <div className="flex items-center">
              <RatedStar rating={study.star_rating_avr} />

              <span className="ml-1 text-xs text-gray-500">
                {`(${study.review_count})`}
              </span>
            </div>

            <span className="text-primary-500 hover:text-primary-600 cursor-pointer text-sm font-medium transition hover:underline">
              상세보기
            </span>
          </div>

          {/* 버튼이 카드 하단 전체를 꽉 채움 */}
          <BasicButton type="primary" size="small">
            리뷰작성
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
