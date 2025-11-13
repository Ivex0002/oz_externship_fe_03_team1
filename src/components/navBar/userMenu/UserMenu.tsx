import { LoginedMenu } from './LoginedMenu'
import { LogoutedMenu } from './LogoutedMenu'
import { refreshAccessToken } from '@/api/refreshAccessToken'
import { storeAccessToken } from '@/store/storeAccessToken'
import { storeUser } from '@/store/storeUser'
import { api } from '@/api/api'
import { useAsyncEffect } from '@/hooks/useAsyncEffect'

export const UserMenu = () => {
  const { user } = storeUser()

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
  const { accessToken } = storeAccessToken()
  const { setUser } = storeUser()

  useAsyncEffect(
    async () => {
      if (!accessToken) return
      return await api.v1.users.me.GET()
    },
    (user) => user && setUser(user),
    [accessToken]
  )
  return null
}
