import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { BasicInput } from '@/components/basicComponents/input/BasicInput'
import { studyGroupList } from '@/assets/dummyData/studiesData'
import { useNavigate } from 'react-router'
import { StudyCard } from '@/components/studyGroup/StudyCard'
import { NoStudiesResult } from '@/components/searchStudy/NoStudiesResult'
import type { StudyGroup as StudyGroupType } from '@/types/StudyGroupTypes'

const SearchBar = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string
  setSearchTerm: (value: string) => void
}) => (
  <div className="mb-8 w-full">
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

const StudySection = ({
  title,
  studies,
  type,
  isSearchResult,
}: {
  title: string
  studies: StudyGroupType[]
  type: 'active' | 'completed'
  isSearchResult: boolean
}) => {
  const hasNoStudies = studies.length === 0

  return (
    <section className="mb-20 flex w-full flex-col">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">{title}</h2>

      <div
        className={`grid min-h-[60vh] w-full grid-cols-3 gap-6 ${
          hasNoStudies ? 'place-items-center' : ''
        }`}
      >
        {hasNoStudies ? (
          <div className="col-span-full flex w-full justify-center">
            <div className="w-full">
              <NoStudiesResult type={type} isSearchResult={isSearchResult} />
            </div>
          </div>
        ) : (
          studies.map((study) => <StudyCard key={study.id} study={study} />)
        )}
      </div>
    </section>
  )
}

export const StudyGroup = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStudyGroups = studyGroupList.filter((study) =>
    study.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="flex min-h-screen flex-col bg-white">
      <header className="mx-auto mb-6 flex w-full max-w-[1120px] items-center justify-between">
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

      {/* 검색창 */}
      <div className="mx-auto w-full max-w-[1120px]">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* 메인 컨텐츠 */}
      <main className="mx-auto flex w-full max-w-[1120px] flex-1 flex-col">
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
