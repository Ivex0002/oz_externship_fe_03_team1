import React, { useState } from 'react'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import StudyCard from './StudyCard'
import type { StudyGroup } from '@/types/StudyGroupTypes'

const StudySection: React.FC<{ title: string; studies: StudyGroup[] }> = ({
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
            type="secondary"
            size="small"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            이전
          </BasicButton>
          {[...Array(totalPages)].map((_, idx) => (
            <BasicButton
              key={idx}
              type={currentPage === idx + 1 ? 'primary' : 'outline'}
              size="small"
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </BasicButton>
          ))}
          <BasicButton
            type="secondary"
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

export default StudySection
