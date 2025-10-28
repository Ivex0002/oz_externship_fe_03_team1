import type { ApiLinks } from '@/types/ApiLinks'
import { createApiTree } from './apiTree'
import { ApiClientFactory } from './apiClient'
import { LocalStorageTokenStorage } from './tokenManager'
import { handleHttpError } from './handleHttpError'

export const BASE_URL = '/api' // 추후 실제 서버 주소로 교체
export const WEB_SOCKET_URL = '/ws' // 추후 실제 서버 주소로 교체

const tokenStorage = new LocalStorageTokenStorage()
const apiFactory = new ApiClientFactory(tokenStorage)

const httpClient = apiFactory.createHttpClient(BASE_URL, handleHttpError)
const requestExecutor = httpClient.getRequestExecutor()

// 일반 http 통신은 트리 구조로 접근
export const api = createApiTree<ApiLinks>({} as ApiLinks, requestExecutor)
// 웹소켓은 http 통신이 아니므로 따로 처리
export const wsApi = apiFactory.createWebSocketClient(WEB_SOCKET_URL)
