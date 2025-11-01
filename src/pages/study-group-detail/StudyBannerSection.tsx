// StudyBannerSection.tsx
import { Calendar } from 'lucide-react';
import type { StudyGroupDetail } from '@/types/StudyGroupDetailTypes';
import { formatDate } from '@/utils/dateFormatter';
import { getStatusText } from '@/utils/statusFormatter';
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton';

interface StudyBannerSectionProps {
  isLeader: boolean;
  setIsLeader: (value: boolean) => void;
  studyGroup: StudyGroupDetail;
}

export const StudyBannerSection = ({ 
  isLeader, 
  setIsLeader, 
  studyGroup 
}: StudyBannerSectionProps) => {
  // 날짜 변수 상단 선언
  const startDate = formatDate(studyGroup.start_at);
  const endDate = formatDate(studyGroup.end_at);
  const statusText = getStatusText(studyGroup.status);

  // 핸들러 함수 분리
  const handleEditClick = () => {return};

  const handleLeaveClick = () => {
    if (window.confirm('정말로 스터디를 나가시겠습니까?')) {return};
  };

  const handleToggleLeader = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLeader(e.target.checked);
  };

  return (
    <>
      {/* 스터디 배너 섹션 */}
      <div className="relative mb-6 rounded-lg overflow-hidden mt-[36.5px]">
        <img
          src={studyGroup.profile_img_url || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=300&fit=crop"}
          alt="Study Banner"
          className="w-full h-[598px] object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-lg"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{studyGroup.name}</h1>
          <div className="flex items-center gap-3 text-sm text-gray-100 mb-2">
            <img 
              src="/icons/group-members-icon.svg" 
              alt="members" 
              className="w-4 h-4" 
            />
            <span>{studyGroup.current_headcount} / {studyGroup.max_headcount}명</span>
            <Calendar className="w-4 h-4" />
            <span>{startDate} ~ {endDate}</span>
            <span className="px-3 py-1 bg-success-500 text-white rounded-full text-xs">
              {statusText}
            </span>
          </div>
        </div>

        {/* 리더 / 일반 버튼 */}
        <div className="absolute top-[25px] right-[24px] flex gap-2">
          {isLeader && (
            <BasicButton
              type="secondary"
              size="small"
              className="flex items-center gap-2 !px-4 !py-2 !text-sm"
              onClick={handleEditClick}
            >
              <img src="/pen.svg" alt="edit" className="w-4 h-4" />
              수정하기
            </BasicButton>
          )}
          <BasicButton
            type="danger"
            size="small"
            className="flex items-center gap-2 !px-4 !py-2 !text-sm text-white"
            onClick={handleLeaveClick}
          >
            <img src="/out.svg" alt="leave" className="w-4 h-4 filter invert brightness-0" />
            나가기
          </BasicButton>
        </div>
      </div>

      {/* 역할 토글 (테스트용) */}
      <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isLeader}
            onChange={handleToggleLeader}
            className="w-4 h-4 accent-blue-600"
          />
          <span className="text-sm text-blue-900 font-medium">리더 권한 보기 (테스트용)</span>
        </label>
      </div>
    </>
  );
};