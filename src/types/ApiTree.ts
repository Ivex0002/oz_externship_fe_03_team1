import type {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  Method,
} from 'axios'

// 반드시 대문자로 Http메서드를 적도록(가독성)
export type HttpMethod = Uppercase<Method>

// HttpMethod 일때 req 유무에 따른 분기처리
type MethodHandler<T> = T extends { req: infer Q } & { res: infer S }
  ? (data: Q) => Promise<S>
  : T extends { res: infer S }
    ? () => Promise<S>
    : never

// src\api\apiTree.ts 타입 지정용
// 들어온 타입객체 키값에 따른 분기처리
export type ApiTree<T> = {
  [K in keyof T]: K extends HttpMethod ? MethodHandler<T[K]> : ApiTree<T[K]>
} & (T extends (...args: infer Args) => infer R
  ? (...args: Args) => ApiTree<R>
  : unknown)

/**
 * API 요청을 수행하는 함수 시그니처.
 * - createApiTree에 주입되어 모든 요청이 이를 통해 수행됨.
 */
export type RequestExecutor = <Req, Res>(
  url: string,
  method: Method,
  data?: Req,
  config?: AxiosRequestConfig
) => Promise<Res>

// 에러 핸들링
export type AxiosErrorHandler = (error: AxiosError) => void | Promise<never>

// 리프레시
export interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}
