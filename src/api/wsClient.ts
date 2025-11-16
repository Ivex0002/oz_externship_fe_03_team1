import type { TokenStorage } from './tokenManager'
import { LOGIN_PAGE_URL } from './api'
import { refreshAccessToken } from './refreshAccessToken'
import { storeChat } from '@/store/storeChat'

export interface WebSocketClientConfig {
  url: string
  tokenManager: TokenStorage
  reconnect?: boolean
  reconnectInterval?: number

  onOpen?: (event: Event) => void
  onMessage?: (event: MessageEvent) => void
  onError?: (event: Event) => void
  onClose?: (event: CloseEvent) => void
}

// TODO : toast 알림 로직 작성 필요
// TODO : 실제 로그인 페이지로 연결해야됨
export class WebSocketClient {
  private ws: WebSocket | null = null
  private config: WebSocketClientConfig
  private reconnectAttempts: number = 0
  private maxReconnectAttempts: number = 5
  private reconnectTimer: number | null = null
  private messageQueue: (string | ArrayBufferLike | Blob | ArrayBufferView)[] =
    []

  constructor(config: WebSocketClientConfig) {
    this.config = config
  }

  public async connect() {
    // this.log('config in connect', this.config)
    await this.initializeConnection()
  }

  private async initializeConnection() {
    this.clearPrev()

    const token = await this.prepareToken()
    const wsUrl = this.buildUrl(token)
    // this.log('wsUrl in initializeConnection', wsUrl)

    this.ws = new WebSocket(wsUrl)

    this.ws.onopen = (event) => {
      this.reconnectAttempts = 0
      // this.log('onopen', {
      //   url: wsUrl,
      //   readyState: this.ws?.readyState,
      //   timestamp: Date.now(),
      // })
      this.flushQueue()

      this.config.onOpen?.(event)
    }

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data)

      switch (data.type) {
        case 'chat.message':
          this.config.onMessage?.(event)
          break

        case 'online.users':
          // 온라인 사용자 업데이트
          storeChat.getState().setOnlineUsers(data.users)
          break

        default:
          this.log('Unknown WS event:', data)
      }
    }

    this.ws.onerror = (event) => {
      this.log('onerror', {
        event,
        readyState: this.ws?.readyState,
        timestamp: Date.now(),
      })
      this.config.onError?.(event)
    }

    this.ws.onclose = (event) => {
      this.config.onClose?.(event)
      this.handleClose(event)
    }
  }

  private clearPrev() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }

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

  private buildUrl(token: string | null): string {
    const separator = this.config.url.includes('?') ? '&' : '?'
    return token
      ? `${this.config.url}${separator}token=${token}`
      : this.config.url
  }

  private async prepareToken(): Promise<string | null> {
    let token = this.config.tokenManager.getAccessToken()

    if (!token) {
      const ok = await this.tryRefreshToken()
      if (!ok) return null
      token = this.config.tokenManager.getAccessToken()
    }

    return token
  }

  private handleClose(closeEvent: CloseEvent) {
    this.log('onclose', closeEvent)
    if (!this.config.reconnect) return
    if (this.reconnectAttempts >= this.maxReconnectAttempts) return

    this.reconnectAttempts++

    this.reconnectTimer = window.setTimeout(() => {
      this.connect()
    }, this.config.reconnectInterval ?? 3000)
  }

  private async tryRefreshToken(): Promise<boolean> {
    try {
      const newToken = await refreshAccessToken()
      if (newToken) {
        this.config.tokenManager.setAccessToken(newToken)
        return true
      }
      throw new Error()
    } catch {
      this.config.tokenManager.clearTokens()
      window.location.href = LOGIN_PAGE_URL
      return false
    }
  }

  public send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(data)
    } else {
      this.messageQueue.push(data)
    }
  }

  private flushQueue() {
    while (this.messageQueue.length > 0) {
      this.ws?.send(this.messageQueue.shift()!)
    }
  }

  public close(code?: number, reason?: string) {
    this.clearPrev()
    this.ws?.close(code, reason)
    this.ws = null
  }

  public isConnected() {
    return this.ws?.readyState === WebSocket.OPEN
  }

  private log(...args: any[]) {
    console.log('[WS]', ...args)
  }
}
