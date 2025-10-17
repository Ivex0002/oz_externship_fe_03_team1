import { useState, useRef, useEffect } from 'react'
import { Bell, User, LogOut } from 'lucide-react'
import { storeNotiOpen } from '../../../store/storeNotiOpen'
import { NavLink } from 'react-router'

export function LoginedMenu() {
  const [isPenelOpen, setIsPenelOpen] = useState(false)
  const { SetIsNotiOpen } = storeNotiOpen()
  const menuRef = useRef<HTMLDivElement | null>(null)

  const handleNoti = () => {
    SetIsNotiOpen(true)
  }

  const handleProfile = () => {
    setIsPenelOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsPenelOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative flex items-center space-x-4">
      <button
        onClick={handleNoti}
        className="relative text-gray-700 transition-colors hover:text-yellow-600"
      >
        <Bell size={22} />
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          3
        </span>
      </button>

      <div className="relative" ref={menuRef}>
        <button
          onClick={handleProfile}
          className="flex items-center space-x-1 rounded-full bg-yellow-100 px-2 py-1 transition-colors hover:bg-yellow-200"
        >
          <User className="text-yellow-600" size={18} />
          <span className="text-sm font-medium text-gray-700">김개발</span>
        </button>

        {isPenelOpen && (
          <div className="absolute right-0 z-50 mt-2 flex h-[100px] w-48 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
            <NavLink
              to="/mypage"
              className="flex flex-1 items-center space-x-2 px-4 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setIsPenelOpen(false)}
            >
              <User size={16} />
              <span>마이페이지</span>
            </NavLink>

            <div className="border-t" />

            <NavLink
              to="/logout"
              className="flex flex-1 items-center space-x-2 px-4 text-sm text-red-600 hover:bg-gray-50"
              onClick={() => setIsPenelOpen(false)}
            >
              <LogOut size={16} />
              <span>로그아웃</span>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  )
}
