import type { AxiosError } from 'axios'
import { HttpClient } from './httpClient'
import type { TokenStorage } from './tokenManager'
import { WebSocketClient, type WebSocketClientConfig } from './wsClient'

export class ApiClientFactory {
  private tokenStorage: TokenStorage

  constructor(tokenStorage: TokenStorage) {
    this.tokenStorage = tokenStorage
  }

  // HTTP 클라이언트 생성
  public createHttpClient(
    baseURL: string,
    onError?: (error: AxiosError) => void
  ): HttpClient {
    return new HttpClient({
      baseURL,
      tokenStorage: this.tokenStorage,
      onError,
    })
  }

  // WebSocket 클라이언트 생성
  public createWebSocketClient(
    url: string,
    callbacks?: Omit<WebSocketClientConfig, 'url' | 'tokenStorage'>
  ): WebSocketClient {
    return new WebSocketClient({
      url,
      tokenManager: this.tokenStorage,
      ...callbacks,
    })
  }
}
