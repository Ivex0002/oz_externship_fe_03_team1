import type { ApiLinks } from '@/types/apiLinks'
import { createApiTree } from './apiTree'

export const BASE_URL = '/api' // 추후 실제 서버 주소로 교체

// 현재 createApiTree를 직접 참조하나, createApiClient 로직을 작성하여 토큰 관리와 에러 핸들러를 다룰 예정
export const api = createApiTree<ApiLinks>({} as ApiLinks)
