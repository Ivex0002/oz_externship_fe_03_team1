import { LoginedMenu } from './LoginedMenu'
import { LogoutedMenu } from './LogoutedMenu'

export function UserMenu() {
  // 로그인 확인 로직 필요
  const isLogined = true
  return isLogined ? <LoginedMenu /> : <LogoutedMenu />
}
