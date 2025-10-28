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
} from '@/types/ApiTree'

interface HttpClientConfig {
  baseURL: string
  timeout?: number
  tokenStorage: TokenStorage
  onError?: (error: AxiosError) => void
}

/**
 * 토큰 처리와 에러 핸들링만 지원
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
        if (this.onError) {
          await this.onError(error)
        }
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
