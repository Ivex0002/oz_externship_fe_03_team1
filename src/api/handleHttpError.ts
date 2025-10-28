import type { SurverErrorResponse } from '@/types/ApiTree'
import { AxiosError } from 'axios'

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * 메인 에러 핸들러
 * TODO:토큰 리프레시 로직 필요
 */
export async function handleHttpError(error: AxiosError): Promise<never> {
  const status = error.response?.status || 0
  const data = error.response?.data
  const errorResponse = isErrorResponse(data) ? data : null

  // 서버에서 보낸 에러 메시지 우선 사용
  const message = errorResponse?.message || getDefaultErrorMessage(status)
  const code = errorResponse?.code
  const details = errorResponse?.details

  throw new ApiError(status, message, code, details)
}

function isErrorResponse(data: unknown): data is SurverErrorResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    (typeof (data as SurverErrorResponse).message === 'string' ||
      typeof (data as SurverErrorResponse).code === 'string' ||
      (data as SurverErrorResponse).details !== undefined)
  )
}

/**
 * HTTP 상태 코드별 기본 에러 메시지
 */
function getDefaultErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return '잘못된 요청입니다.'
    case 401:
      return '인증이 필요합니다.'
    case 403:
      return '접근 권한이 없습니다.'
    case 404:
      return '요청한 리소스를 찾을 수 없습니다.'
    case 409:
      return '리소스 충돌이 발생했습니다.'
    case 422:
      return '입력값을 확인해주세요.'
    case 429:
      return '너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해주세요.'
    case 500:
      return '서버 오류가 발생했습니다.'
    case 502:
      return '게이트웨이 오류가 발생했습니다.'
    case 503:
      return '서비스를 일시적으로 사용할 수 없습니다.'
    case 504:
      return '게이트웨이 시간 초과가 발생했습니다.'
    default:
      if (status >= 500) {
        return '서버 오류가 발생했습니다.'
      }
      if (status >= 400) {
        return '요청 처리 중 오류가 발생했습니다.'
      }
      return '알 수 없는 오류가 발생했습니다.'
  }
}
