import { useState, useRef, useEffect } from 'react'
import { User, LogOut } from 'lucide-react'
import { NavLink } from 'react-router'
import { NotiButton } from '@/components/notification/NotiButton'

export const LoginedMenu = () => {
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  const handleUserPanel = () => {
    setIsUserPanelOpen((prev) => !prev)
  }

  const closeUserPanel = () => {
    setIsUserPanelOpen(false)
  }

  // 실제 api 요청필요
  useEffect(() => {}, [])

  // 패널 외부 클릭시, esc 입력시 패널 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeUserPanel()
      }
    }

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeUserPanel()
      }
    }

    if (isUserPanelOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isUserPanelOpen])

  return (
    <div className="relative flex items-center space-x-4">
      <NotiButton />

      <div className="relative" ref={menuRef}>
        <button
          onClick={handleUserPanel}
          className="group hover:bg-primary-50 flex cursor-pointer items-center space-x-2 rounded-lg px-2 py-1 transition-colors duration-200 ease-in-out"
        >
          <div className="center-center bg-primary-100 group-hover:bg-primary-200 h-8 w-8 rounded-full transition-colors duration-200">
            <User className="text-primary-600" size={18} />
          </div>
          <span className="text-sm font-medium text-gray-700">김개발</span>
        </button>

        {isUserPanelOpen && <UserPanel onClose={closeUserPanel} />}
      </div>
    </div>
  )
}
const UserPanel = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="absolute right-0 z-50 mt-2 flex h-[100px] w-48 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
      <NavLink
        to="https://account.ozcoding.site/mypage/profile"
        className="flex flex-1 items-center space-x-2 px-4 text-sm text-gray-700 transition-colors hover:bg-gray-50"
        onClick={() => onClose()}
      >
        <User size={16} />
        <span>마이페이지</span>
      </NavLink>

      <div className="border border-gray-200" />

      <NavLink
        to="https://account.ozcoding.site/"
        className="text-danger-600 flex flex-1 items-center space-x-2 px-4 text-sm transition-colors hover:bg-gray-50"
        onClick={() => onClose()}
      >
        <LogOut size={16} />
        <span>로그아웃</span>
      </NavLink>
    </div>
  )
}
