import { create } from 'zustand'

interface StoreAccessToken {
  accessToken: string | null
  setAccessToken: (val: string) => void
  clearAccessToken: () => void
}
export const storeAccessToken = create<StoreAccessToken>((set) => ({
  accessToken: null,
  setAccessToken: (val) => set(() => ({ accessToken: val })),
  clearAccessToken: () => set(() => ({ accessToken: null })),
}))
