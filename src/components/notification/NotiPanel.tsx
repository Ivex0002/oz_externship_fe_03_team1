import { storeNotification, type filterKey } from '@/store/storeNotification'
import { useMemo, useRef } from 'react'
import { createIconNode, NOTIFICATION_STYLE } from './NotiCreateIcon'
import { AnimatePresence, motion } from 'framer-motion'
import { usePanelClose } from '@/hooks/usePanelClose'

// TODO
// 1. store : 초기값 api 요청 로직 작성
// 2. Header : 모두 읽음 버튼 api 로직 연결
// 3. ItemList : 알림 클릭시 해당 링크로 이동하는 로직 필요(백엔드 api 명세 확인 필요)
export const NotiPanel = ({
  buttonRef,
}: {
  buttonRef: React.RefObject<HTMLButtonElement | null>
}) => {
  const { isNotiPanelOpen, setIsNotiPanelOpen } = storeNotification()
  const NotiPanelRef = useRef<HTMLDivElement>(null)

  usePanelClose({
    isOpen: isNotiPanelOpen,
    setIsOpen: setIsNotiPanelOpen,
    panelRef: NotiPanelRef,
    buttonRef,
  })

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        ref={NotiPanelRef}
        className="absolute top-10 right-20 h-[475px] w-[384px] rounded-2xl border border-gray-200 bg-white shadow-md"
      >
        <NotiHeader />
        <NotiTabs />
        <NotiItemList />
        <div className="h-[45px] w-full border-t border-gray-200 p-3 pt-[13px]"></div>
      </motion.div>
    </AnimatePresence>
  )
}

const NotiHeader = () => {
  const { markAllAsRead } = storeNotification()
  const handleClick = () => {
    // TODO : 모두 읽음 처리 로직
    // 서버쪽에서 1회 요청으로 처리되나, 혹은 다회 요청이 필요하냐에 따라서 달라짐
    markAllAsRead()
  }
  return (
    <div className="absolute flex h-[61px] w-full items-center justify-between border-b border-gray-200 p-4">
      <div className="text-lg font-semibold text-gray-900">알림</div>
      <button
        className="text-primary-600 hover:text-primary-700 cursor-pointer text-sm font-normal"
        onClick={handleClick}
      >
        모두 읽음
      </button>
    </div>
  )
}

const NotiTabs = () => {
  const { notiArr, unreadCount, readCount, currentFilter, filterNoti } =
    storeNotification()

  const TABS = useMemo(
    () => [
      { key: 'all', label: `전체보기 (${notiArr.length})` },
      {
        key: 'unread',
        label: `읽지 않음 (${unreadCount})`,
      },
      {
        key: 'read',
        label: `읽음 (${readCount})`,
      },
    ],
    [notiArr.length, readCount, unreadCount]
  )

  return (
    <div className="mt-[61px] flex h-[46px] border-b border-gray-200 text-sm">
      {TABS.map((tab) => {
        const isActive = currentFilter === tab.key
        return (
          <button
            key={tab.key}
            onClick={() => filterNoti(tab.key as filterKey)}
            className={`relative flex-1 cursor-pointer py-2 font-medium transition-colors ${
              isActive
                ? 'text-primary-600'
                : 'hover:text-primary-600 text-gray-500'
            }`}
          >
            {tab.label}
            {isActive && (
              <motion.div
                layoutId="underline"
                className="bg-primary-500 absolute right-1 bottom-0 left-1 h-[2px]"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

const NotiItemList = () => {
  const { filtered } = storeNotification()

  // TODO : 해당 알림 링크로 이동하는 로직 필요
  const handleClick = () => {}

  return filtered.length === 0 ? (
    <div className="center-center h-80 text-gray-500">알림이 없습니다</div>
  ) : (
    <ul className="transparent-scrollbar h-80">
      {filtered.map((n, index) => (
        <li
          key={n.id}
          aria-label={`${n.id}. ${n.is_read ? '읽은' : '읽지 않은'} 알림`}
          className={`cursor-pointer p-4 transition-colors ${index !== 0 ? 'border-t border-gray-100' : ''} ${n.is_read ? 'bg-white' : 'bg-primary-50'}`}
          onClick={handleClick}
        >
          <div className="relative flex items-start">
            {createIconNode(NOTIFICATION_STYLE[n.type])}

            <div className="flex-1 pl-3">
              <p className="h-10 text-sm leading-5 tracking-[0px] text-gray-900">
                {n.message}
              </p>
              <p className="font-roboto mt-1 text-xs text-gray-500">
                {/* TODO : API 리턴값 날짜 형태에 따른 파싱 필요함 */}
                {n.created_at}
              </p>
            </div>

            {!n.is_read && (
              <div className="pt-2 pl-3">
                <div className="bg-primary-500 h-2 w-2 rounded-full"></div>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
