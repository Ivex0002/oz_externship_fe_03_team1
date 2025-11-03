import { Plus, Search } from 'lucide-react'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { BasicInput } from '@/components/basicComponents/input/BasicInput'
import { studyGroupList } from '@/assets/dummyData/studiesData'
import { useNavigate } from 'react-router'
import { StudySection } from '@/components/studyGroup/StudySection'

const SearchBar = () => (
  <div className="mb-8 w-1/3">
    <BasicInput
      placeholder="스터디 그룹 검색..."
      status="default"
      iconPosition="left"
    >
      <Search className="text-gray-400" size={18} />
    </BasicInput>
  </div>
)

export const StudyGroup = () => {
  const navigate = useNavigate()

  const ongoingStudyGroupList = studyGroupList.filter(
    (study) => study.status === 'ONGOING'
  )
  const completedStudyGroupList = studyGroupList.filter(
    (study) => study.status === 'ENDED'
  )
  // const ongoingWithLeader = studiesOngoing.map((s, i) =>
  //   i === 0 ? { ...s, isLeader: true } : s
  // )
  // const completedWithLeader = studiesCompleted.map((s, i) =>
  //   i === 0 ? { ...s, isLeader: true } : s
  // )

  const handleClickCreateStudy = () => {
    navigate('/create_study_group')
  }

  return (
    <div className="min-h-screen bg-white px-20 pt-[65px] pb-20">
      <main className="mx-auto max-w-7xl">
        {/* 헤더 영역 */}
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
        <SearchBar />

        {/* 스터디 섹션 */}
        <StudySection title="진행중인 스터디" studies={ongoingStudyGroupList} />
        <StudySection title="완료된 스터디" studies={completedStudyGroupList} />
      </main>
    </div>
  )
}
