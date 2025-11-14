import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { BasicInput } from '@/components/basicComponents/input/BasicInput'
import { useDebounce } from '@/hooks/useDebounce'
import { StudySection } from '@/components/studyGroup/StudySection'
import { useNavigate } from 'react-router'
import { useQueryStudyGroup } from '@/hooks/api/queries/useQueryStudyGroup'
import type { StudyGroup as StudyGroupType } from '@/types/StudyGroupTypes'

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
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const navigate = useNavigate()

  const handleClickCreateStudy = () => {
    navigate('/create_study_group')
  }

  // API 연동: useQueryStudyGroup
  const { data, isLoading, error } = useQueryStudyGroup({
    page: 1,
    page_size: 100,
    search: debouncedSearchTerm || null,
  })

  const allStudies: StudyGroupType[] = data?.results || []

  // 상태별 분류
  const ongoingStudyGroupList = allStudies.filter(
    (study) => study.status === 'ONGOING'
  )
  const completedStudyGroupList = allStudies.filter(
    (study) => study.status === 'ENDED'
  )

  return (
    <div className="flex min-h-screen w-screen flex-col bg-white px-5 pt-[65px] pb-20 sm:px-10 lg:px-20">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <div>
          <h1 className="mb-1 text-3xl font-bold text-gray-800">스터디 그룹</h1>
          <p className="text-sm text-gray-600">
            함께 공부하며 성장하는 스터디 그룹에 참여해보세요
          </p>
        </div>
        <BasicButton
          variant="primary"
          onClick={handleClickCreateStudy}
          size="medium"
        >
          <Plus size={16} /> 새 스터디 만들기
        </BasicButton>
      </header>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="mx-auto flex w-full flex-1 flex-col">
        {isLoading ? (
          <div className="py-10 text-center">로딩중...</div>
        ) : error ? (
          <div className="py-10 text-center text-red-500">
            스터디 그룹을 불러오는 중 오류가 발생했습니다.
          </div>
        ) : (
          <>
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
          </>
        )}
      </main>
    </div>
  )
}
