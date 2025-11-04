import React from 'react'
import { Users } from 'lucide-react'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import test1 from '../../../public/icons/medal.svg'

type StudyType = 'active' | 'completed'

interface NoStudiesResultProps {
  type: StudyType
  isSearchResult?: boolean
}

interface StatusConfig {
  icon: React.ReactNode
  defaultTitle: string
  searchTitle: string
  description: string
  showButton: boolean
}

export const NoStudiesResult = ({
  type,
  isSearchResult = false,
}: NoStudiesResultProps) => {
  const status: Record<StudyType, StatusConfig> = {
    active: {
      icon: <Users className="h-12 w-12 text-gray-400" />,
      defaultTitle: '진행중인 스터디가 없습니다',
      searchTitle: '검색된 진행중인 스터디가 없습니다',
      description: '새로운 스터디 그룹을 만들어보세요',
      showButton: true,
    },
    completed: {
      icon: <img src={test1} alt="메달 아이콘" className="h-12 w-12" />,
      defaultTitle: '완료된 스터디가 없습니다',
      searchTitle: '검색된 완료된 스터디가 없습니다',
      description: '아직 완료된 스터디 그룹이 없습니다',
      showButton: false,
    },
  }

  const currentStatus = status[type]
  const displayTitle = isSearchResult
    ? currentStatus.searchTitle
    : currentStatus.defaultTitle

  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-10">
      <div className="mb-6 rounded-full bg-gray-100 p-6">
        {currentStatus.icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900">{displayTitle}</h3>
      <p className="mb-6 text-gray-600">{currentStatus.description}</p>
      {currentStatus.showButton && (
        <BasicButton variant="primary" size="large">
          <span className="mr-2 text-xl">+</span>
          <span>스터디 그룹 만들기</span>
        </BasicButton>
      )}
    </div>
  )
}
