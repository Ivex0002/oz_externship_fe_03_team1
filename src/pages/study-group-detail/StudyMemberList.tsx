// StudyMemberList.tsx
import { useRef, useReducer } from 'react';
import { TooltipPortal } from '../../utils/TooltipPortal';
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton';
import type { Member } from '@/types/StudyGroupDetailTypes';

interface StudyMemberListProps {
  members: Member[];
  isLeader: boolean;
}

interface TooltipPosition {
  top: number;
  left: number;
}

// 툴팁 상태 관리를 위한 reducer
type TooltipState = {
  expelMember: string | null;
  hoveredMember: string | null;
  position: TooltipPosition | null;
};

type TooltipAction =
  | { type: 'SHOW'; member: string; position: TooltipPosition }
  | { type: 'HIDE' };

const tooltipReducer = (state: TooltipState, action: TooltipAction): TooltipState => {
  switch (action.type) {
    case 'SHOW':
      return {
        expelMember: action.member,
        hoveredMember: action.member,
        position: action.position
      };
    case 'HIDE':
      return {
        expelMember: null,
        hoveredMember: null,
        position: null
      };
    default:
      return state;
  }
};

export const StudyMemberList = ({ 
  members, 
  isLeader 
}: StudyMemberListProps) => {
  const memberCount = members.length;
  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [tooltipState, dispatchTooltip] = useReducer(tooltipReducer, {
    expelMember: null,
    hoveredMember: null,
    position: null
  });

  // 핸들러 함수 분리
  const handleExpelClick = (nickname: string) => {
    if (window.confirm(`${nickname}님을 추방하시겠습니까?`)) {return};
  };

  const updateTooltipPosition = (targetIndex: number, nickname: string) => {
    const buttonElement = buttonRefs.current[targetIndex];
    if (buttonElement) {
      const rect = buttonElement.getBoundingClientRect();
      
      dispatchTooltip({
        type: 'SHOW',
        member: nickname,
        position: {
          top: rect.bottom + window.scrollY + 8,
          left: rect.left + rect.width / 2,
        }
      });
    }
  };

  const handleMouseEnter = (index: number, nickname: string) => {
    // 기존 타이머가 있다면 제거
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // 새로운 타이머 설정
    hoverTimeoutRef.current = setTimeout(() => {
      updateTooltipPosition(index, nickname);
    }, 1000);
  };

  const handleMouseLeave = () => {
    // 타이머 제거
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    dispatchTooltip({ type: 'HIDE' });
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 relative">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900">멤버 목록</h2>
        <span className="text-sm text-gray-500 font-medium">{memberCount}명</span>
      </div>
      
      {/* 고정 높이 적용: 1명이어도 영역 유지 */}
      <div className="overflow-y-auto hide-scrollbar max-h-[480px] min-h-[80px]">
        <div className="space-y-3">
          {members.map((member, index) => (
            <div
              key={member.id}
              className="group relative flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src="/member.svg"
                  alt={member.nickname}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-sm">
                      {member.nickname}
                    </span>
                    {member.is_leader && (
                      <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded-[4px] text-xs">
                        리더
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {isLeader && !member.is_leader && (
                <div
                  ref={(el: HTMLDivElement | null) => {
                    buttonRefs.current[index] = el;
                  }}
                  className="relative opacity-0 group-hover:opacity-100 transition-opacity"
                  onMouseEnter={() => handleMouseEnter(index, member.nickname)}
                  onMouseLeave={handleMouseLeave}
                >
                  <BasicButton
                    type="danger"
                    size="small"
                    className="!w-6 !h-6 !rounded-full !bg-red-50 !text-danger-500"
                    onClick={() => handleExpelClick(member.nickname)}
                  >
                    X
                  </BasicButton>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {tooltipState.expelMember && tooltipState.position && (
        <TooltipPortal>
          <div 
            className="absolute px-3 py-1.5 bg-gray-200 text-gray-600 text-xs rounded-lg whitespace-nowrap z-[9999] shadow-lg pointer-events-none animate-fade-in"
            style={{
              top: `${tooltipState.position.top}px`,
              left: `${tooltipState.position.left}px`,
            }}
          >
            {tooltipState.expelMember}님을 추방
          </div>
        </TooltipPortal>
      )}

      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};