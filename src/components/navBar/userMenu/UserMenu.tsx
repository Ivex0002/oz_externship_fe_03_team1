import { LoginedMenu } from './LoginedMenu'
import { LogoutedMenu } from './LogoutedMenu'

export function UserMenu() {
  const isLogined = true
  return isLogined ? <LoginedMenu /> : <LogoutedMenu />
}
