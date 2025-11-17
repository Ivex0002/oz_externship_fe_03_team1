import React from 'react'
import { Users } from 'lucide-react'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import medal from '../../../public/icons/medal.svg'
import { useNavigate } from 'react-router'

// StudyType타입에 active와 completed라는 상태를 정의
type StudyType = 'active' | 'completed'

// 컴포넌트가(NoStudyFound) 받을 props의 형태를 정의
interface NoStudiesResultProps {
  type: StudyType
  // 검색 결과가 없을 때만 표시해야하기 때문에 추가한 불린 타입.
  isSearchResult?: boolean
}

// 각 상태별 설정( active, completed의 내부 상태 )을 묶어서 관리하기 위한 객체형태로 타입 정의.
interface StatusConfig {
  icon: React.ReactNode
  defaultTitle: string
  searchTitle: string
  description: string
  showButton: boolean
}

// 현재 파일의 메인 컴포넌트. 위 type: StudyType이고, type을 프롭스로
// 받으며 컨텐츠가 없을 때 화면을 출력하기에 isSearchResult는 false이다.
export const NoStudiesResult = ({
  type,
  isSearchResult = false,
}: NoStudiesResultProps) => {
  const navigate = useNavigate()

  const handleClickCreateStudy = () => {
    navigate('/create_study_group')
  }
  // 타입 매핑 (키에 따라 서로 다른 상태 설정을 매핑하는 객체)
  // Record< K:키(StudyType), T:타입(StatusConfig) > 유틸리티 타입.
  // K:진행중인 스터디가 없을 때 or  완료된 스터디가 없을 때
  const status: Record<StudyType, StatusConfig> = {
    // 진행중인 스터디가 없을 때
    active: {
      icon: <Users className="h-12 w-12 text-gray-400" />,
      defaultTitle: '진행중인 스터디가 없습니다',
      searchTitle: '검색된 진행중인 스터디가 없습니다',
      description: '새로운 스터디 그룹을 만들어보세요',
      showButton: true,
    },
    // 완료된 스터디가 없을 때
    completed: {
      icon: <img src={medal} alt="메달 아이콘" className="h-12 w-12" />,
      defaultTitle: '완료된 스터디가 없습니다',
      searchTitle: '검색된 완료된 스터디가 없습니다',
      description: '아직 완료된 스터디 그룹이 없습니다',
      showButton: false,
    },
  }

  // currentStatus이름으로 status의 객체에 타입을 담아둠
  const currentStatus = status[type]
  // 위 status의 타입이 active면 진행중인 스터디가 없을 때를 갖고 온다
  // 위 status의 타입이 completed면 완료된 스터디가 없을 때를 갖고 온다.
  const displayTitle = isSearchResult
    ? currentStatus.searchTitle
    : currentStatus.defaultTitle

  // 출력 UI 내부에 컨텐츠( 이미지, 텍스트 등 )은 프롭스로 내려받아서 사용
  return (
    <section className="mx-auto flex w-full flex-col items-center justify-center rounded-xl bg-gray-50 p-16">
      <div className="mb-6 rounded-full bg-gray-100 p-6">
        {currentStatus.icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900">{displayTitle}</h3>
      <p className="mb-6 text-gray-600">{currentStatus.description}</p>
      {currentStatus.showButton && (
        <BasicButton
          variant="primary"
          size="large"
          onClick={handleClickCreateStudy}
        >
          <span className="mr-2 text-xl">+</span>
          <span>스터디 그룹 만들기</span>
        </BasicButton>
        //           <BasicButton
        //   variant="primary"
        //   onClick={handleClickCreateStudy}
        //   size="medium"
        // >
        //   <Plus size={16} /> 새 스터디 만들기
        // </BasicButton>
      )}
    </section>
  )
}
