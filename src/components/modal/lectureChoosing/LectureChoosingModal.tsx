import { BasicInput } from '@/components/basicComponents/input/BasicInput'
import { useEffect, useState } from 'react'
import { LectureCard } from './LectureCard'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { Search } from 'lucide-react'
import { lectureData } from '@/assets/dummyData/lectureData'
import { storeLecture } from '@/store/storeLecture'
import { useModal } from '@/hooks/useModal'
import { CustomPagination } from '@/components/basicComponents/pagination/CustomPagination'
import { useDebounce } from '@/hooks/useDebounce'
import { getLectureData } from '@/api/lecture'
import type { ApiLectureList } from '@/types/Lecture'
// import { useLoaderData } from 'react-router'

const LECTURES_PER_PAGE = 5 // api 데이터 받아올때 page_size의 값으로 보냄. (page_size=value)

export const LectureChoosingModal = () => {
  const [searchInputValue, setSearchInputValue] = useState('')
  const [lectureData, setLectureData] = useState<ApiLectureList>()
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

  const debouncedSearchInputValue = useDebounce(searchInputValue, 500)

  // api 연결시에는 쿼리파라미터로 검색어를 보내서 리스트를 받아옴. (search=searchValue)
  // const lectureList = lectureData.results.filter(
  //   (lecture) =>
  //     lecture.instructor.includes(debouncedSearchInputValue) ||
  //     lecture.title.includes(debouncedSearchInputValue)
  // )

  useEffect(() => {
    const getLectureList = async () => {
      const data = await getLectureData()
      if (data) setLectureData(data)
      console.log(data?.results)
    }
    getLectureList()
  }, [])

  const pageCount =
    lectureData && Math.ceil(lectureData.count / LECTURES_PER_PAGE)
  const lectureList = lectureData?.results

  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value)
  }

  const onPageChange = (page: number) => setCurrentPage(page) // 다음 페이지 api 로직

  const handleClickRevert = () => {
    setSelectedLectureList(previousLectureList)
    closeModal()
  }

  const handleClickConfirm = () => {
    setPreviousLectureList(selectedLectureList)
    closeModal()
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
          {lectureList &&
            lectureList.map((lecture) => (
              <LectureCard key={lecture.uuid} lecture={lecture} />
            ))}
        </div>
        {pageCount && pageCount > 1 && (
          <CustomPagination
            pageCount={pageCount}
            onPageChange={onPageChange}
            currentPage={currentPage}
          />
        )}
      </main>
      <footer className="flex justify-between border-t border-gray-200 p-6">
        <span className="text-sm font-normal text-gray-600">
          {selectedLectureList.length}개 강의 선택됨
        </span>
        <div className="flex gap-3">
          <BasicButton onClick={handleClickRevert} variant="outline">
            취소
          </BasicButton>
          <BasicButton onClick={handleClickConfirm} variant="primary">
            선택 완료
          </BasicButton>
        </div>
      </footer>
    </div>
  )
}
