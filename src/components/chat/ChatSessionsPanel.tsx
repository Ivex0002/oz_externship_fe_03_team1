import { formatToMonthDay } from '@/hooks/useFormatDate'
import { storeChat } from '@/store/storeChat'
import type { ChatSessionUI } from '@/types/Chat'
import { X } from 'lucide-react'

export const ChatSessionsPanel = () => {
  const { sessions } = storeChat()
  return (
    <>
      <ChatSessionHeader />

      {/* sessions 개수에 따른 분기처리 필요 */}
      <div className="transparent-scrollbar h-[309px] w-full">
        {sessions.map((el) => SessionItem(el))}
      </div>
    </>
  )
}
const ChatSessionHeader = () => {
  const { totalUnreadCount, setIsPanelOpen } = storeChat()
  const handlePanelClose = () => {
    setIsPanelOpen(false)
  }
  return (
    <div className="flex h-[73px] w-full flex-row items-center justify-between border-b border-gray-200 bg-gray-50 p-4 pb-[17px]">
      {/* title */}
      <div className="flex h-10 flex-col text-start">
        <span className="h-6 text-base font-semibold text-gray-900">
          채팅방
        </span>
        <span className="text-primary-600 h-4 text-xs">
          {totalUnreadCount}개의 읽지 않은 메시지
        </span>
      </div>
      {/* close button */}
      <div
        onClick={handlePanelClose}
        className="center-center h-8 w-8 cursor-pointer rounded-md transition-colors hover:bg-gray-100"
      >
        <X className="text-gray-400" size={16} />
      </div>
    </div>
  )
}

const SessionItem = (session: ChatSessionUI) => {
  const { togglePanel } = storeChat()
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    togglePanel(session.id)
  }
  return (
    <div
      key={session.id}
      className="flex h-[76px] w-full cursor-pointer flex-col border-b border-gray-200 p-3 transition-colors hover:bg-gray-50"
      onClick={handleClick}
    >
      <div className="flex h-6 flex-row justify-between">
        {/* title */}
        <div className="text-sm">{session.title}</div>

        <div className="flex flex-row items-center gap-1">
          {/* updated at */}
          <div className="h-4 text-xs text-gray-500">
            {formatToMonthDay(session.updated_at)}
          </div>

          {/* unread count */}
          {session.unreadCount > 0 && (
            <div className="center-center bg-danger-500 h-5 w-5 rounded-full text-xs text-white">
              {session.unreadCount}
            </div>
          )}
        </div>
      </div>

      {/* last msg */}
      <div className="flex text-start text-xs text-gray-600">
        {session.last_sender}:{session.last_message}
      </div>
    </div>
  )
}
