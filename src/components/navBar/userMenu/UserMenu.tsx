import { LoginedMenu } from './LoginedMenu'
import { LogoutedMenu } from './LogoutedMenu'
import { refreshAccessToken } from '@/api/refreshAccessToken'
import { storeAccessToken } from '@/store/storeAccessToken'
import { storeUser } from '@/store/storeUser'
import { useAsyncEffect } from '@/hooks/useAsyncEffect'
import { useQueryUser } from '@/hooks/api/queries/useQueryUser'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export const UserMenu = () => {
  const { user } = storeUser()
  const { accessToken, tokenLoading } = storeAccessToken()
  // console.log({ user })

  return (
    <>
      <RefreshComp />
      {!tokenLoading && accessToken && <GetMeComp />}
      {user ? <LoginedMenu /> : <LogoutedMenu />}
    </>
  )
}

const RefreshComp = () => {
  const { setAccessToken, clearAccessToken, setTokenLoading } =
    storeAccessToken()
  const { clearUser } = storeUser()

  useAsyncEffect({
    asyncFn: async () => {
      setTokenLoading(true)
      return await refreshAccessToken()
    },
    onSuccess: (token) => {
      if (!token) {
        // console.log('리프레시 토큰 만료됨')
        clearAccessToken()
        clearUser()
      } else {
        setAccessToken(token)
      }
    },
    onError: (err) => {
      // console.log('리프레시 실패:', err)
      toast.error(`${err}`)
      clearAccessToken()
      clearUser()
    },
    finallyFn: () => {
      setTokenLoading(false)
    },
    deps: [],
  })

  return null
}

const GetMeComp = () => {
  const { accessToken } = storeAccessToken()
  const { setUser } = storeUser()

  const { data, isError, error } = useQueryUser({
    enabled: !!accessToken,
    refetchOnMount: true,
  })

  useAsyncEffect({
    asyncFn: async () => data,
    onSuccess: (res) => res && setUser(res.data),
    deps: [data],
  })

  useEffect(() => {
    if (isError && error) {
      toast.error(`${error}`)
    }
  }, [isError, error])
  return null
}
