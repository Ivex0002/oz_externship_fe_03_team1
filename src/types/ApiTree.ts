import type { AxiosError, InternalAxiosRequestConfig, Method } from 'axios'

// 반드시 대문자로 Http메서드를 적도록 명시(가독성)
export type HttpMethod = Uppercase<Method>

// HttpMethod 일때 req 유무에 따른 분기처리
type ApiMethod<M> = M extends { res: infer R; req: infer Q }
  ? (payload: Q | RequestConfig<Q>) => Promise<R>
  : M extends { res: infer R }
    ? (config?: Omit<RequestConfig<never>, 'data'>) => Promise<R>
    : never

// src\api\apiTree.ts 타입 지정용
// 들어온 타입객체 키값에 따른 분기처리
export type ApiTree<T> = {
  [K in keyof T]: K extends HttpMethod // HTTP 메서드
    ? ApiMethod<T[K]>
    : T[K] extends (...args: infer Args) => infer SubT // 동적 경로 함수 (ex:id, 검색어 등등)
      ? (...args: Args) => ApiTree<SubT>
      : T[K] extends object
        ? ApiTree<T[K]> // 재귀적 호출 - "/"로 구분된 경로 키값으로 사용
        : T[K]
}

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
