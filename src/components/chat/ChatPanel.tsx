import { storeChat } from '@/store/storeChat'
import { useRef } from 'react'
import { ChatSessionsPanel } from './ChatSessionsPanel'
import { ChatMessagesPanel } from './ChatMessagesPanel'
import { usePanelClose } from '@/hooks/usePanelClose'

export function ChatPanel({
  buttonRef,
}: {
  buttonRef: React.RefObject<HTMLButtonElement | null>
}) {
  const { setIsPanelOpen, isPanelOpen, currentPanel } = storeChat()
  const chatPanelRef = useRef<HTMLDivElement>(null)

  usePanelClose({
    isOpen: isPanelOpen,
    setIsOpen: setIsPanelOpen,
    panelRef: chatPanelRef,
    buttonRef,
  })

  return (
    <div
      ref={chatPanelRef}
      className="fixed right-6 bottom-25 flex h-96 w-80 cursor-auto flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-[0px_25px_50px_-12px_#00000040]"
    >
      {currentPanel === 'sessions' ? (
        <ChatSessionsPanel />
      ) : (
        <ChatMessagesPanel />
      )}
    </div>
  )
}
