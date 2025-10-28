export interface TokenStorage {
  getAccessToken(): string | null
  setAccessToken(token: string): void
  clearTokens(): void
}

export class TokenManager implements TokenStorage {
  private accessTokenKey = 'accessToken'

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey)
  }

  setAccessToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token)
  }

  clearTokens(): void {
    localStorage.removeItem(this.accessTokenKey)
  }
}
