import { useRef, useReducer, useMemo } from 'react'
import { TooltipPortal } from '../../utils/TooltipPortal'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { Crown, X } from 'lucide-react'
import { useModal } from '@/hooks/useModal'
import { useStudyGroupMutation } from '@/hooks/api/mutations/useStudyGroupMutation'
import type { Member } from '@/types/StudyGroupDetailTypes'

interface StudyMemberListProps {
  members: Member[]
  currentHeadcount: number
  isLeader: boolean
  studyGroupId: string
}

interface TooltipPosition {
  top: number
  left: number
}

type TooltipState = {
  action: 'expel' | 'delegate' | null
  targetMember: string | null
  position: TooltipPosition | null
}

type TooltipAction =
  | {
      type: 'SHOW'
      action: 'expel' | 'delegate'
      member: string
      position: TooltipPosition
    }
  | { type: 'HIDE' }

const tooltipReducer = (
  state: TooltipState,
  action: TooltipAction
): TooltipState => {
  switch (action.type) {
    case 'SHOW':
      return {
        action: action.action,
        targetMember: action.member,
        position: action.position,
      }
    case 'HIDE':
      return {
        action: null,
        targetMember: null,
        position: null,
      }
    default:
      return state
  }
}

export const StudyMemberList = ({
  members,
  currentHeadcount,
  isLeader,
  studyGroupId,
}: StudyMemberListProps) => {
  const { openModal, closeModal } = useModal()
  const { delegateLeader, expelMember } = useStudyGroupMutation(studyGroupId)

  const buttonRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [tooltipState, dispatchTooltip] = useReducer(tooltipReducer, {
    action: null,
    targetMember: null,
    position: null,
  })

  const selectedMemberIdRef = useRef<string | null>(null)

  const sortedMembers = useMemo(() => {
    return [...members].sort((a, b) => {
      if (a.is_leader && !b.is_leader) return -1
      if (!a.is_leader && b.is_leader) return 1
      return 0
    })
  }, [members])

  const onConfirmExpel = () => {
    if (selectedMemberIdRef.current) {
      expelMember.mutate(selectedMemberIdRef.current, {
        onSuccess: () => {
          closeModal()
          selectedMemberIdRef.current = null
        },
        onError: () => {
          closeModal()
        },
      })
    }
  }

  const onConfirmDelegate = () => {
    if (selectedMemberIdRef.current) {
      delegateLeader.mutate(selectedMemberIdRef.current, {
        onSuccess: () => {
          closeModal()
          selectedMemberIdRef.current = null
        },
        onError: () => {
          closeModal()
        },
      })
    }
  }

  const onCancelConfirmModal = () => {
    closeModal()
    selectedMemberIdRef.current = null
  }

  const handleExpelClick = (nickname: string, memberId: string) => {
    selectedMemberIdRef.current = memberId
    openModal('CONFIRM', {
      title: '그룹원 추방',
      modalProps: {
        message: `${nickname}님을 추방하시겠습니까?`,
        onConfirm: onConfirmExpel,
        onCancel: onCancelConfirmModal,
      },
    })
  }

  const handleDelegateClick = (nickname: string, memberId: string) => {
    selectedMemberIdRef.current = memberId
    openModal('CONFIRM', {
      title: '리더 위임',
      modalProps: {
        message: `${nickname}님에게 리더를 위임하시겠습니까?`,
        onConfirm: onConfirmDelegate,
        onCancel: onCancelConfirmModal,
      },
    })
  }

  const updateTooltipPosition = (
    targetIndex: number,
    nickname: string,
    action: 'expel' | 'delegate'
  ) => {
    const buttonElement = buttonRefs.current[targetIndex]
    if (buttonElement) {
      const rect = buttonElement.getBoundingClientRect()
      dispatchTooltip({
        type: 'SHOW',
        action,
        member: nickname,
        position: {
          top: rect.bottom + window.scrollY + 8,
          left: rect.left + rect.width / 2,
        },
      })
    }
  }

  const handleMouseEnter = (
    index: number,
    nickname: string,
    action: 'expel' | 'delegate'
  ) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => {
      updateTooltipPosition(index, nickname, action)
    }, 1000)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    dispatchTooltip({ type: 'HIDE' })
  }

  const getTooltipText = () => {
    if (!tooltipState.action || !tooltipState.targetMember) return ''
    if (tooltipState.action === 'expel')
      return `${tooltipState.targetMember}님을 추방`
    return `${tooltipState.targetMember}님에게 리더 위임`
  }

  return (
    <div className="relative rounded-2xl border border-gray-100 bg-white p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">멤버 목록</h2>
        <span className="text-sm font-medium text-gray-500">
          {currentHeadcount}명
        </span>
      </div>

      <div className="scrollbar-hide h-[485px] overflow-y-auto">
        <div className="space-y-3">
          {sortedMembers.map((member, index) => (
            <div
              key={member.uuid}
              className="group relative flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <img
                  src="/member.svg"
                  alt={member.nickname}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">
                      {member.nickname}
                    </span>
                    {member.is_leader && (
                      <span className="bg-primary-100 text-primary-700 rounded-[4px] px-2 py-0.5 text-xs">
                        리더
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {isLeader && !member.is_leader && (
                <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <div
                    ref={(el: HTMLDivElement | null) => {
                      buttonRefs.current[`delegate-${member.uuid}`] = el
                    }}
                    className="relative"
                    onMouseEnter={() =>
                      handleMouseEnter(index * 2, member.nickname, 'delegate')
                    }
                    onMouseLeave={handleMouseLeave}
                  >
                    <BasicButton
                      variant="secondary"
                      size="small"
                      className="cursor-pointer !rounded-full !bg-blue-50 !text-xs !text-blue-400"
                      onClick={() =>
                        handleDelegateClick(member.nickname, member.uuid)
                      }
                      disabled={delegateLeader.isPending}
                    >
                      <Crown className="hover:text-blue-600" size={20} />
                    </BasicButton>
                  </div>

                  <div
                    ref={(el: HTMLDivElement | null) => {
                      buttonRefs.current[`expel-${member.uuid}`] = el
                    }}
                    className="relative"
                    onMouseEnter={() =>
                      handleMouseEnter(index * 2 + 1, member.nickname, 'expel')
                    }
                    onMouseLeave={handleMouseLeave}
                  >
                    <BasicButton
                      variant="danger"
                      size="small"
                      className="!text-danger-500 !h-6 !w-6 cursor-pointer !rounded-full !bg-red-50"
                      onClick={() =>
                        handleExpelClick(member.nickname, member.uuid)
                      }
                      disabled={expelMember.isPending}
                    >
                      <X size={20} className="hover:text-danger-800" />
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
            className="animate-fade-in pointer-events-none absolute z-[9999] rounded-lg bg-gray-200 px-3 py-1.5 text-xs whitespace-nowrap text-gray-600 shadow-lg"
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
  )
}
