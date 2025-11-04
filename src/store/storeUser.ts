import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

type UserProfile = {
  id: number
  email: string
  nickname: string
  name: string
  phone_number: string
  birthday: string
  profile_img_url: string
  created_at: string
}

interface StoreUser {
  user: UserProfile | null
  isLogin: boolean
  setUser: (User: UserProfile) => void
  clearUser: () => void
}

/**
 * 유저 정보를 저장하는 스토어
 */
export const storeUser = create<StoreUser>()(
  subscribeWithSelector((set) => {
    return {
      user: null,
      isLogin: false,
      setUser: (user) => set(() => ({ user: user })),
      clearUser: () => set(() => ({ user: null })),
    }
  })
)

storeUser.subscribe(
  (state) => state.user,
  (user) => {
    storeUser.setState({
      isLogin: user === null ? false : true,
    })
  }
)
