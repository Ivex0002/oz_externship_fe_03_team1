import { BasicInput } from '@/components/basicComponents/input/BasicInput'
import { useState } from 'react'
import { LectureCard } from './LectureCard'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { Search } from 'lucide-react'
import { storeLecture } from '@/store/storeLecture'
import { useModal } from '@/hooks/useModal'
import { CustomPagination } from '@/components/basicComponents/pagination/CustomPagination'
import { useDebounce } from '@/hooks/useDebounce'
import { useQueryLecture } from '@/hooks/api/queries/useQueryLecture'

const LECTURES_PER_PAGE = 5

export const LectureChoosingModal = () => {
  const [searchInputValue, setSearchInputValue] = useState('')
  // const [lectureData, setLectureData] = useState<ApiLectureList>()
  const [currentPage, setCurrentPage] = useState(0)
  const {
    selectedLectureList,
    previousLectureList,
    setPreviousLectureList,
    setSelectedLectureList,
  } = storeLecture()

  const { closeModal } = useModal()

  const debouncedSearchInputValue = useDebounce(searchInputValue, 500)

  const lectureParams = {
    page: currentPage + 1,
    search: debouncedSearchInputValue || null,
    page_size: LECTURES_PER_PAGE,
  }

  const { data, error, isError, isPending } = useQueryLecture(lectureParams)

  const lectureData = data && data.data

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

        {isError && (
          <div className="text-danger-800 border-danger-100 w-full rounded-lg border-2 pt-6 text-center">
            {error.message}
          </div>
        )}

        {isPending && (
          <div className="w-full animate-pulse rounded-lg border-2 border-gray-300 pt-6 text-center">
            강의 목록을 받아오고 있습니다...
          </div>
        )}

        {data && (
          <div className="transparent-scrollbar flex h-[688px] flex-col gap-4 overflow-y-scroll pt-6">
            {lectureList &&
              lectureList.map((lecture) => (
                <LectureCard key={lecture.uuid} lecture={lecture} />
              ))}
          </div>
        )}

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
