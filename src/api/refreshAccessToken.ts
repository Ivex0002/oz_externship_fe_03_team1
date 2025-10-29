import axios from 'axios'
import { BASE_URL } from './api'

export async function refreshAccessToken(): Promise<string | null> {
  try {
    const refreshClient = axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
    })
    const res = await refreshClient.post('/api/v1/auth/refresh')
    if (res.data?.accessToken) return res.data.accessToken
    return null
  } catch {
    return null
  }
}
