import axios from 'axios'
import { BASE_URL } from './api'

type RefreshAccessToken = {
  access: string
}

/**
 * 리프레쉬 메서드
 * @returns {} {"access": "string"}
 */
export async function refreshAccessToken(): Promise<string | null> {
  try {
    const refreshClient = axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
    })
    const { data } = await refreshClient.post<RefreshAccessToken>(
      '/api/v1/auth/refresh'
    )
    if (data.access) return data.access
    return null
  } catch {
    return null
  }
}
