export type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'HEAD'
  | 'OPTIONS'

// HttpMethod 일때 req 유무에 따른 분기처리
type ApiMethod<M> = M extends { res: infer R; req: infer Q }
  ? (payload: Q) => Promise<R>
  : M extends { res: infer R }
    ? () => Promise<R>
    : never

export type ApiTree<T> = {
  [K in keyof T]: K extends HttpMethod // HTTP 메서드
    ? ApiMethod<T[K]>
    : T[K] extends (...args: infer Args) => infer SubT // 동적 경로 함수 (ex:id, 검색어 등등)
      ? (...args: Args) => ApiTree<SubT>
      : T[K] extends object
        ? ApiTree<T[K]>
        : T[K]
}
