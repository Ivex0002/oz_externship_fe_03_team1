import { useEffect } from 'react'
import { LoginedMenu } from './LoginedMenu'
import { LogoutedMenu } from './LogoutedMenu'
import { refreshAccessToken } from '@/api/refreshAccessToken'
import { storeAccessToken } from '@/store/storeAccessToken'
import { toast } from 'react-toastify'
import { storeUser } from '@/store/storeUser'
import { api } from '@/api/api'

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
  useEffect(() => {
    ;(async () => {
      try {
        const AccessToken = await refreshAccessToken()
        if (AccessToken) setAccessToken(AccessToken)
      } catch (error) {
        toast.error(`${error}`)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}

const GetMeComp = () => {
  const { accessToken } = storeAccessToken()
  const { setUser } = storeUser()
  useEffect(() => {
    ;(async () => {
      try {
        if (!accessToken) return
        const user = await api.v1.users.me.GET()
        setUser(user)
      } catch (error) {
        toast.error(`${error}`)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])
  return null
}
