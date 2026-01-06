import React, { useState, useEffect } from 'react'
import Alert from '../components/Alert'
import { AlertMessage, SubscriptionFormData } from '../types'
import { unsubscribe, getSubscribers } from '../utils/subscribeApi'

const UnsubscribePage: React.FC = () => {
  const [alert, setAlert] = useState<AlertMessage | null>(null)
  const [formData, setFormData] = useState<SubscriptionFormData>({ email: '' })
  const [subscriberCount, setSubscriberCount] = useState<number>(0)
  const [isLoadingSubscribers, setIsLoadingSubscribers] = useState<boolean>(true)

  const fetchSubscribers = async () => {
    try {
      setIsLoadingSubscribers(true)
      const subscribers = await getSubscribers()
      setSubscriberCount(subscribers.length)
    } catch (error) {
      console.error('구독자 수 조회 실패:', error)
      setSubscriberCount(0)
    } finally {
      setIsLoadingSubscribers(false)
    }
  }

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
      <Alert alert={alert} onClose={() => setAlert(null)} />

      {/* Hero Section */}
      <section className="text-center" style={{ padding: '40px 0 30px 0' }}>
        <h2 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '10px' }}>
          🌸 구독 취소
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#636e72', marginBottom: '10px' }}>
          그동안 이용해 주셔서 감사합니다
        </p>
      </section>

      {/* 통합 카드 */}
      <div className="glass-panel" style={{ padding: '50px', maxWidth: '700px', margin: '0 auto' }}>

        {/* 구독 취소 폼 */}
        <div className="text-center" style={{ marginBottom: '40px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="email"
                name="email"
                placeholder="구독 취소할 이메일 주소를 입력하세요"
                required
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '15px 25px',
                  borderRadius: '50px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  outline: 'none',
                  background: 'white'
                }}
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%' }}
            >
              구독 취소하기
            </button>
          </form>

          {/* 구독자 수 표시 */}
          <div style={{ marginTop: '25px', paddingTop: '25px', borderTop: '1px solid rgba(108, 92, 231, 0.1)' }}>
            <p style={{
              margin: 0,
              fontSize: '0.95rem',
              color: '#636e72'
            }}>
              🌟 현재 <strong>{isLoadingSubscribers ? '...' : subscriberCount}</strong>명이 함께 학습하고 있어요!
            </p>
          </div>
        </div>

        {/* 구분선 */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(108, 92, 231, 0.2), transparent)',
          margin: '40px 0'
        }} />

        {/* 안내 메시지 */}
        <div style={{
          textAlign: 'center',
          background: 'rgba(108, 92, 231, 0.03)',
          borderRadius: '16px',
          padding: '30px'
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#2d3436' }}>
            💡 잠깐만요!
          </h3>
          <p style={{ color: '#636e72', lineHeight: 1.6, marginBottom: '10px' }}>
            구독을 취소하시면 더 이상 매일 아침 일본어 콘텐츠를 받아보실 수 없습니다.
          </p>
          <p style={{ color: '#636e72', lineHeight: 1.6, margin: 0 }}>
            언제든지 다시 구독하실 수 있으니, 필요하실 때 돌아와 주세요! 😊
          </p>
        </div>
      </div>
    </>
  )
}

export default UnsubscribePage
