import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Alert from '../components/Alert'
import { AlertMessage, SubscriptionFormData } from '../types'
import { unsubscribe, getSubscribers } from '../utils/subscribeApi'

const UnsubscribePage: React.FC = () => {
  const [alert, setAlert] = useState<AlertMessage | null>(null)
  const [formData, setFormData] = useState<SubscriptionFormData>({ email: '' })
  const [subscriberCount, setSubscriberCount] = useState<number>(0)
  const [isLoadingSubscribers, setIsLoadingSubscribers] = useState<boolean>(true)

  // 구독자 수 조회
  const fetchSubscribers = async () => {
    try {
      setIsLoadingSubscribers(true)
      const subscribers = await getSubscribers()
      setSubscriberCount(subscribers.length)
    } catch (error) {
      console.error('구독자 수 조회 실패:', error)
      // 에러가 발생해도 기본값 0으로 설정
      setSubscriberCount(0)
    } finally {
      setIsLoadingSubscribers(false)
    }
  }

  // 컴포넌트 마운트 시 구독자 수 조회
  useEffect(() => {
    fetchSubscribers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email.trim()) {
      setAlert({
        type: 'error',
        message: '이메일 주소를 입력해주세요.'
      })
      return
    }
    
    try {
      const message = await unsubscribe(formData.email)
      setAlert({
        type: 'success',
        message: message
      })
      setFormData({ email: '' })
      // 구독취소 성공 후 구독자 수 갱신
      await fetchSubscribers()
    } catch (error) {
      setAlert({
        type: 'error',
        message: error instanceof Error ? error.message : '구독 취소 중 오류가 발생했습니다.'
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ email: e.target.value })
  }

  return (
    <>
      <Header 
        title="🌸 구독 취소"
        subtitle="그동안 이용해 주셔서 감사합니다"
      />

      <div className="main-content text-center">
        <Alert alert={alert} onClose={() => setAlert(null)} />

        <form onSubmit={handleSubmit} className="unsubscribe-form" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div className="form-group" style={{ display: 'block', marginBottom: '25px' }}>
            <input 
              type="email" 
              name="email" 
              placeholder="구독 취소할 이메일 주소를 입력하세요" 
              required 
              value={formData.email}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '15px 25px', border: '2px solid var(--primary-color)', borderRadius: '50px', fontSize: '16px', outline: 'none', transition: 'all 0.3s ease', background: 'white' }}
            />
          </div>
          <div className="form-group" style={{ display: 'block', marginBottom: '25px' }}>
            <button 
              type="submit" 
              className="btn" 
              style={{ width: '100%' }}
            >
              구독 취소하기
            </button>
          </div>
        </form>

        <div className="stats" style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '25px',
          borderRadius: '20px',
          textAlign: 'center',
          marginTop: '25px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
            <p style={{ 
              margin: 0, 
              fontSize: '20px', 
              fontWeight: 500, 
              fontFamily: 'Gaegu, cursive',
              color: 'var(--text-color)'
            }}>
              🌟 현재 <strong>{isLoadingSubscribers ? '...' : subscriberCount}</strong>명이 함께 학습하고 있어요!
            </p>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default UnsubscribePage
