import type { ApiTree, HttpMethod } from '@/types/ApiTree'
import type { Method } from 'axios'
import { requestHandler, type RequestConfig } from './requestHandler'

// 런타임 체크용 HTTP_METHODS 상수 - 객체 구조에 따른 동적 링크 및 요청 파싱을 위해 필요
export const HTTP_METHODS = new Set<HttpMethod>([
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
  'HEAD',
  'OPTIONS',
])

type ExtractMethodType<T> = T extends { res: infer R; req?: infer Q }
  ? { res: R; req: Q }
  : never

type MethodHandler<T> = T extends { res: infer R; req?: infer Q }
  ? Q extends undefined
    ? (config?: Omit<RequestConfig<never>, 'data'>) => Promise<R>
    : (payload: Q | RequestConfig<Q>) => Promise<R>
  : never

/**
 * 객체 타입 구조를 url로 파싱해주는 메서드
 */
export function createApiTree<T extends object, P extends string = ''>(
  schema: T,
  pathPrefix: P = '' as P
): ApiTree<T> {
  const cache = new Map<string, unknown>()

  return new Proxy({} as object, {
    get(_target, prop: string | symbol) {
      const key = String(prop)

      // 캐싱
      const cacheKey = `${pathPrefix}:${key}`
      if (cache.has(cacheKey)) {
        return cache.get(cacheKey)
      }

      const upper = key.toUpperCase()

      //   http 메서드 들어왔을때의 분기처리
      if (HTTP_METHODS.has(upper as HttpMethod)) {
        const methodDef = (schema as T & Record<string, unknown>)[upper]
        if (!methodDef) {
          throw new Error(`Method ${upper} not defined at ${pathPrefix}`)
        }

        type MethodType = ExtractMethodType<typeof methodDef>

        type Req = MethodType['req']
        type Res = MethodType['res']

        /**
         * HTTP 메서드 핸들러 생성
         * - payload 없이 호출: api.users.GET()
         * - body만 전달: api.users.POST(req_body)
         * - config 전달: api.users.POST({ data: req_body, headers 등: {...} })
         */
        const handler = (payload?: Req | RequestConfig<Req>) => {
          if (payload === undefined) {
            return requestHandler<Req, Res>(
              normalizeUrl(pathPrefix),
              upper as Method
            )
          }

          // RequestConfig 여부 판별
          // - 옵션 포함시: RequestConfig 그대로 전달 (data, params, headers 등 포함)
          // - 옵션 미포함시(req_body만 제공): payload를 data 속성으로 감싸서 전달
          const config = isRequestConfig<Req>(payload)
            ? payload
            : { data: payload }

          return requestHandler<Req, Res>(
            normalizeUrl(pathPrefix),
            upper as Method,
            config
          )
        }

        cache.set(cacheKey, handler)
        return handler as MethodHandler<typeof methodDef>
      }

      const value = (schema as T & Record<string, unknown>)[key as keyof T]

      if (typeof value === 'function') {
        type DynamicFn = (...args: (string | number)[]) => object

        const dynamicHandler = (...args: (string | number)[]) => {
          const subPath = joinPath(pathPrefix, ...args.map(String))
          const subSchema = (value as DynamicFn)(...args)
          return createApiTree(subSchema, subPath)
        }

        cache.set(cacheKey, dynamicHandler)
        return dynamicHandler
      }

      const nextPath = joinPath(pathPrefix, key)

      const nextNode = value as T[keyof T]

      if (typeof nextNode !== 'object' || nextNode === null) {
        throw new Error(`Expected object at path: ${nextPath}`)
      }

      const nextTree = createApiTree(nextNode as object, nextPath)
      cache.set(cacheKey, nextTree)
      return nextTree
    },
  }) as ApiTree<T>
}

function isRequestConfig<T>(value: unknown): value is RequestConfig<T> {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const obj = value as Record<string, unknown>

  // data나 params가 있으면 RequestConfig로 간주
  if ('data' in obj || 'params' in obj) {
    return true
  }

  // 기타 RequestConfig 특징적 속성들
  const configKeys = [
    'headers',
    'timeout',
    'responseType',
    'withCredentials',
    'onUploadProgress',
    'onDownloadProgress',
  ]

  return configKeys.some((key) => key in obj)
}

function joinPath(...segments: string[]): string {
  if (segments.length === 0) return ''

  const cleaned = segments
    .filter(Boolean)
    .map((segment) => {
      // 앞뒤 슬래시 제거
      return String(segment).replace(/^\/+|\/+$/g, '')
    })
    .filter(Boolean)

  return cleaned.join('/')
}

/**
 * 중복 슬래시 제거
 */
function normalizeUrl(path: string): string {
  if (!path) return '/'

  // 중복 슬래시 제거
  const normalized = path.replace(/\/+/g, '/')

  // 항상 /로 시작하도록
  return normalized.startsWith('/') ? normalized : `/${normalized}`
}
