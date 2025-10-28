import type { TokenStorage } from './tokenManager'

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

export class WebSocketClient {
  private ws: WebSocket | null = null
  private url: string
  private tokenStorage: TokenStorage
  private config: WebSocketClientConfig
  private reconnectAttempts: number = 0
  private maxReconnectAttempts: number = 5
  private reconnectTimer: NodeJS.Timeout | null = null

  constructor(config: WebSocketClientConfig) {
    this.url = config.url
    this.tokenStorage = config.tokenStorage
    this.config = config
  }

  public connect(): void {
    const token = this.tokenStorage.getAccessToken()

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

    this.ws.onclose = (event) => {
      if (this.config.onClose) {
        this.config.onClose(event)
      }

      if (
        this.config.reconnect &&
        this.reconnectAttempts < this.maxReconnectAttempts
      ) {
        this.reconnectAttempts++
        const interval = this.config.reconnectInterval || 3000

        this.reconnectTimer = setTimeout(() => {
          // console.log(
          //   `WebSocket 재연결 시도 ${this.reconnectAttempts}/${this.maxReconnectAttempts}`
          // )
          // toast 연결 필요
          this.connect()
        }, interval)
      }
    }
  }

  public send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data)
    } else {
      // console.error('WebSocket이 연결되지 않았습니다.')
      // toast 연결 필요
    }
  }

  public close(code?: number, reason?: string): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }

    if (this.ws) {
      this.ws.close(code, reason)
      this.ws = null
    }
  }

  public getReadyState(): number | null {
    return this.ws ? this.ws.readyState : null
  }

  public isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN
  }
}
