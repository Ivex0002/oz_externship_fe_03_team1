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
  const subTitle = type === "active" ? "현재 활발히 진행되고 있는 스터디 그룹들" : "성공적으로 마무리된 스터디 그룹들"

  // 페이지네이션 계산
  const startIndex = currentPage * itemsPerPage
  const paginatedStudies = studies.slice(startIndex, startIndex + itemsPerPage)
  const totalPages = Math.ceil(studies.length / itemsPerPage)

  return (
    <section className="mb-20 flex w-full flex-col">
      <h2 className="pb-1 text-2xl font-semibold text-gray-800">{title}</h2>
      <p className='text-gray-600'>{subTitle}</p>

      <div
        className={`grid pt-8 w-full grid-cols-3 gap-6 ${
          hasNoStudies ? 'place-items-center' : ''
        }`}
      >
        {hasNoStudies ? (
          <div className="col-span-full flex w-full justify-center">
              <NoStudiesResult type={type} isSearchResult={isSearchResult} />
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