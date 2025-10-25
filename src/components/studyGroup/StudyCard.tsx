import { Calendar, Book, Star, StarOff } from 'lucide-react'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import type { Study } from '@/types/StudyGroupTypes'

// 강의 태그 매핑
const lectureMapping: Record<string, string[]> = {
  'Node.js': ['Node.js 백엔드 완주', 'Express.js 심화'],
  'Vue.js': ['Vue.js 완벽 마스터', 'Vuex 상태관리'],
  TypeScript: ['TypeScript 마스터'],
  프론트엔드: ['HTML/CSS/JS 심화', '반응형 웹 구현'],
  백엔드: ['API 설계', '데이터베이스 연동'],
  '데이터 분석': ['Python 기반 데이터 처리', '시각화 및 분석'],
  머신러닝: ['ML 모델 학습', '평가 및 튜닝'],
  AI: ['AI 프로젝트 실습', '모델 배포'],
  딥러닝: ['딥러닝 모델 구현', 'TensorFlow/PyTorch 실습'],
  모바일: ['React Native/Flutter 실습', '앱 배포'],
  DB: ['SQL/NoSQL 데이터베이스', '최적화 및 쿼리 작성'],
}

// 리뷰 별점 계산 함수
const getStars = (review?: number) => {
  const stars: { filled: boolean }[] = []
  const fullStars = review ? Math.floor(review) : 0
  for (let i = 0; i < fullStars; i++) stars.push({ filled: true })
  while (stars.length < 5) stars.push({ filled: false })
  return stars
}

// StudyCard 컴포넌트
const StudyCard = ({ study }: { study: Study }) => {
  const lecturesMapped =
    study.tags?.flatMap((tag: string) => lectureMapping[tag] || []) || []
  const lecturesFinal =
    lecturesMapped.length > 0 ? lecturesMapped : ['기타 학습 내용 작성']
  const stars = getStars(study.review)

  return (
    <div className="relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      {/* 이미지 섹션 */}
      <div className="relative">
        <img
          src={study.image}
          alt={study.title}
          className="h-52 w-full object-cover"
        />

        {/* 진행 상태 - 좌측 상단 */}
        <span
          className={`absolute top-3 left-3 rounded-full px-2 py-0.5 text-[11px] text-white ${
            study.status === '진행중' ? 'bg-green-500' : 'bg-gray-400'
          }`}
        >
          {study.status}
        </span>

        {/* 리더 표시 - 우측 상단 */}
        {study.tags?.includes('리더') && (
          <span className="border-primary-500 bg-primary-500 absolute top-3 right-3 rounded-full border-2 px-3 py-1 text-xs font-semibold text-white shadow-sm">
            리더
          </span>
        )}

        {/* 인원수 - 좌측 하단 */}
        <span className="absolute bottom-3 left-3 rounded-md border border-white bg-white px-2 py-0.5 text-xs font-semibold text-gray-800">
          {study.members}/{study.maxMembers}
        </span>
      </div>

      {/* 본문 */}
      <div className="flex flex-grow flex-col p-5">
        <h3 className="mb-2 text-lg font-semibold">{study.title}</h3>

        <p className="mb-3 text-sm text-gray-600">
          <span className="flex items-center gap-1 font-medium text-gray-800">
            <Calendar size={16} className="text-gray-700" /> 스터디 기간
          </span>
          <span className="mt-1 block">{study.period}</span>
        </p>

        <p className="mb-2 text-sm text-gray-600">
          <span className="flex items-center gap-1 font-medium text-gray-800">
            <Book size={16} className="text-gray-700" /> 스터디 강의
          </span>
          {lecturesFinal.map((lec: string, idx: number) => (
            <span key={idx} className="mt-0.5 block">
              - {lec}
            </span>
          ))}
        </p>
      </div>

      {/* 완료 / 진행 상태 구분 */}
      {study.status === '완료' ? (
        <div className="relative flex w-full flex-col items-stretch border-t border-gray-100 px-5 py-5">
          <div className="mb-2 flex w-full justify-between">
            {/* 별점 표시 */}
            <div className="flex items-center">
              {stars.map((star, idx) =>
                star.filled ? (
                  <Star key={idx} size={16} color="#FBBF24" fill="#FBBF24" />
                ) : (
                  <StarOff key={idx} size={16} color="#E5E7EB" />
                )
              )}
              {study.review && (
                <span className="ml-1 text-xs text-gray-500">
                  {study.review.toFixed(1)}
                </span>
              )}
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
