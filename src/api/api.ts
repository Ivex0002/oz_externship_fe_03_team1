import axios, { type Method, type AxiosResponse } from 'axios'
import type { ApiLinks, ApiTree, HttpMethod } from '@/types/apiType'

const BASE_URL = '/api' // 추후 실제 서버 주소로 교체

const client = axios.create({
  baseURL: BASE_URL,
})

// 런타임 체크용 HTTP_METHODS 상수
export const HTTP_METHODS = new Set<HttpMethod>([
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
  'HEAD',
  'OPTIONS',
])

/**
 * api 요청 메서드
 * 추후에 토큰 삽입 구조, 에러 핸들러 추가 필요
 */
async function request<Req = void, Res = unknown>(
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

/**
 * 객체 구조를 url로 파싱해주는 메서드
 */
function createApiTree<T extends object, P extends string = ''>(
  schema: T,
  pathPrefix: P = '' as P
): ApiTree<T> {
  return new Proxy({} as object, {
    get(_target, prop: string | symbol) {
      const key = String(prop)

      const upper = key.toUpperCase()

      if (HTTP_METHODS.has(upper as HttpMethod)) {
        const methodDef = (schema as T & Record<string, unknown>)[upper]
        if (!methodDef) {
          throw new Error(`Method ${upper} not defined at ${pathPrefix}`)
        }

        type MethodType = typeof methodDef extends {
          res: infer R
          req?: infer Q
        }
          ? { res: R; req: Q extends undefined ? never : Q }
          : never

        type Req = MethodType['req']
        type Res = MethodType['res']

        return ((payload?: Req): Promise<Res> => {
          if (payload !== undefined) {
            return request<Req, Res>(pathPrefix, upper as Method, payload)
          }
          return request<never, Res>(pathPrefix, upper as Method)
        }) as (payload?: Req) => Promise<Res>
      }

      const value = (schema as T & Record<string, unknown>)[key as keyof T]
      if (typeof value === 'function') {
        type DynamicFn = (id: number) => object

        return (id: number) => {
          const subPath = pathPrefix ? `${pathPrefix}/${id}` : `${id}`

          const subSchema = (value as DynamicFn)(id)
          return createApiTree(subSchema, subPath)
        }
      }

      const nextPath = pathPrefix ? `${pathPrefix}/${key}` : key

      const nextNode = value as T[keyof T]

      if (typeof nextNode !== 'object' || nextNode === null) {
        throw new Error(`Expected object at path: ${nextPath}`)
      }

      return createApiTree(nextNode as object, nextPath)
    },
  }) as ApiTree<T>
}

export const api = createApiTree<ApiLinks>({} as ApiLinks)
