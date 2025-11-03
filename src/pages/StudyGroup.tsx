import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { BasicInput } from '@/components/basicComponents/input/BasicInput'
import { studyGroupList } from '@/assets/dummyData/studiesData'
import { useDebounce } from '@/hooks/useDebounce'
import { StudySection } from '@/components/studyGroup/StudySection'
import { CustomPagination } from '@/components/basicComponents/pagination/CustomPagination'

/** 검색창 컴포넌트 */
const SearchBar = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string
  setSearchTerm: (value: string) => void
}) => (
  <div className="mb-8 w-full max-w-md">
    <BasicInput
      placeholder="스터디 그룹 검색..."
      status="default"
      iconPosition="left"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    >
      <Search className="text-gray-400" size={18} />
    </BasicInput>
  </div>
)

export const StudyGroup = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // 페이지네이션
  const [activePage, setActivePage] = useState(0)
  const [completedPage, setCompletedPage] = useState(0)
  const itemsPerPage = 9 // 한 페이지당 표시할 스터디 개수

  // debounce
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // 검색 필터링
  const filteredStudyGroups = studyGroupList.filter((study) =>
    study.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  )

  const ongoingStudyGroupList = filteredStudyGroups.filter(
    (study) => study.status === 'ONGOING'
  )
  const completedStudyGroupList = filteredStudyGroups.filter(
    (study) => study.status === 'ENDED'
  )

  // 페이지네이션 데이터 분할
  const paginatedOngoing = ongoingStudyGroupList.slice(
    activePage * itemsPerPage,
    activePage * itemsPerPage + itemsPerPage
  )
  const paginatedCompleted = completedStudyGroupList.slice(
    completedPage * itemsPerPage,
    completedPage * itemsPerPage + itemsPerPage
  )

  return (
    <div className="flex min-h-screen w-screen flex-col bg-white px-5 pt-[65px] pb-20 sm:px-10 lg:px-20">
      {/* 헤더 */}
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <div>
          <h1 className="mb-1 text-3xl font-bold text-gray-800">스터디 그룹</h1>
          <p className="text-sm text-gray-600">
            함께 공부하며 성장하는 스터디 그룹에 참여해보세요
          </p>
        </div>
        <BasicButton
          variant="primary"
          onClick={() => (window.location.href = '/create_study_group')}
          size="medium"
        >
          <Plus size={16} /> 새 스터디 만들기
        </BasicButton>
      </header>

      {/* 검색창 */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* 메인 컨텐츠 */}
      <main className="mx-auto flex w-full flex-1 flex-col">
        {/* 진행중인 스터디 */}
        <StudySection
          title="진행중인 스터디"
          studies={paginatedOngoing}
          type="active"
          isSearchResult={!!searchTerm}
        />

        {ongoingStudyGroupList.length > itemsPerPage && (
          <CustomPagination
            pageCount={Math.ceil(ongoingStudyGroupList.length / itemsPerPage)}
            currentPage={activePage}
            onPageChange={(selectedPage) => setActivePage(selectedPage)}
          />
        )}

        {/* 완료된 스터디 */}
        <StudySection
          title="완료된 스터디"
          studies={paginatedCompleted}
          type="completed"
          isSearchResult={!!searchTerm}
        />

        {completedStudyGroupList.length > itemsPerPage && (
          <CustomPagination
            pageCount={Math.ceil(completedStudyGroupList.length / itemsPerPage)}
            currentPage={completedPage}
            onPageChange={(selectedPage) => setCompletedPage(selectedPage)}
          />
        )}
      </main>
    </div>
  )
}
