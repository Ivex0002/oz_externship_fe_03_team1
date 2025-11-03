import { storeChat } from '@/store/storeChat'
import { useRef } from 'react'
import { ChatSessionsPanel } from './ChatSessionsPanel'
import { ChatMessagesPanel } from './ChatMessagesPanel'
import { usePanelClose } from '@/hooks/usePanelClose'
import { motion } from 'framer-motion'

export const ChatPanel = ({
  buttonRef,
}: {
  buttonRef: React.RefObject<HTMLButtonElement | null>
}) => {
  const { setIsPanelOpen, isPanelOpen, currentPanel } = storeChat()
  const chatPanelRef = useRef<HTMLDivElement>(null)

  usePanelClose({
    isOpen: isPanelOpen,
    setIsOpen: setIsPanelOpen,
    panelRef: chatPanelRef,
    buttonRef,
  })

  return (
    <motion.div
      ref={chatPanelRef}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={panelVariants}
      transition={{ duration: 0.08 }}
      className="fixed right-6 bottom-25 flex h-96 w-80 cursor-auto flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-[0px_25px_50px_-12px_#00000040]"
    >
      {currentPanel === 'sessions' ? (
        <ChatSessionsPanel />
      ) : (
        <ChatMessagesPanel />
      )}
    </motion.div>
  )
}

const panelVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}
