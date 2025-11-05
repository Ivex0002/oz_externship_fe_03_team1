import { StudyCard } from '@/components/studyGroup/StudyCard'
import { NoStudiesResult } from '@/components/searchStudy/NoStudiesResult'
import type { StudyGroup as StudyGroupType } from '@/types/StudyGroupTypes'

interface StudySectionProps {
  title: string
  studies: StudyGroupType[]
  type: 'active' | 'completed'
  isSearchResult: boolean
}

export const StudySection = ({
  title,
  studies,
  type,
  isSearchResult,
}: StudySectionProps) => {
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
