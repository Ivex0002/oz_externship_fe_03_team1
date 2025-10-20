import { NavLink } from 'react-router'

export function LogoutedMenu() {
  return (
    <>
      <NavLink to="/login" className="nav-links">
        로그인
      </NavLink>
      <NavLink
        to="/signup"
        className="bg-primary-500 hover:bg-primary-600 rounded-lg px-4 py-2 text-white transition-colors"
      >
        회원가입
      </NavLink>{' '}
    </>
  )
}
