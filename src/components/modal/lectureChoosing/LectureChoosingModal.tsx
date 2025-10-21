import { BasicInput } from '@/components/basicComponents/input/BasicInput'
import { useState } from 'react'
import LectureCard from './LectureCard'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { lectureList } from '@/assets/dummyData/lectureList'
import { storeLecture } from '@/store/storeLecture'
// import { useLoaderData } from 'react-router'

const LectureChoosingModal = () => {
  const [searchInputValue, setSearchInputValue] = useState('')
  const {
    selectedLectureList,
    previousLectureList,
    setPreviousLectureList,
    setSelectedLectureList,
  } = storeLecture()
  //loader 생성 후 아래 코드로 변경
  //   const lectureList = useLoaderData()

  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value)
  }

  const handleClickRevert = () => {
    setSelectedLectureList(previousLectureList)
  }

  const handleClickConfirm = () => {
    setPreviousLectureList(selectedLectureList)
  }

  return (
    <div className="w-[896px]">
      <main className="p-6">
        <div className="border-b border-gray-200 pb-6">
          <BasicInput
            placeholder="강의명이나 강사명으로 검색..."
            value={searchInputValue}
            onChange={handleChangeInputValue}
          >
            <Search size={16} />
          </BasicInput>
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
        <span className="text-sm font-normal text-gray-600">
          {selectedLectureList.length}개 강의 선택됨
        </span>
        <div className="flex gap-3">
          <BasicButton onClick={handleClickRevert} type="outline">
            취소
          </BasicButton>
          <BasicButton onClick={handleClickConfirm} type="primary">
            선택 완료
          </BasicButton>
        </div>
      </footer>
    </div>
  )
}

export default LectureChoosingModal
