import { NavLink } from 'react-router'

export const LogoutedMenu = () => {
  return (
    <>
      <NavLink to="https://account.ozcoding.site/login" className="nav-links">
        로그인
      </NavLink>
      <NavLink
        to="https://account.ozcoding.site/signup"
        className="bg-primary-500 hover:bg-primary-600 rounded-lg px-4 py-2 whitespace-nowrap text-white transition-colors"
      >
        회원가입
      </NavLink>{' '}
    </>
  )
}
