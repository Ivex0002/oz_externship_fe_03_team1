import { ApiClientFactory } from './apiClient'
import { TokenManager } from './tokenManager'
import { throwHttpError } from './throwHttpError'
import type { ApiLinks } from '@/types/ApiLink'
import { keyIsLink } from 'key-is-link'
import type { AxiosRequestConfig } from 'axios'

// 추후 실제 주소로 교체
export const BASE_URL = import.meta.env.VITE_API_BASE_URL
export const LOGIN_PAGE_URL = '/login'
const WEB_SOCKET_URL = '/ws'

const tokenManager = new TokenManager()
const apiFactory = new ApiClientFactory(tokenManager)

const httpClient = apiFactory.createHttpClient(BASE_URL, throwHttpError)
const requestExecutor = httpClient.getRequestExecutor()

// 일반 http 통신은 트리 구조로 접근
export const api = keyIsLink<ApiLinks, AxiosRequestConfig>(requestExecutor)
// 웹소켓은 http 통신이 아니므로 따로 처리
export const wsApi = apiFactory.createWebSocketClient(WEB_SOCKET_URL)