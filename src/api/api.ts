import type { ApiLinks } from '@/types/apiLinks'
import { createApiTree } from './apiTree'

export const BASE_URL = '/api' // 추후 실제 서버 주소로 교체

export const api = createApiTree<ApiLinks>({} as ApiLinks)
