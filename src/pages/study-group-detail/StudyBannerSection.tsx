import { Calendar } from 'lucide-react';
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton';
import type { FormattedInfo } from './StudyInfoAndCourses';
import { useNavigate } from 'react-router';
import { useModal } from '@/hooks/useModal';
import { useStudyGroupMutation } from '@/hooks/useStudyGroupMutation';

interface StudyBannerSectionProps {
  isLeader: boolean;
  title: string;
  imgUrl: string;
  formattedInfo: FormattedInfo;
  studyGroupId: string;
}

export const StudyBannerSection = ({ 
  isLeader, 
  formattedInfo,
  title,
  imgUrl,
  studyGroupId
}: StudyBannerSectionProps) => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const { leaveStudyGroup } = useStudyGroupMutation(studyGroupId);
  
  const onCancelLeave = () => {
    closeModal();
  };
  
  const onConfirmLeave = () => {
    leaveStudyGroup.mutate(undefined, {
      onSuccess: () => {
        closeModal();
        // 성공 시 스터디 그룹 목록 페이지로 이동
        navigate('/study-groups');
      },
      onError: () => {
        closeModal();
        // 에러 알림을 띄우고 싶다면 여기에 추가
      }
    });
  };

  // 핸들러 함수 분리
  const handleEditClick = () => {
    navigate(`/edit_study_group/${studyGroupId}`);
  };

  const handleLeaveClick = () => {
    openModal("CONFIRM", {
      title: "스터디 그룹을 나가시겠습니까?",
      modalProps: {
        message: "확인을 누르면 스터디그룹을 나갑니다",
        onConfirm: onConfirmLeave,
        onCancel: onCancelLeave
      }
    });
  };

  const handleToggleLeader = (e: React.ChangeEvent<HTMLInputElement>) => {
  };

  return (
    <>
      {/* 스터디 배너 섹션 */}
      <div className="relative mb-6 rounded-lg overflow-hidden mt-[36.5px]">
        <img
          src={imgUrl || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=300&fit=crop"}
          alt="Study Banner"
          className="w-full h-[598px] object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-lg"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <div className="flex items-center gap-3 text-sm text-gray-100 mb-2">
            <img 
              src="/icons/group-members-icon.svg" 
              alt="members" 
              className="w-4 h-4" 
            />
            <span>{formattedInfo.memberCount}명</span>
            <Calendar className="w-4 h-4" />
            <span>{formattedInfo.startDate} ~ {formattedInfo.endDate}</span>
            <span className="px-3 py-1 bg-success-500 text-white rounded-full text-xs">
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
              className="flex items-center gap-2 !px-4 !py-2 !text-sm cursor-pointer"
              onClick={handleEditClick}
            >
              <img src="/icons/pen.svg" alt="edit" className="w-4 h-4" />
              수정하기
            </BasicButton>
          )}
          <BasicButton
            variant="danger"
            size="small"
            className="flex items-center gap-2 !px-4 !py-2 !text-sm text-white cursor-pointer"
            onClick={handleLeaveClick}
            disabled={leaveStudyGroup.isPending}
          >
            <img src="/icons/out.svg" alt="leave" className="w-4 h-4 filter invert brightness-0" />
            {leaveStudyGroup.isPending ? '처리중...' : '나가기'}
          </BasicButton>
        </div>
      </div>
    </>
  );
};