import { useEffect, useRef } from 'react'

interface usePanelCloseProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  panelRef: React.RefObject<HTMLElement | null>
  buttonRef?: React.RefObject<HTMLElement | null>
}

/**
 * 알림, 채팅 패널 등에서 정보를 입력 받아
 * 패널 외부 클릭시, esc 입력시
 * 닫힘 처리를 처리하는 메서드
 * @example
 * ```tsx
 *         usePanelClose({
 *  isOpen: isPanelOpen,
 *  setIsOpen: setIsPanelOpen,
 *  panelRef: chatPanelRef,
 *  buttonRef,
 * })
 * ````
 */
export function usePanelClose({
  isOpen,
  setIsOpen,
  panelRef,
  buttonRef,
}: usePanelCloseProps) {
  const setIsOpenRef = useRef(setIsOpen)

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node

      // 패널이 열렸나?
      if (!panelRef.current) return
      // 패널 내부 클릭인가?
      if (panelRef.current.contains(target)) return
      // 패널 버튼 클릭인가?
      if (buttonRef?.current && buttonRef.current.contains(target)) return

      // 전부 다 아니고 패널 외부 클릭이라면 닫기
      setIsOpenRef.current(false)
    }

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpenRef.current(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen, panelRef, buttonRef])
}
