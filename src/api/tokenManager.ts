export interface TokenStorage {
  getAccessToken(): string | null
  setAccessToken(token: string): void
  clearTokens(): void
}

export class TokenManager implements TokenStorage {
  // 메모리에만 저장 (XSS 공격 방지)
  private accessToken: string | null = null

  getAccessToken(): string | null {
    return this.accessToken
  }

  setAccessToken(token: string): void {
    this.accessToken = token
  }

  clearTokens(): void {
    this.accessToken = null
  }
}
