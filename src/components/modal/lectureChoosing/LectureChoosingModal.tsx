import { BasicInput } from '@/components/basicComponents/input/BasicInput'
import { useState } from 'react'
import LectureCard from './LectureCard'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { ChevronLeft, ChevronRight } from 'lucide-react'
// import { useLoaderData } from 'react-router'

const lectureList = [
  {
    id: 1,
    title: 'React 완벽 마스터 강의 - 기초부터 고급까지',
    thumbnail_img_url: '',
    instructor: '김개발',
    duration: '12:30',
    price: 89000,
    platform: 'inflearn',
  },
  {
    id: 2,
    title: 'Node.js 백엔드 개발 완주 - 실무 프로젝트까지',
    thumbnail_img_url: '',
    instructor: '박서버',
    duration: '18:45',
    price: 120000,
    platform: 'inflearn',
  },
  {
    id: 3,
    title: 'Python 데이터 사이언스 마스터클레스',
    thumbnail_img_url: '',
    instructor: '이데이터',
    duration: '25:15',
    price: 150000,
    platform: 'inflearn',
  },
  {
    id: 4,
    title: 'JavaScript ES6+ 완벽 가이드 - 모던 자바스크립트',
    thumbnail_img_url: '',
    instructor: '최자바',
    duration: '15:20',
    price: 75000,
    platform: 'inflearn',
  },
  {
    id: 5,
    title: 'Vue.js 실전 프로젝트 - SPA 개발 완성',
    thumbnail_img_url: '',
    instructor: '정뷰',
    duration: '20:10',
    price: 95000,
    platform: 'inflearn',
  },
]

const LectureChoosingModal = () => {
  const [searchInputValue, setSearchInputValue] = useState('')
  //loader 생성 후 아래 코드로 변경
  //   const lectureList = useLoaderData()

  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value)
  }

  return (
    <div className="w-[896px]">
      <main className="p-6">
        <div className="border-b border-gray-200 pb-6">
          <BasicInput
            placeholder="강의명이나 강사명으로 검색..."
            value={searchInputValue}
            onChange={handleChangeInputValue}
          />
        </div>
        <div className="flex flex-col gap-4 pt-6">
          {lectureList.map((lecture) => (
            <LectureCard key={lecture.id} lecture={lecture} />
          ))}
        </div>
        <div className="center-center gap-2 pt-8">
          <BasicButton type="outline">
            <ChevronLeft />
          </BasicButton>
          <BasicButton type="outline">
            <ChevronRight />
          </BasicButton>
        </div>
      </main>
      <footer className="flex justify-between border-t border-gray-200 p-6">
        <span>{}개 강의 선택됨</span>
        <div className="flex gap-3">
          <BasicButton type="outline">취소</BasicButton>
          <BasicButton type="primary">선택 완료</BasicButton>
        </div>
      </footer>
    </div>
  )
}

export default LectureChoosingModal
