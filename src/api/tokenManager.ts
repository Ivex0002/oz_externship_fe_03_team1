export interface TokenStorage {
  getAccessToken: () => string | null
  getRefreshToken?: () => string | null
  setAccessToken: (token: string) => void
  clearTokens: () => void
}

export class LocalStorageTokenStorage implements TokenStorage {
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken')
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken')
  }

  setAccessToken(token: string): void {
    localStorage.setItem('accessToken', token)
  }

  clearTokens(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }
}
