import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type Method,
} from 'axios'
import type { TokenStorage } from './tokenManager'
import type {
  AxiosErrorHandler,
  RequestConfig,
  RequestExecutor,
  RetryableRequestConfig,
} from '@/types/ApiTree'

interface HttpClientConfig {
  baseURL: string
  timeout?: number
  tokenStorage: TokenStorage
  onError?: (error: AxiosError) => void
}

/**
 * 토큰 삽입과 요청만 처리
 * 에러는 핸들러로 위임
 */
export class HttpClient {
  private client: AxiosInstance
  private tokenStorage: TokenStorage
  private onError?: AxiosErrorHandler

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
            const newToken = await this.refreshAccessToken()
            if (newToken) {
              this.tokenStorage.setAccessToken(newToken)
              // 헤더 갱신 후 원래 요청 재시도
              originalRequest.headers.Authorization = `Bearer ${newToken}`
              return this.client(originalRequest)
            }
          } catch (refreshError) {
            // 리프래쉬 에러가 있다면 에러 핸들러로 던지기
            if (this.onError) await this.onError(refreshError as AxiosError)
            this.tokenStorage.clearTokens()
            window.location.href = '/login' // 실제 로그인 주소로 변경 해야됨
          }
        }

        if (this.onError) await this.onError(error)
        return Promise.reject(error)
      }
    )
  }

  private async refreshAccessToken(): Promise<string | null> {
    try {
      const refreshClient = axios.create({
        baseURL: this.client.defaults.baseURL,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      })
      const res = await refreshClient.post('/api/v1/auth/refresh')
      if (res.data?.accessToken) return res.data.accessToken
      return null
    } catch {
      return null
    }
  }

  /**
   * 통합 요청 핸들러 - createApiTree와 함께 사용
   */
  public async request<Req = void, Res = unknown>(
    url: string,
    method: Method,
    config?: RequestConfig<Req>
  ): Promise<Res> {
    const res: AxiosResponse<Res> = await this.client.request<Res>({
      url,
      method,
      ...config,
    })

    return res.data
  }

  /**
   * RequestExecutor 타입으로 바인딩된 메서드 반환
   * - createApiTree 주입용
   */
  public getRequestExecutor(): RequestExecutor {
    return this.request.bind(this)
  }
}
