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
  <div className="mb-8 w-1/3">
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
    <section className="mb-16 w-full">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">{title}</h2>

      {studies.length === 0 ? (
        <NoStudiesResult type={type} isSearchResult={isSearchResult} />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {studies.map((study) => (
            <StudyCard key={study.id} study={study} />
          ))}
        </div>
      )}
      {/* ✅ 고정된 grid 영역 유지 */}
      <div
        className={`grid min-h-[60vh] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
          hasNoStudies ? 'place-items-center' : ''
        }`}
      >
        {hasNoStudies ? (
          // ✅ 검색결과가 없을 때 중앙에 꽉 차게 표시
          <div className="col-span-full flex w-full justify-center">
            <div className="w-full max-w-[1100px]">
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
    <div className="min-h-screen bg-white px-20 pt-[65px] pb-20">
      <main className="mx-auto max-w-7xl">
        {/* 헤더 */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="mb-1 text-3xl font-bold text-gray-800">
              스터디 그룹
            </h1>
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
        </div>

        {/* 검색창 */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* ✅ 두 섹션 모두 동일한 빈 결과 크기 적용 */}
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
