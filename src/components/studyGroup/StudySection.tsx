import { useState } from 'react'
import { StudyCard } from '@/components/studyGroup/StudyCard'
import { NoStudiesResult } from '@/components/searchStudy/NoStudiesResult'
import { CustomPagination } from '@/components/basicComponents/pagination/CustomPagination'
import type { StudyGroup as StudyGroupType } from '@/types/StudyGroupTypes'

interface StudySectionProps {
  title: string
  studies: StudyGroupType[]
  type: 'active' | 'completed'
  isSearchResult: boolean
  itemsPerPage?: number // 페이지당 표시할 개수 (기본값 9)
}

export const StudySection = ({
  title,
  studies,
  type,
  isSearchResult,
  itemsPerPage = 9,
}: StudySectionProps) => {
  const [currentPage, setCurrentPage] = useState(0)
  const hasNoStudies = studies.length === 0

  // 페이지네이션 계산
  const startIndex = currentPage * itemsPerPage
  const paginatedStudies = studies.slice(startIndex, startIndex + itemsPerPage)
  const totalPages = Math.ceil(studies.length / itemsPerPage)

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
          paginatedStudies.map((study) => (
            <StudyCard key={study.id} study={study} />
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      {!hasNoStudies && totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <CustomPagination
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </section>
  )
}
