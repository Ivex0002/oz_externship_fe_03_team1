import { useRef, useReducer, useMemo } from 'react';
import { TooltipPortal } from '../../utils/TooltipPortal';
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton';
import type { Member } from '@/types/Schedule';

interface StudyMemberListProps {
  members: Member[];
  currentHeadcount: number;
}

interface TooltipPosition {
  top: number;
  left: number;
}

type TooltipState = {
  action: 'expel' | 'delegate' | null;
  targetMember: string | null;
  position: TooltipPosition | null;
};

type TooltipAction =
  | { type: 'SHOW'; action: 'expel' | 'delegate'; member: string; position: TooltipPosition }
  | { type: 'HIDE' };

const tooltipReducer = (state: TooltipState, action: TooltipAction): TooltipState => {
  switch (action.type) {
    case 'SHOW':
      return {
        action: action.action,
        targetMember: action.member,
        position: action.position
      };
    case 'HIDE':
      return {
        action: null,
        targetMember: null,
        position: null
      };
    default:
      return state;
  }
};

export const StudyMemberList = ({ 
  members,
  currentHeadcount
}: StudyMemberListProps) => {
  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [tooltipState, dispatchTooltip] = useReducer(tooltipReducer, {
    action: null,
    targetMember: null,
    position: null
  });

  // 현재 사용자가 리더인지 확인
  const currentUserIsLeader = useMemo(() => 
    members.some(member => member.is_leader), 
    [members]
  );

  // 리더를 최상단으로 정렬
  const sortedMembers = useMemo(() => {
    return [...members].sort((a, b) => {
      if (a.is_leader && !b.is_leader) return -1;
      if (!a.is_leader && b.is_leader) return 1;
      return 0;
    });
  }, [members]);

  const handleExpelClick = (nickname: string) => {
    if (window.confirm(`${nickname}님을 추방하시겠습니까?`)) {
      // API 호출
      return;
    }
  };

  const handleDelegateClick = (nickname: string) => {
    if (window.confirm(`${nickname}님에게 리더를 위임하시겠습니까?`)) {
      // API 호출
      return;
    }
  };

  const updateTooltipPosition = (
    targetIndex: number, 
    nickname: string, 
    action: 'expel' | 'delegate'
  ) => {
    const buttonElement = buttonRefs.current[targetIndex];
    if (buttonElement) {
      const rect = buttonElement.getBoundingClientRect();
      
      dispatchTooltip({
        type: 'SHOW',
        action,
        member: nickname,
        position: {
          top: rect.bottom + window.scrollY + 8,
          left: rect.left + rect.width / 2,
        }
      });
    }
  };

  const handleMouseEnter = (
    index: number, 
    nickname: string, 
    action: 'expel' | 'delegate'
  ) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    hoverTimeoutRef.current = setTimeout(() => {
      updateTooltipPosition(index, nickname, action);
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    dispatchTooltip({ type: 'HIDE' });
  };

  const getTooltipText = () => {
    if (!tooltipState.action || !tooltipState.targetMember) return '';
    
    if (tooltipState.action === 'expel') {
      return `${tooltipState.targetMember}님을 추방`;
    }
    return `${tooltipState.targetMember}님에게 리더 위임`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 relative">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900">멤버 목록</h2>
        <span className="text-sm text-gray-500 font-medium">{currentHeadcount}명</span>
      </div>
      
      {/* 고정 높이: 485px (7.5명 분량) */}
      <div className="h-[485px] overflow-y-auto scrollbar-hide">
        <div className="space-y-3">
          {sortedMembers.map((member, index) => (
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

              {currentUserIsLeader && !member.is_leader && (
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* 리더 위임 버튼 */}
                  <div
                    ref={(el: HTMLDivElement | null) => {
                      buttonRefs.current[index * 2] = el;
                    }}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(index * 2, member.nickname, 'delegate')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <BasicButton
                      variant="secondary"
                      size="small"
                      className="!w-6 !h-6 !rounded-full !bg-blue-50 !text-blue-600 !text-xs"
                      onClick={() => handleDelegateClick(member.nickname)}
                    >
                      ↑
                    </BasicButton>
                  </div>

                  {/* 추방 버튼 */}
                  <div
                    ref={(el: HTMLDivElement | null) => {
                      buttonRefs.current[index * 2 + 1] = el;
                    }}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(index * 2 + 1, member.nickname, 'expel')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <BasicButton
                      variant="danger"
                      size="small"
                      className="!w-6 !h-6 !rounded-full !bg-red-50 !text-danger-500"
                      onClick={() => handleExpelClick(member.nickname)}
                    >
                      X
                    </BasicButton>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {tooltipState.targetMember && tooltipState.position && (
        <TooltipPortal>
          <div 
            className="absolute px-3 py-1.5 bg-gray-200 text-gray-600 text-xs rounded-lg whitespace-nowrap z-[9999] shadow-lg pointer-events-none animate-fade-in"
            style={{
              top: `${tooltipState.position.top}px`,
              left: `${tooltipState.position.left}px`,
            }}
          >
            {getTooltipText()}
          </div>
        </TooltipPortal>
      )}
    </div>
  );
};