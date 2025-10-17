import { useState, useRef, useEffect } from 'react'
import { Bell, User, LogOut } from 'lucide-react'
import { NavLink } from 'react-router'
import { storeNotiOpen } from '@/store/storeNotiOpen'

export function LoginedMenu() {
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [notiCount, setNotiCount] = useState(0)
  const { SetIsNotiOpen } = storeNotiOpen()
  const menuRef = useRef<HTMLDivElement | null>(null)

  const handleNoti = () => {
    SetIsNotiOpen(true)
  }

  const handlePanel = () => {
    setIsPanelOpen((prev) => !prev)
  }

  const closePanel = () => {
    setIsPanelOpen(false)
  }

  // 일단 3개로 설정
  // 실제 api 요청필요
  useEffect(() => {
    setNotiCount(3)
  }, [])

  // 패널 외부 클릭시, esc 입력시 패널 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closePanel()
      }
    }

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePanel()
      }
    }

    if (isPanelOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isPanelOpen])

  return (
    <div className="relative flex items-center space-x-4">
      <button
        onClick={handleNoti}
        className="relative text-gray-700 transition-colors hover:text-yellow-600"
      >
        <Bell size={22} />
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          {notiCount}
        </span>
      </button>

      <div className="relative" ref={menuRef}>
        <button
          onClick={handlePanel}
          className="flex items-center space-x-1 rounded-full bg-yellow-100 px-2 py-1 transition-colors hover:bg-yellow-200"
        >
          <User className="text-yellow-600" size={18} />
          <span className="text-sm font-medium text-gray-700">김개발</span>
        </button>

        {isPanelOpen && <UserPanel onClose={closePanel} />}
      </div>
    </div>
  )
}
function UserPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute right-0 z-50 mt-2 flex h-[100px] w-48 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
      <NavLink
        to="/mypage"
        className="flex flex-1 items-center space-x-2 px-4 text-sm text-gray-700 transition-colors hover:bg-gray-50"
        onClick={() => onClose()}
      >
        <User size={16} />
        <span>마이페이지</span>
      </NavLink>

      <div className="border border-gray-200" />

      <NavLink
        to="/logout"
        className="flex flex-1 items-center space-x-2 px-4 text-sm text-red-600 transition-colors hover:bg-gray-50"
        onClick={() => onClose()}
      >
        <LogOut size={16} />
        <span>로그아웃</span>
      </NavLink>
    </div>
  )
}
