import axios from 'axios'

// axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    console.log(`API 요청: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('API 요청 에러:', error)
    return Promise.reject(error)
  }
)

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    console.log(`API 응답: ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error('API 응답 에러:', error)
    
    // 네트워크 에러 처리
    if (!error.response) {
      throw new Error('네트워크 연결을 확인해주세요.')
    }
    
    // 서버 에러 처리
    const status = error.response.status
    const message = error.response.data || '서버 오류가 발생했습니다.'
    
    if (status >= 500) {
      throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
    } else if (status >= 400) {
      throw new Error(message)
    }
    
    return Promise.reject(error)
  }
)

export default api
