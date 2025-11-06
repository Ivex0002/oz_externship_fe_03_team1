import { useRef, useReducer, useMemo, useState } from 'react';
import { TooltipPortal } from '../../utils/TooltipPortal';
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton';
import type { Member } from '@/types/Schedule';
import { Crown, X } from 'lucide-react';

interface StudyMemberListProps {
  members: Member[];
  currentHeadcount: number;
  isLeader: boolean;
  studyGroupId: number;
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
  currentHeadcount,
  isLeader
}: StudyMemberListProps) => {
  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [tooltipState, dispatchTooltip] = useReducer(tooltipReducer, {
    action: null,
    targetMember: null,
    position: null
  });

  // 로컬 모달 상태 관리
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'expel' | 'delegate' | null>(null);
  const [targetMember, setTargetMember] = useState<string | null>(null);

  // 리더를 최상단으로 정렬
  const sortedMembers = useMemo(() => {
    return [...members].sort((a, b) => {
      if (a.is_leader && !b.is_leader) return -1;
      if (!a.is_leader && b.is_leader) return 1;
      return 0;
    });
  }, [members]);

  // 버튼 클릭 시 모달 오픈
  const handleExpelClick = (nickname: string) => {
    setModalType('expel');
    setTargetMember(nickname);
    setShowModal(true);
  };

  const handleDelegateClick = (nickname: string) => {
    setModalType('delegate');
    setTargetMember(nickname);
    setShowModal(true);
  };

  // 모달 확인 버튼 클릭 시 처리
  const handleModalConfirm = () => {
    if (modalType === 'expel') {return;} else if (modalType === 'delegate') {return;}
    setShowModal(false);
  };

  // Tooltip 관련
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
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      updateTooltipPosition(index, nickname, action);
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    dispatchTooltip({ type: 'HIDE' });
  };

  const getTooltipText = () => {
    if (!tooltipState.action || !tooltipState.targetMember) return '';
    if (tooltipState.action === 'expel') return `${tooltipState.targetMember}님을 추방`;
    return `${tooltipState.targetMember}님에게 리더 위임`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 relative">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900">멤버 목록</h2>
        <span className="text-sm text-gray-500 font-medium">{currentHeadcount}명</span>
      </div>

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

              {/* 리더일 경우만 표시 */}
              {isLeader && !member.is_leader && (
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
                      className="!rounded-full !bg-blue-50 !text-blue-400 !text-xs cursor-pointer"
                      onClick={() => handleDelegateClick(member.nickname)}
                    >
                      <Crown className='hover:text-blue-600' size={20} />
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
                      className="!w-6 !h-6 !rounded-full !bg-red-50 !text-danger-500 cursor-pointer"
                      onClick={() => handleExpelClick(member.nickname)}
                    >
                      <X size={20} className='hover:text-danger-800' />
                    </BasicButton>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
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

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[380px] text-center animate-fade-in">
            <h2 className="text-lg font-bold mb-2">
              {modalType === 'expel' ? '멤버 추방' : '리더 위임'}
            </h2>
            <p className="text-gray-600 mb-6">
              {modalType === 'expel'
                ? `${targetMember}님을 추방하시겠습니까?`
                : `${targetMember}님에게 리더를 위임하시겠습니까?`}
            </p>

            <div className="flex justify-center gap-3">
              <BasicButton
                variant={modalType === 'expel' ? 'danger' : 'primary'}
                onClick={handleModalConfirm}
              >
                확인
              </BasicButton>

              <BasicButton
                variant="secondary"
                onClick={() => setShowModal(false)}
                className="!bg-gray-200 !text-gray-600"
              >
                취소
              </BasicButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
