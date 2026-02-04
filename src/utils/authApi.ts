import api from './api'

// 토큰 저장 키
const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

// 토큰 저장/조회/삭제
export const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

// 사용자 정보 타입
export interface User {
  id: number
  email: string
  name: string
  profileImage: string | null
  subscriptionTier: 'FREE' | 'PREMIUM'
}

// 토큰 갱신
export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    throw new Error('No refresh token')
  }

  const response = await api.post('/api/auth/refresh', { refreshToken })
  const { accessToken, refreshToken: newRefreshToken } = response.data
  saveTokens(accessToken, newRefreshToken)
  return accessToken
}

// 사용자 정보 조회
export const fetchUserInfo = async (): Promise<User> => {
  const response = await api.get('/api/auth/me')
  return response.data
}

// 로그아웃
export const logout = async (): Promise<void> => {
  try {
    await api.post('/api/auth/logout')
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    clearTokens()
  }
}

// OAuth2 로그인 URL 생성
const API_BASE_URL = 'http://localhost:8080'

export const getGoogleLoginUrl = (): string => {
  return `${API_BASE_URL}/oauth2/authorization/google`
}

export const getKakaoLoginUrl = (): string => {
  return `${API_BASE_URL}/oauth2/authorization/kakao`
}
