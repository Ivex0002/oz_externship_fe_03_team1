import { NavLink } from 'react-router'

export function LogoutedMenu() {
  return (
    <>
      <NavLink to="/login" className="hover:text-yellow-600">
        로그인
      </NavLink>
      <NavLink
        to="/signup"
        className="rounded-lg bg-yellow-400 px-4 py-2 text-white hover:bg-yellow-500"
      >
        회원가입
      </NavLink>{' '}
    </>
  )
}
