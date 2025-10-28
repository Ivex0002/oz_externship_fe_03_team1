import type {
  ApiTree,
  HttpMethod,
  RequestConfig,
  RequestExecutor,
} from '@/types/ApiTree'
import type { Method } from 'axios'

/**
 * 런타임에서 HTTP 메서드를 구분하기 위한 상수.
 * - 객체 기반 API 스키마를 파싱할 때 메서드 이름 대문자 변환 후 비교.
 */
export const HTTP_METHODS = new Set<HttpMethod>([
  'GET',
  'DELETE',
  'HEAD',
  'OPTIONS',
  'POST',
  'PUT',
  'PATCH',
  'PURGE',
  'LINK',
  'UNLINK',
])

/**
 * AxiosRequestConfig에 존재하는 모든 설정 키들 목록
 * data 항목만 미포함
 */
const CONFIG_KEYS = [
  'url',
  'method',
  'baseURL',
  'allowAbsoluteUrls',
  'transformRequest',
  'transformResponse',
  'headers',
  'params',
  'paramsSerializer',
  'timeout',
  'timeoutErrorMessage',
  'withCredentials',
  'adapter',
  'auth',
  'responseType',
  'responseEncoding',
  'xsrfCookieName',
  'xsrfHeaderName',
  'onUploadProgress',
  'onDownloadProgress',
  'maxContentLength',
  'validateStatus',
  'maxBodyLength',
  'maxRedirects',
  'maxRate',
  'beforeRedirect',
  'socketPath',
  'transport',
  'httpAgent',
  'httpsAgent',
  'proxy',
  'cancelToken',
  'decompress',
  'transitional',
  'signal',
  'insecureHTTPParser',
  'env',
  'formSerializer',
  'family',
  'lookup',
  'withXSRFToken',
  'parseReviver',
  'fetchOptions',
]
const CONFIG_KEYS_SET = new Set<string>(CONFIG_KEYS)

/**
 * 스키마 타입에서 req/res 타입을 추출.
 */
type ExtractMethodType<T> = T extends { res: infer R }
  ? T extends { req: infer Q }
    ? { res: R; req: Q }
    : { res: R }
  : never

/**
 * API 엔드포인트 호출 시 인자 시그니처를 추론하기 위한 타입.
 * - req가 없는 경우: config만 받음.
 * - req가 있는 경우: data 또는 RequestConfig를 받음.
 */
type MethodHandler<T> = T extends { res: infer R }
  ? T extends { req: infer Q }
    ? (payload: Q | RequestConfig<Q>) => Promise<R>
    : (config?: Omit<RequestConfig<never>, 'data'>) => Promise<R> // data 필드가 없음을 명시
  : never

/**
 * 동적 URL 세그먼트용 함수 타입.
 * ex) user(id).GET() → (...args: (string | number)[]) => object
 */
type DynamicFn = (...args: (string | number)[]) => object

/**
 * createApiTree
 *
 * 주어진 API 스키마 객체를 기반으로 Proxy를 생성하여,
 * 속성 접근 시 경로를 누적하고 요청 메서드 핸들러를 자동 생성한다.
 *
 * @param schema - API 구조 객체 (req/res 타입 정의 포함)
 * @param pathPrefix - 현재까지 누적된 URL 경로
 * @param requestFn - 실제 HTTP 요청을 수행하는 함수
 */
export function createApiTree<T extends object, P extends string = ''>(
  schema: T, // 경로 객체
  requestFn: RequestExecutor, // 요청 로직
  pathPrefix: P = '' as P // 경로 누적 저장용
): ApiTree<T> {
  return new Proxy({} as object, {
    get(_target, prop: string | symbol) {
      // http 메서드 들어왔을때의 분기처리
      const key = String(prop)
      const upper = key.toUpperCase()
      if (HTTP_METHODS.has(upper as HttpMethod)) {
        return onHttpMethod<T, P>(schema, upper, pathPrefix, requestFn)
      }

      // 동적 세그먼트 (ex. users(id))
      const value = (schema as T & Record<string, unknown>)[key as keyof T]
      if (isMiddlePram(value)) {
        return onMiddlePram<T, P>(pathPrefix, value, requestFn)
      }

      // 하위 경로 객체로 재귀 이동
      const nextPath = joinPath(pathPrefix, key)
      const nextNode = value as T[keyof T]
      if (typeof nextNode !== 'object' || nextNode === null) {
        throw new Error(`Expected object at path: ${nextPath}`)
      }

      return createApiTree(nextNode as object, requestFn, nextPath)
    },
  }) as ApiTree<T>
}

/**
 * 경로 중간에 파라미터(동적 세그먼트)가 포함된 경우 처리.
 * ex) /users/:id → users(id)
 */
function onMiddlePram<T extends object, P extends string = ''>(
  pathPrefix: P,
  value: (T & Record<string, unknown>)[keyof T] & DynamicFn,
  requestFn: RequestExecutor
) {
  const dynamicHandler = (...args: (string | number)[]) => {
    const subPath = joinPath(pathPrefix, ...args.map(String))
    const subSchema = (value as DynamicFn)(...args)
    return createApiTree(subSchema, requestFn, subPath)
  }

  return dynamicHandler
}

/**
 * HTTP 메서드(GET/POST 등)가 호출된 경우 요청 인자(payload/config)를 판별하여
 * requestFn으로 전달.
 */
function onHttpMethod<T extends object, P extends string = ''>(
  schema: T,
  upper: string,
  pathPrefix: P,
  requestFn: RequestExecutor
) {
  const methodDef = (schema as T & Record<string, unknown>)[upper]
  if (!methodDef) {
    throw new Error(`Method ${upper} not defined at ${pathPrefix}`)
  }

  type MethodType = ExtractMethodType<typeof methodDef>

  type Req = MethodType['req']
  type Res = MethodType['res']

  const handler = (payload?: Req | RequestConfig<Req>) => {
    const config = isRequestConfig<Req>(payload)
      ? payload
      : payload
        ? { data: payload }
        : undefined

    return requestFn<Req, Res>(
      normalizeUrl(pathPrefix),
      upper as Method,
      config
    )
  }

  return handler as MethodHandler<typeof methodDef>
}

/**
 * 값이 동적 경로 함수인지 판별.
 * ex) /users/:id → users(id)
 */
function isMiddlePram(value: unknown): value is DynamicFn {
  return typeof value === 'function'
}

/**
 * RequestConfig 형태인지 판별.
 * - 주요 Axios 설정 키를 포함하면 true.
 */
function isRequestConfig<T>(value: unknown): value is RequestConfig<T> {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  const obj = value as Record<string, unknown>

  for (const key in obj) {
    if (CONFIG_KEYS_SET.has(key)) {
      return true
    }
  }
  return false
}

/**
 * URL 경로 세그먼트를 안전하게 병합.
 * - 각 세그먼트의 슬래시를 제거하고 중복된 슬래시 없이 조합.
 */
function joinPath(...segments: string[]): string {
  if (segments.length === 0) return ''

  const cleaned = segments
    .filter(Boolean)
    .map((segment) => {
      return String(segment).replace(/^\/+|\/+$/g, '')
    })
    .filter(Boolean)

  return cleaned.join('/')
}

/**
 * URL 경로를 정규화.
 * - 중복 슬래시 제거 및 항상 `/`로 시작 보장.
 */
function normalizeUrl(path: string): string {
  if (!path) return '/'
  const normalized = path.replace(/\/+/g, '/')
  return normalized.startsWith('/') ? normalized : `/${normalized}`
}
