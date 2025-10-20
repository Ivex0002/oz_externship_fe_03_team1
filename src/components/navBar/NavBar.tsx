import { NavLink, Outlet } from 'react-router'
import { UserMenu } from './userMenu/UserMenu'

export default function NavbarLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="fixed top-0 right-0 left-0 z-50 h-[65px] border-b border-gray-200 bg-white px-20">
        <div className="flex h-full items-center justify-between px-8">
          <Logo />

          <div className="flex items-center space-x-8">
            <Links />
            <UserMenu />
          </div>
        </div>
      </nav>

      <main className="mt-[65px] flex w-full flex-1 items-center justify-center bg-white">
        <Outlet />
      </main>
    </div>
  )
}

function Logo() {
  return (
    <NavLink to="/" className="flex items-center space-x-2">
      <div className="bg-primary-400 flex h-8 w-8 items-center justify-center rounded-lg font-semibold text-white">
        S
      </div>
      <span className="text-primary-600 text-xl font-semibold">StudyHub</span>
    </NavLink>
  )
}

const linkArr = [
  { path: '/courses', label: '강의 목록' },
  { path: '/groups', label: '스터디 그룹' },
  { path: '/jobs', label: '구인 공고' },
]

function Links() {
  return (
    <>
      {linkArr.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `nav-links ${isActive ? 'text-primary-600' : ''}`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </>
  )
}
