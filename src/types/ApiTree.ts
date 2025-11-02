import type { AxiosError, InternalAxiosRequestConfig, Method } from 'axios'
import type { Req, Res } from './ApiLink'

// 반드시 대문자로 Http메서드를 적도록 명시(가독성)
export type HttpMethod = Uppercase<Method>

// HttpMethod 일때 req 유무에 따른 분기처리
type MethodHandler<T> = T extends Req<infer Q> & Res<infer S>
  ? (data: Q) => Promise<S>
  : T extends Res<infer S>
    ? () => Promise<S>
    : never

export type DynamicFn = (...args: (string | number)[]) => object

// src\api\apiTree.ts 타입 지정용
// 들어온 타입객체 키값에 따른 분기처리
export type ApiTree<T> = T extends (...args: infer Args) => infer R
  ? (...args: Args) => ApiTree<R>
  : {
      [K in keyof T]: K extends HttpMethod ? MethodHandler<T[K]> : ApiTree<T[K]>
    }

/**
 * API 요청을 수행하는 함수 시그니처.
 * - createApiTree에 주입되어 모든 요청이 이를 통해 수행됨.
 */
export type RequestExecutor = <Req, Res>(
  url: string,
  method: Method,
  data?: Req
) => Promise<Res>

// 에러 핸들링
export type AxiosErrorHandler = (error: AxiosError) => void | Promise<never>

// 리프레시
export interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}
