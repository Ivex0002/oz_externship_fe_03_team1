import axios, { type AxiosResponse, type Method } from 'axios'
import { BASE_URL } from './api'

const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

// id, 검색어, 페이지 옵션 등등 지원용 옵션 타입
export interface RequestConfig<Req> {
  params?: Record<string, unknown>
  data?: Req
}

/**
 * api 요청 메서드
 * 추후에 토큰 삽입 구조, 에러 핸들러 추가 필요
 */
export async function requestHandler<Req = void, Res = unknown>(
  url: string,
  method: Method,
  config?: RequestConfig<Req>
): Promise<Res> {
  const res: AxiosResponse<Res> = await client.request<Res>({
    url,
    method,
    ...config,
  })

  return res.data
}
