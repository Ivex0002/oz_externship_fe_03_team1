import type { TokenStorage } from './tokenManager'
import { LOGIN_PAGE_URL } from './api'
import { refreshAccessToken } from './refreshAccessToken'

export interface WebSocketClientConfig {
  url: string
  tokenStorage: TokenStorage
  onOpen?: (event: Event) => void
  onMessage?: (event: MessageEvent) => void
  onError?: (event: Event) => void
  onClose?: (event: CloseEvent) => void
  reconnect?: boolean
  reconnectInterval?: number
}

// TODO : toast 알림 로직 작성 필요
// TODO : 실제 로그인 페이지로 연결해야됨
export class WebSocketClient {
  private ws: WebSocket | null = null
  private url: string
  private tokenStorage: TokenStorage
  private config: WebSocketClientConfig
  private reconnectAttempts: number = 0
  private maxReconnectAttempts: number = 5
  private reconnectTimer: number | null = null

  constructor(config: WebSocketClientConfig) {
    this.url = config.url
    this.tokenStorage = config.tokenStorage
    this.config = config
  }

  public async connect(): Promise<void> {
    this.clearPrev()

    let token = this.tokenStorage.getAccessToken()

    // 토큰 없으면 리프레시
    if (!token) {
      const success = await this.tryRefreshToken()
      if (!success) return
      token = this.tokenStorage.getAccessToken()
    }

    const wsUrl = token ? `${this.url}?token=${token}` : this.url

    this.ws = new WebSocket(wsUrl)

    this.ws.onopen = (event) => {
      this.reconnectAttempts = 0
      if (this.config.onOpen) {
        this.config.onOpen(event)
      }
    }

    this.ws.onmessage = (event) => {
      if (this.config.onMessage) {
        this.config.onMessage(event)
      }
    }

    this.ws.onerror = (event) => {
      if (this.config.onError) {
        this.config.onError(event)
      }
    }

    this.ws.onclose = async (event) => {
      if (this.config.onClose) {
        this.config.onClose(event)
      }

      // 토큰 만료 감지 (서버에서 code 4001로 보낸다고 가정)
      // TODO:실제 서버 코드로 변경 해야함
      // 명세서에 없음
      if (event.code === 4001) {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
          this.tokenStorage.clearTokens()
          window.location.href = LOGIN_PAGE_URL
          return
        }
        const success = await this.tryRefreshToken()
        if (success) {
          await this.connect() // 성공 시 재연결
          return
        }
        return
      }

      if (
        this.config.reconnect &&
        this.reconnectAttempts < this.maxReconnectAttempts
      ) {
        this.reconnectAttempts++
        const interval = this.config.reconnectInterval || 3000

        this.reconnectTimer = window.setTimeout(() => {
          // console.log(
          //   `WebSocket 재연결 시도 ${this.reconnectAttempts}/${this.maxReconnectAttempts}`
          // )
          // toast 연결 필요
          this.connect()
        }, interval)
      }
    }
  }

  private clearPrev() {
    if (this.ws) {
      this.ws.onopen = null
      this.ws.onmessage = null
      this.ws.onerror = null
      this.ws.onclose = null
      if (
        this.ws.readyState === WebSocket.OPEN ||
        this.ws.readyState === WebSocket.CONNECTING
      ) {
        this.ws.close()
      }
    }
  }

  private async tryRefreshToken(): Promise<boolean> {
    try {
      const newToken = await refreshAccessToken()
      if (newToken) {
        this.tokenStorage.setAccessToken(newToken)
        return true
      }
      throw new Error('Refresh failed')
    } catch {
      this.tokenStorage.clearTokens()
      window.location.href = LOGIN_PAGE_URL
      return false
    }
  }

  public send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data)
    } else {
      // console.error('WebSocket이 연결되지 않았습니다.')
      // toast 연결 필요
      throw new Error(`WebSocket is not connected:${this.getReadyState()}`)
    }
  }

  public close(code?: number, reason?: string): void {
    if (this.reconnectTimer) {
      window.clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }

    if (this.ws) {
      this.ws.close(code, reason)
      this.ws = null
    }
  }

  /**
   * 0: CONNECTING
   * 1: OPEN
   * 2: CLOSING
   * 3: CLOSED
   * null: 아직 생성되지 않음
   */
  public getReadyState(): number | null {
    return this.ws ? this.ws.readyState : null
  }

  public isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN
  }
}
