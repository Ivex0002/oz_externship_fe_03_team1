import axios, { type AxiosResponse, type Method } from 'axios'
import { BASE_URL } from './api'

const client = axios.create({
  baseURL: BASE_URL,
})

/**
 * api 요청 메서드
 * 추후에 토큰 삽입 구조, 에러 핸들러 추가 필요
 */
export async function requestHandler<Req = void, Res = unknown>(
  url: string,
  method: Method,
  data?: Req
): Promise<Res> {
  const res: AxiosResponse<Res> = await client.request({
    url,
    method,
    ...(data !== undefined && { data }),
  })
  return res.data
}
