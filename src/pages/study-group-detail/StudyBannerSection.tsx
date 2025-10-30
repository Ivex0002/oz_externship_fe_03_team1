import { Users } from 'lucide-react';
import React from 'react';
import type { StudyGroup } from '@/types/StudyGroupTypes';

interface BasicButtonProps {
  type?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
}

interface StudyBannerSectionProps {
  isLeader: boolean;
  setIsLeader: (value: boolean) => void;
  studyGroup: StudyGroup;
  BasicButton: React.ComponentType<BasicButtonProps>; // 수정
}

export const StudyBannerSection: React.FC<StudyBannerSectionProps> = ({ 
  isLeader, 
  setIsLeader, 
  studyGroup, 
  BasicButton 
}) => {

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    }).replace(/\. /g, '.').replace(/\.$/, '');
  };

  // 상태 한글 변환
  const getStatusText = (status: string) => {
    switch(status) {
      case 'ONGOING': return '진행중';
      case 'PENDING': return '모집중';
      case 'ENDED': return '종료';
      default: return status;
    }
  };

  return (
    <>
      {/* 스터디 배너 섹션 */}
      <div className="relative mb-6 rounded-lg overflow-hidden mt-[36.5px]">
        <img
          src={ studyGroup.profile_img_url || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=300&fit=crop"}
          
          alt="Study Banner"
          className="w-full h-[598px] object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-lg"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{studyGroup.name}</h1>
          <div className="flex items-center gap-3 text-sm text-gray-100 mb-2">
            <Users className="w-4 h-4" />
            <span>{studyGroup.current_headcount} / {studyGroup.max_headcount}명</span>
            <img src="/calendar.svg" alt="calendar" className="w-4 h-4 filter invert brightness-0" />
            <span>{formatDate(studyGroup.start_at)} ~ {formatDate(studyGroup.end_at)}</span>
            <span className="px-3 py-1 bg-success-500 text-white rounded-full text-xs">
              {getStatusText(studyGroup.status)}
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
            >
              <img src="/pen.svg" alt="edit" className="w-4 h-4" />
              수정하기
            </BasicButton>
          )}
          <BasicButton
            type="danger"
            size="small"
            className="flex items-center gap-2 !px-4 !py-2 !text-sm text-white"
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
            onChange={(e) => setIsLeader(e.target.checked)}
            className="w-4 h-4 accent-blue-600"
          />
          <span className="text-sm text-blue-900 font-medium">리더 권한 보기 (테스트용)</span>
        </label>
      </div>
    </>
  );
};