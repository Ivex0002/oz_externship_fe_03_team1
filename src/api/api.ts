import type { ApiLinks } from '@/types/ApiLinks'
import { createApiTree } from './apiTree'
import { ApiClientFactory } from './apiClient'
import { TokenManager } from './tokenManager'
import { throwHttpError } from './throwHttpError'

// 추후 실제 서버 주소로 교체
const BASE_URL = '/api'
const WEB_SOCKET_URL = '/ws'

const tokenManager = new TokenManager()
const apiFactory = new ApiClientFactory(tokenManager)

const httpClient = apiFactory.createHttpClient(BASE_URL, throwHttpError)
const requestExecutor = httpClient.getRequestExecutor()

// 일반 http 통신은 트리 구조로 접근
export const api = createApiTree<ApiLinks>({} as ApiLinks, requestExecutor)
// 웹소켓은 http 통신이 아니므로 따로 처리
export const wsApi = apiFactory.createWebSocketClient(WEB_SOCKET_URL)
