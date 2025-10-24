import { storeChat } from '@/store/storeChat'
import { MessageCircle, X } from 'lucide-react'
import { useRef } from 'react'
import { ChatPanel } from './ChatPanel'
import clsx from 'clsx'

export function ChatButton() {
  const { totalUnreadCount, setIsPanelOpen, isPanelOpen } = storeChat()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    setIsPanelOpen(isPanelOpen ? false : true)
  }

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="center-center bg-primary-500 fixed right-6 bottom-6 h-16 w-16 cursor-pointer rounded-full shadow-[0px_10px_15px_-3px_#0000001A,_0px_4px_6px_-4px_#0000001A]"
      >
        {!isPanelOpen && (
          <>
            <div className="center-center bg-danger-500 absolute -top-2 left-12 h-6 w-6 rounded-full text-xs font-semibold text-white">
              {totalUnreadCount}
            </div>
            <MessageCircle className={iconStyle} />
          </>
        )}

        {isPanelOpen && <X className={iconStyle} />}
      </button>

      {isPanelOpen && <ChatPanel buttonRef={buttonRef} />}
    </>
  )
}

const iconStyle = clsx('text-white text-2xl')
