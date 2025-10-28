import type { AxiosError, InternalAxiosRequestConfig, Method } from 'axios'

// 반드시 대문자로 Http메서드를 적도록 명시(가독성)
export type HttpMethod = Uppercase<Method>

// HttpMethod 일때 req 유무에 따른 분기처리
type MethodHandler<M> = M extends { res: infer R; req: infer Q }
  ? (payload: Q | RequestConfig<Q>) => Promise<R>
  : M extends { res: infer R }
    ? (config?: Omit<RequestConfig<never>, 'data'>) => Promise<R>
    : never

export type DynamicFn = (...args: (string | number)[]) => object

type MappedProperties<T> = {
  [K in Exclude<keyof T, 'dynamicSub'>]: K extends HttpMethod
    ? MethodHandler<T[K]>
    : T[K] extends DynamicFn
      ? (...args: (string | number)[]) => ApiTree<ReturnType<T[K]>>
      : T[K] extends object
        ? ApiTree<T[K]>
        : never
}

type CallableSignature<T> = T extends { dynamicSub: infer D extends object }
  ? {
      (...args: (string | number)[]): ApiTree<D>
    }
  : unknown

// src\api\apiTree.ts 타입 지정용
// 들어온 타입객체 키값에 따른 분기처리
export type ApiTree<T> = MappedProperties<T> & CallableSignature<T>

/**
 * API 요청을 수행하는 함수 시그니처.
 * - createApiTree에 주입되어 모든 요청이 이를 통해 수행됨.
 */
export type RequestExecutor = <Req, Res>(
  url: string,
  method: Method,
  config?: RequestConfig<Req>
) => Promise<Res>

// id, 검색어, 페이지 옵션 등등 지원용 옵션 타입
export interface RequestConfig<Req> {
  params?: Record<string, unknown>
  data?: Req
}

// 에러 핸들링
export type AxiosErrorHandler = (error: AxiosError) => void | Promise<never>

// 서버에서 주는 에러 타입
// {type:'error' ...} 도 있던데
// 실제로 쓸지는 모름
export type SurverErrorResponse = {
  message?: string
  code?: string
  details?: unknown
}

// 리프레시
export interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}
