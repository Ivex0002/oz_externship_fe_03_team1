import { NavLink, Outlet } from 'react-router'
import { UserMenu } from './userMenu/UserMenu'

const linkArr = [
  { path: '/courses', label: '강의 목록' },
  { path: '/groups', label: '스터디 그룹' },
  { path: '/jobs', label: '구인 공고' },
]

export default function NavbarLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="bg-white/90 px-20 py-3 backdrop-blur-sm">
        <div className="flex items-center justify-between px-8">
          {/* 왼쪽 로고 */}
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400 font-semibold text-white">
              S
            </div>
            <span className="text-xl font-semibold text-yellow-600">
              StudyHub
            </span>
          </NavLink>

          {/* 메뉴 */}
          <div className="flex items-center space-x-6 text-sm font-medium">
            {linkArr.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `pb-1 transition-colors ${
                    isActive
                      ? 'text-yellow-600'
                      : 'text-gray-700 hover:text-yellow-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <UserMenu />
          </div>
        </div>
      </nav>

      <main className="flex w-full flex-1 items-center justify-center bg-gray-50">
        <Outlet />
      </main>
    </div>
  )
}
