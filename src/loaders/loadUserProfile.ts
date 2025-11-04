import { api } from '@/api/api'
import { storeUser } from '@/store/storeUser'

export function loadUserProfile() {
  const { setUser } = storeUser()
  return async () => {
    try {
      const res = await api.v1.users.me.GET()
      setUser(res)
      return { user: res }
    } catch (error) {
      return { user: null, error: `Failed to load user data:${error}` }
    }
  }
}
