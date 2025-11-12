import { Calendar } from 'lucide-react'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import type { FormattedInfo } from './StudyInfoAndCourses'
import { useNavigate } from 'react-router'
import { useModal } from '@/hooks/useModal'
import { useStudyGroupMutation } from '@/hooks/api/mutations/useStudyGroupMutation'

interface StudyBannerSectionProps {
  isLeader: boolean
  title: string
  imgUrl: string
  formattedInfo: FormattedInfo
  studyGroupId: string
}

export const StudyBannerSection = ({
  isLeader,
  formattedInfo,
  title,
  imgUrl,
  studyGroupId,
}: StudyBannerSectionProps) => {
  const navigate = useNavigate()
  const { openModal, closeModal } = useModal()
  const { leaveStudyGroup } = useStudyGroupMutation(studyGroupId)

  const onCancelLeave = () => {
    closeModal()
  }

  const onConfirmLeave = () => {
    leaveStudyGroup.mutate(undefined, {
      onSuccess: () => {
        closeModal()
        // 성공 시 스터디 그룹 목록 페이지로 이동
        navigate('/study-groups')
      },
      onError: () => {
        closeModal()
        // 에러 알림을 띄우고 싶다면 여기에 추가
      },
    })
  }

  // 핸들러 함수 분리
  const handleEditClick = () => {
    navigate(`/edit_study_group/${studyGroupId}`)
  }

  const handleLeaveClick = () => {
    openModal('CONFIRM', {
      title: '스터디 그룹을 나가시겠습니까?',
      modalProps: {
        message: '확인을 누르면 스터디그룹을 나갑니다',
        onConfirm: onConfirmLeave,
        onCancel: onCancelLeave,
      },
    })
  }

  return (
    <>
      {/* 스터디 배너 섹션 */}
      <div className="relative mt-[36.5px] mb-6 overflow-hidden rounded-lg">
        <img
          src={
            imgUrl ||
            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=300&fit=crop'
          }
          alt="Study Banner"
          className="h-[598px] w-full object-cover"
        />

        <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
          <h1 className="mb-2 text-3xl font-bold">{title}</h1>
          <div className="mb-2 flex items-center gap-3 text-sm text-gray-100">
            <img
              src="/icons/group-members-icon.svg"
              alt="members"
              className="h-4 w-4"
            />
            <span>{formattedInfo.memberCount}명</span>
            <Calendar className="h-4 w-4" />
            <span>
              {formattedInfo.startDate} ~ {formattedInfo.endDate}
            </span>
            <span className="bg-success-500 rounded-full px-3 py-1 text-xs text-white">
              {formattedInfo.statusText}
            </span>
          </div>
        </div>

        {/* 리더 / 일반 버튼 */}
        <div className="absolute top-[25px] right-[24px] flex gap-2">
          {isLeader && (
            <BasicButton
              variant="secondary"
              size="small"
              className="flex cursor-pointer items-center gap-2 !px-4 !py-2 !text-sm"
              onClick={handleEditClick}
            >
              <img src="/icons/pen.svg" alt="edit" className="h-4 w-4" />
              수정하기
            </BasicButton>
          )}
          <BasicButton
            variant="danger"
            size="small"
            className="flex cursor-pointer items-center gap-2 !px-4 !py-2 !text-sm text-white"
            onClick={handleLeaveClick}
            disabled={leaveStudyGroup.isPending}
          >
            <img
              src="/icons/out.svg"
              alt="leave"
              className="h-4 w-4 brightness-0 invert filter"
            />
            {leaveStudyGroup.isPending ? '처리중...' : '나가기'}
          </BasicButton>
        </div>
      </div>
    </>
  )
}
