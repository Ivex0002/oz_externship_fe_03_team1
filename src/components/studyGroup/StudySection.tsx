import { useState, useEffect } from 'react'
import { StudyCard } from '@/components/studyGroup/StudyCard'
import { NoStudiesResult } from '@/components/searchStudy/NoStudiesResult'
import { CustomPagination } from '@/components/basicComponents/pagination/CustomPagination'
import { useQueryStudyGroup } from '@/hooks/api/queries/useQueryStudyGroup'
import { toast } from 'react-toastify'

interface StudySectionProps {
  title: string
  type: 'active' | 'completed'
  debouncedSearchTerm: string
  isSearchResult: boolean
  itemsPerPage?: number // 페이지당 표시할 개수 (기본값 9)
}

export const StudySection = ({
  title,
  debouncedSearchTerm,
  type,
  isSearchResult,
  itemsPerPage = 9,
}: StudySectionProps) => {
  const [currentPage, setCurrentPage] = useState(0)
  const status = type === 'active' ? 'ONGOING' : 'ENDED'
  const subTitle =
    type === 'active'
      ? '현재 활발히 진행되고 있는 스터디 그룹들'
      : '성공적으로 마무리된 스터디 그룹들'

  const { data, isPending, isError, error } = useQueryStudyGroup({
    page: 1,
    status: status,
    page_size: 100,
    search: debouncedSearchTerm || null,
  })

  // 에러 발생 시 토스트 메시지 처리
  useEffect(() => {
    if (isError) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '스터디 목록을 불러오는 중 오류가 발생했습니다.'
      toast.error(errorMessage)
    }
  }, [isError, error])

  const studies = isPending ? [] : data?.data.results || []
  const hasNoStudies = studies.length === 0 && !isPending

  const startIndex = currentPage * itemsPerPage
  const paginatedStudies = studies.slice(startIndex, startIndex + itemsPerPage)
  const totalPages = Math.ceil(studies.length / itemsPerPage)

  useEffect(() => {
    setCurrentPage(0)
  }, [debouncedSearchTerm, data])

  return (
    <section className="mb-20 flex w-full flex-col">
      {/* 제목 및 부제목: 로딩 상태와 관계없이 항상 한 번만 렌더링 */}
      <h2 className="pb-1 text-2xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600">{subTitle}</p>

      <div
        className={`grid w-full grid-cols-3 gap-6 pt-8 ${
          hasNoStudies || isPending ? 'place-items-center' : ''
        }`}
      >
        {isPending ? (
          // 로딩 중일 때 표시할 UI
          <div className="col-span-full flex w-full justify-center p-10">
            <p className="text-lg font-medium text-gray-500">
              스터디 목록을 불러오는 중입니다...
            </p>
          </div>
        ) : hasNoStudies ? (
          // 데이터가 없고 로딩이 끝났을 때 (검색 결과 없음)
          <div className="col-span-full flex w-full justify-center">
            <NoStudiesResult type={type} isSearchResult={isSearchResult} />
          </div>
        ) : (
          // 스터디 목록 표시
          paginatedStudies.map((study) => (
            <StudyCard key={study.uuid} study={study} />
          ))
        )}
      </div>

      {/* 페이지네이션 (로딩 중이 아니고, 스터디가 있고, 페이지가 1개 초과일 때만 표시) */}
      {!isPending && !hasNoStudies && totalPages > 1 && (
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
