import { storeNotification } from '@/store/storeNotification'
import { Bell } from 'lucide-react'
import { NotiPanel } from './NotiPanel'
import { useRef } from 'react'

export function NotiButton() {
  const { notiArr, isNotiPanelOpen, setIsNotiPanelOpen } = storeNotification()
  const notiCount = notiArr.length
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    setIsNotiPanelOpen(!isNotiPanelOpen)
  }

  return (
    <div>
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="nav-links relative"
      >
        <Bell size={22} />
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          {notiCount}
        </span>
      </button>
      {isNotiPanelOpen && <NotiPanel buttonRef={buttonRef} />}
    </div>
  )
}
