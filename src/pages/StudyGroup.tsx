import { Plus, Search } from 'lucide-react'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { BasicInput } from '@/components/basicComponents/input/BasicInput'
import React, { useState } from 'react'
import type { StudyGroup as StudyGroupType } from '@/types/StudyGroupTypes'
import StudyCard from '@/components/studyGroup/StudyCard'
import { studyGroupList } from '@/assets/dummyData/studiesData'
import { useNavigate } from 'react-router'

const SearchBar: React.FC = () => (
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

const StudySection: React.FC<{ title: string; studies: StudyGroupType[] }> = ({
  title,
  studies,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const studiesPerPage = 9
  const totalPages = Math.ceil(studies.length / studiesPerPage)
  const indexOfLastStudy = currentPage * studiesPerPage
  const indexOfFirstStudy = indexOfLastStudy - studiesPerPage
  const currentStudies = studies.slice(indexOfFirstStudy, indexOfLastStudy)

  const isOngoing = title.includes('진행중')

  return (
    <section className="mb-16">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>

        {/* ✅ 개수 뱃지 스타일 변경 */}
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            isOngoing
              ? 'border-green-300 bg-green-200 text-green-700'
              : 'border-gray-300 bg-gray-200 text-gray-700'
          }`}
        >
          {studies.length}개 {isOngoing ? '진행중' : '완료'}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentStudies.map((study) => (
          <StudyCard key={study.id} study={study} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <BasicButton
            variant="secondary"
            size="small"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            이전
          </BasicButton>
          {[...Array(totalPages)].map((_, idx) => (
            <BasicButton
              key={idx}
              variant={currentPage === idx + 1 ? 'primary' : 'outline'}
              size="small"
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </BasicButton>
          ))}
          <BasicButton
            variant="secondary"
            size="small"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          >
            다음
          </BasicButton>
        </div>
      )}
    </section>
  )
}

const StudyGroup = () => {
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

export default StudyGroup
