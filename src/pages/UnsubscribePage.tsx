import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Alert from '../components/Alert'
import { AlertMessage, SubscriptionFormData } from '../types'

const UnsubscribePage: React.FC = () => {
  const [alert, setAlert] = useState<AlertMessage | null>(null)
  const [formData, setFormData] = useState<SubscriptionFormData>({ email: '' })
  const [subscriberCount] = useState(1250) // 실제로는 API에서 가져올 데이터

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setAlert({
          type: 'success',
          message: result.message || '구독이 취소되었습니다.'
        })
        setFormData({ email: '' })
      } else {
        setAlert({
          type: 'error',
          message: result.message || '구독 취소 중 오류가 발생했습니다.'
        })
      }
    } catch (error) {
      setAlert({
        type: 'error',
        message: '네트워크 오류가 발생했습니다.'
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
          <div className="form-group">
            <input 
              type="email" 
              name="email" 
              placeholder="구독 취소할 이메일 주소를 입력하세요" 
              required 
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn">구독 취소하기</button>
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
            🌟 현재 <strong>{subscriberCount}</strong>명이 함께 학습하고 있어요!
          </p>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default UnsubscribePage
