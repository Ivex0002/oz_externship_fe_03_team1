import { LoginedMenu } from './LoginedMenu'
import { LogoutedMenu } from './LogoutedMenu'
import { refreshAccessToken } from '@/api/refreshAccessToken'
import { storeAccessToken } from '@/store/storeAccessToken'
import { storeUser } from '@/store/storeUser'
import { api } from '@/api/api'
import { useAsyncEffect } from '@/hooks/useAsyncEffect'

export const UserMenu = () => {
  const { user } = storeUser()
  // console.log({ user })

  return (
    <>
      <RefreshComp />
      <GetMeComp />
      {user ? <LoginedMenu /> : <LogoutedMenu />}
    </>
  )
}

const RefreshComp = () => {
  const { setAccessToken } = storeAccessToken()

  useAsyncEffect(
    async () => await refreshAccessToken(),
    (token) => token && setAccessToken(token),
    []
  )
  return null
}

const GetMeComp = () => {
  const { accessToken, clearAccessToken } = storeAccessToken()
  const { setUser, clearUser } = storeUser()

  useAsyncEffect(
    async () => {
      if (!accessToken) {
        // console.log('로그인 안됨')
        clearAccessToken()
        clearUser()
        return
      }
      return await api.v1.users.me.GET()
    },
    (data) => data && setUser(data.data),
    [accessToken]
  )
  return null
}
