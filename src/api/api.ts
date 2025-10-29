import { createApiTree } from './apiTree'
import { ApiClientFactory } from './apiClient'
import { TokenManager } from './tokenManager'
import { throwHttpError } from './throwHttpError'
import { ApiLinks } from '@/types/ApiLinks'

// 추후 실제 주소로 교체
export const BASE_URL = '/api'
export const LOGIN_PAGE_URL = '/login'
const WEB_SOCKET_URL = '/ws'

const tokenManager = new TokenManager()
const apiFactory = new ApiClientFactory(tokenManager)

const httpClient = apiFactory.createHttpClient(BASE_URL, throwHttpError)
const requestExecutor = httpClient.getRequestExecutor()

// 일반 http 통신은 트리 구조로 접근
export const api = createApiTree(ApiLinks, requestExecutor)
// 웹소켓은 http 통신이 아니므로 따로 처리
export const wsApi = apiFactory.createWebSocketClient(WEB_SOCKET_URL)
