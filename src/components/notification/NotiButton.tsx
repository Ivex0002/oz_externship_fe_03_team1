import { storeNotification } from '@/store/storeNotification'
import { Bell } from 'lucide-react'
import { NotiPanel } from './NotiPanel'
import { useRef } from 'react'
import { useAsyncEffect } from '@/hooks/useAsyncEffect'
import { api } from '@/api/api'
import { storeUser } from '@/store/storeUser'

export const NotiButton = () => {
  const { counts, isNotiPanelOpen, setIsNotiPanelOpen } = storeNotification()
  const notiCount = counts.unread
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    setIsNotiPanelOpen(!isNotiPanelOpen)
  }

  return (
    <>
      <GETNoti />

      <button
        ref={buttonRef}
        onClick={handleClick}
        className="nav-links relative cursor-pointer"
      >
        <Bell size={22} />
        {notiCount !== 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {notiCount}
          </span>
        )}
      </button>
      {isNotiPanelOpen && <NotiPanel buttonRef={buttonRef} />}
    </>
  )
}

const GETNoti = () => {
  const { setNotiArr, setCounts } = storeNotification()
  const { user } = storeUser()
  useAsyncEffect({
    asyncFn: async () => {
      if (!user) {
        setNotiArr([])
        return
      }
      return await api.v1.notifications.GET()
    },
    onSuccess: (data) => {
      // console.log('noti', data)
      if (!data) return
      setNotiArr(data.results)
      setCounts(data.counts)
    },
    deps: [user],
  })

  return null
}
