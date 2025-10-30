import React, { useRef, useState } from 'react';
import { TooltipPortal } from './utill/TooltipPortal';

interface Participant {
  id: number;
  nickname: string;
  is_leader: boolean;
}

interface StudyMemberListProps {
  participants: Participant[];
  isLeader: boolean;
  showTooltip: string | null;
  setHoveredMember: (name: string | null) => void;
  setShowTooltip: (name: string | null) => void;
  BasicButton: React.ComponentType<any>;
}

interface TooltipPosition {
  top: number;
  left: number;
}

export const StudyMemberList: React.FC<StudyMemberListProps> = ({ 
  participants, 
  isLeader, 
  showTooltip, 
  setHoveredMember, 
  setShowTooltip,
  BasicButton 
}) => {
  const memberCount = participants.length;
  const shouldScroll = memberCount > 7;

  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [tooltipPos, setTooltipPos] = useState<TooltipPosition | null>(null);

  const updateTooltipPosition = (targetIndex: number) => {
    const buttonElement = buttonRefs.current[targetIndex];
    if (buttonElement) {
      const rect = buttonElement.getBoundingClientRect();
      
      setTooltipPos({
        top: rect.bottom + window.scrollY + 8, 
        left: rect.left + rect.width / 2, 
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 relative">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900">멤버 목록</h2>
        <span className="text-sm text-gray-500 font-medium">{memberCount}명</span>
      </div>
      <div 
        className={`space-y-3 ${shouldScroll ? 'overflow-y-auto hide-scrollbar max-h-[480px]' : ''}`}
      >
        {participants.map((participant, index) => (
          <div
            key={participant.id}
            className="group relative flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <img
                src="/member.svg"
                alt={participant.nickname}
                className="w-11 h-11 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900 text-sm">{participant.nickname}</span>
                  {participant.is_leader && (
                    <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded-[4px] text-xs">
                      리더
                    </span>
                  )}
                </div>
              </div>
            </div>

            {isLeader && !participant.is_leader && (
              <div
                ref={(el: HTMLDivElement | null) => {
                  buttonRefs.current[index] = el;
                }}
                className="relative opacity-0 group-hover:opacity-100 transition-opacity"
                onMouseEnter={() => {
                  setHoveredMember(participant.nickname);
                  updateTooltipPosition(index);
                  
                  const timer = setTimeout(() => {
                    setShowTooltip(participant.nickname);
                  }, 1000);
                  return () => clearTimeout(timer);
                }}
                onMouseLeave={() => {
                  setHoveredMember(null);
                  setShowTooltip(null);
                  setTooltipPos(null);
                }}
              >
                <BasicButton
                  type="danger"
                  size="small"
                  className="!w-6 !h-6 !rounded-full !bg-red-50 !text-danger-500"
                  onClick={() => {
                    if (window.confirm(`${participant.nickname}님을 추방하시겠습니까?`)) {
                      return;
                    }
                  }}
                >
                  X
                </BasicButton>
              </div>
            )}
          </div>
        ))}
      </div>

      {showTooltip && tooltipPos && (
        <TooltipPortal>
          <div 
            className="absolute px-3 py-1.5 bg-gray-200 text-gray-600 text-xs rounded-lg whitespace-nowrap z-[9999] shadow-lg pointer-events-none animate-fade-in"
            style={{
              top: `${tooltipPos.top}px`,
              left: `${tooltipPos.left}px`,
            }}
          >
            {showTooltip}님을 추방
          </div>
        </TooltipPortal>
      )}
    </div>
  );
};