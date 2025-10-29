import { BasicInput } from '@/components/basicComponents/input/BasicInput'
import { useState } from 'react'
import LectureCard from './LectureCard'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { Search } from 'lucide-react'
import { lectureData } from '@/assets/dummyData/lectureData'
import { storeLecture } from '@/store/storeLecture'
import { useModal } from '@/hooks/useModal'
import CustomPagination from '@/components/basicComponents/pagination/CustomPagination'
// import { useLoaderData } from 'react-router'

const LectureChoosingModal = () => {
  const [searchInputValue, setSearchInputValue] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const {
    selectedLectureList,
    previousLectureList,
    setPreviousLectureList,
    setSelectedLectureList,
  } = storeLecture()
  //loader 생성 후 아래 코드로 변경
  //   const lectureList = useLoaderData()
  const { closeModal } = useModal()

  const lecturesPerPage = 5
  const pageCount = Math.ceil(lectureData.count / lecturesPerPage)

  const lectureList = lectureData.results

  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value)
  }

  const onPageChange = (page: number) => setCurrentPage(page)

  const handleClickRevert = () => {
    setSelectedLectureList(previousLectureList)
    closeModal()
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
            <LectureCard key={lecture.uuid} lecture={lecture} />
          ))}
        </div>
        <CustomPagination
          pageCount={pageCount}
          onPageChange={onPageChange}
          currentPage={currentPage}
        />
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
