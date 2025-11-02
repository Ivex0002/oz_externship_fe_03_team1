import type { ApiTree, HttpMethod, RequestExecutor } from '@/types/ApiTree'

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
])

/**
 * API Tree 생성 함수
 *
 * 타입만으로 자동완성을 제공하고, 런타임에는 경로를 파싱하여 요청을 실행
 *
 */
export function createApiTree<T extends object>(
  requestFn: RequestExecutor, // 요청 로직
  pathSegments: string[] = [] // 경로 누적 저장용
): ApiTree<T> {
  return new Proxy(() => {}, {
    // 프로퍼티 접근 (경로 탐색)
    get(_target, prop: string | symbol): unknown {
      if (typeof prop !== 'string') {
        return undefined
      }

      // 모든 프로퍼티를 경로 세그먼트로 추가
      return createApiTree<object>(requestFn, [...pathSegments, prop])
    },

    // 함수 호출
    apply(_target, _thisArg, args: unknown[]): unknown {
      const lastSegment = pathSegments[pathSegments.length - 1]

      // 1순위: HTTP 메서드 실행
      if (
        lastSegment &&
        HTTP_METHODS.has(lastSegment.toUpperCase() as HttpMethod)
      ) {
        const method = lastSegment.toUpperCase()
        const path = normalizeUrl(joinPath(...pathSegments.slice(0, -1)))
        const data = args[0]
        return requestFn(path, method as HttpMethod, data)
      }

      // 2순위: 파라미터 삽입 (직접 호출)
      if (args.length > 0) {
        const param = args[0]
        return createApiTree<object>(requestFn, [
          ...pathSegments,
          String(param),
        ])
      }

      throw new Error(`Cannot call path: ${pathSegments.join('/')}`)
    },
  }) as ApiTree<T>
}

/**
 * URL 경로 세그먼트를 안전하게 병합.
 * 타입 객체 내부의 키값에서 "-"을 사용할수 없기에, $로 대체
 * 현 메서드에서 "$"를 "-"으로 변경
 */
function joinPath(...segments: (string | number)[]): string {
  return segments
    .reduce<string[]>((acc, seg) => {
      if (seg == null || seg === '') return acc
      const str = String(seg).replace(/\$/g, '-')
      if (str) acc.push(str)
      return acc
    }, [])
    .join('/')
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
