import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type Method,
} from 'axios'
import type { TokenStorage } from './tokenManager'
import type {
  AxiosErrorHandler,
  RequestExecutor,
  RetryableRequestConfig,
} from '@/types/ApiTree'
import { LOGIN_PAGE_URL } from './api'
import { refreshAccessToken } from './refreshAccessToken'

interface HttpClientConfig {
  baseURL: string
  timeout?: number
  tokenStorage: TokenStorage
  onError?: (error: AxiosError) => void
}

const NO_AUTH_URLS_SET = new Set<string>([
  '/api/v1/auth/refresh',
  '/api/v1/lectures/categories',
  // '/api/v1/lectures' GET 의 경우 정확히 일치할때만 패스 되도록 따로 지정이 필요함
  // (로그인 전에 강의만 살펴보는 경우) => 실제로 지원하는 기능인지 확인 필요

  // (스웨거) NotificationTypeEnum이 제공 되나, 추후에 타입만 따로 받아올 가능성 있음
  // 로그인전에 타입만 따로 받아오기
  //    => ux 증진(ui에 표시되는 속도 향상)
  //    => 불필요한 데이터 통신 비용 증가
])

/**
 * 토큰 삽입과 요청만 처리
 * 에러는 핸들러로 위임
 */
export class HttpClient {
  private client: AxiosInstance
  private tokenStorage: TokenStorage
  private onError?: AxiosErrorHandler

  private refreshPromise: Promise<string | null> | null = null

  constructor(config: HttpClientConfig) {
    this.tokenStorage = config.tokenStorage
    this.onError = config.onError

    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 30000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    // 요청 인터셉터 - 토큰 자동 삽입
    this.client.interceptors.request.use(
      (config) => {
        // NO_AUTH_URLS_SET에 포함된 url요청은 인증회피
        const url = config.url || ''
        const isNoAuth = NO_AUTH_URLS_SET.has(url)
        if (isNoAuth) return config

        const token = this.tokenStorage.getAccessToken()

        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // 응답 인터셉터 - 에러 처리
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as RetryableRequestConfig
        const status = error.response?.status

        // 401 코드 → 토큰 만료로 간주
        if (status === 401 && !originalRequest?._retry) {
          originalRequest._retry = true

          try {
            // refresh 요청 (refresh용 axios 인스턴스 따로 사용 > 무한루프 방지)
            if (!this.refreshPromise) {
              this.refreshPromise = refreshAccessToken()
            }
            const newToken = await this.refreshPromise
            if (!newToken) throw new Error('Refresh token returned null')

            this.tokenStorage.setAccessToken(newToken)
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`
            }
            return this.client(originalRequest)
          } catch (refreshError) {
            // 리프래쉬 에러가 있다면 에러 핸들러로 던지기
            if (this.onError) await this.onError(refreshError as AxiosError)
            this.tokenStorage.clearTokens()
            window.location.href = LOGIN_PAGE_URL
            return Promise.reject(refreshError)
          } finally {
            this.refreshPromise = null
          }
        }

        if (this.onError) await this.onError(error)
        return Promise.reject(error)
      }
    )
  }

  /**
   * 통합 요청 핸들러 - createApiTree와 함께 사용
   */
  public async request<Req = void, Res = unknown>(
    url: string,
    method: Method,
    data?: Req,
    // 'url' | 'method' | 'data' 을 제외한 나머지는 config로 간주
    config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>
  ): Promise<Res> {
    const upperMethod = method.toUpperCase()
    const requestConfig: AxiosRequestConfig = {
      url,
      method,
      ...config,
    }

    if (paramsMethodSet.has(upperMethod)) {
      requestConfig.params = data
    } else {
      requestConfig.data = data
    }

    const res: AxiosResponse<Res> =
      await this.client.request<Res>(requestConfig)
    return res.data
  }

  /**
   * RequestExecutor 타입으로 바인딩된 메서드 반환
   * - createApiTree 주입용
   */
  public getRequestExecutor(): RequestExecutor {
    return this.request.bind(this) as RequestExecutor
  }
}

const paramsMethodSet = new Set(['GET', 'DELETE', 'HEAD'])
