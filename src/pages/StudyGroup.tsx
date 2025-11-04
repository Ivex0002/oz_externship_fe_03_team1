import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { BasicInput } from '@/components/basicComponents/input/BasicInput'
import { studyGroupList } from '@/assets/dummyData/studiesData'
import { useDebounce } from '@/hooks/useDebounce'
import { StudySection } from '@/components/studyGroup/StudySection'
import { NoStudiesResult } from '@/components/searchStudy/NoStudiesResult'
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

  const filteredStudyGroups = studyGroupList.filter((study) =>
    study.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  )

  const ongoingStudyGroupList = filteredStudyGroups.filter(
    (study) => study.status === 'ONGOING'
  )
  const completedStudyGroupList = filteredStudyGroups.filter(
    (study) => study.status === 'ENDED'
  )

  const handleClickCreateStudy = () => {
    navigate('/create_study_group')
  }

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

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <StudySection
          title="진행중인 스터디"
          studies={ongoingStudyGroupList}
          type="active"
          isSearchResult={!!searchTerm}
        />
        <StudySection
          title="완료된 스터디"
          studies={completedStudyGroupList}
          type="completed"
          isSearchResult={!!searchTerm}
        />
      </main>
    </div>
  )
}
