import axios from 'axios'

// API 기본 URL
export const API_BASE_URL = 'http://localhost:8080'

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터 - JWT 토큰 자동 첨부
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    console.log(`API 요청: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('API 요청 에러:', error)
    return Promise.reject(error)
  }
)

// 응답 인터셉터 - 토큰 갱신 처리
api.interceptors.response.use(
  (response) => {
    console.log(`API 응답: ${response.status} ${response.config.url}`)
    return response
  },
  async (error) => {
    console.error('API 응답 에러:', error)

    const originalRequest = error.config

    // 401 에러이고 재시도하지 않은 요청인 경우 토큰 갱신 시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, { refreshToken })
          const { accessToken, refreshToken: newRefreshToken } = response.data

          localStorage.setItem('accessToken', accessToken)
          localStorage.setItem('refreshToken', newRefreshToken)

          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return api(originalRequest)
        } catch (refreshError) {
          // 리프레시 토큰도 만료된 경우 로그아웃 처리
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          window.location.href = '/login'
          return Promise.reject(refreshError)
        }
      }
    }

    // 네트워크 에러 처리
    if (!error.response) {
      throw new Error('네트워크 연결을 확인해주세요.')
    }

    // 서버 에러 처리
    const status = error.response.status
    const message = error.response.data?.message || error.response.data || '서버 오류가 발생했습니다.'

    if (status >= 500) {
      throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
    } else if (status >= 400) {
      throw new Error(message)
    }

    return Promise.reject(error)
  }
)

export default api
