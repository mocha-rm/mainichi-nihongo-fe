import React, { useState, useEffect } from 'react'
import Alert from '../components/Alert'
import JapaneseText from '../components/JapaneseText'
import { AlertMessage, SubscriptionFormData } from '../types'
import { subscribe, getSubscribers } from '../utils/subscribeApi'
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
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
      setAlert({ type: 'error', message: '이메일 주소를 입력해주세요.' })
      return
    }
    try {
      const message = await subscribe(formData.email)
      setAlert({ type: 'success', message: message })
      setFormData({ email: '' })
      await fetchSubscribers()
    } catch (error) {
      setAlert({ type: 'error', message: error instanceof Error ? error.message : '구독 중 오류가 발생했습니다.' })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ email: e.target.value })
  }

  const [activeTab, setActiveTab] = useState('words')
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
  }

  return (
    <>
      <Alert alert={alert} onClose={() => setAlert(null)} />

      {/* Hero Section */}
      <section className="text-center" style={{ padding: '40px 0 30px 0' }}>
        <h2 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>
          일본어 학습의 새로운 경험
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#636e72', marginBottom: '10px' }}>
          매일 아침, 살아있는 일본어와 문화를 이메일로 받아보세요.
        </p>
      </section>

      {/* 통합 카드 - 모든 콘텐츠를 하나의 카드에 담기 */}
      <div className="glass-panel" style={{ padding: '50px' }}>

        {/* Features Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '25px',
          marginBottom: '50px'
        }}>
          {[
            { icon: '📅', title: '매일 새로운 콘텐츠', desc: '매일 다른 주제의 흥미로운 콘텐츠를 제공합니다.' },
            { icon: '🏛️', title: '문화와 함께', desc: '언어뿐만 아니라 일본의 문화와 관습도 배웁니다.' },
            { icon: '🗣️', title: '실전 표현', desc: '교과서에 없는, 실제 원어민이 쓰는 표현.' },
            { icon: '📍', title: '지역별 방언', desc: '오사카, 교토 등 다양한 지역 방언 탐구.' }
          ].map((feature, idx) => (
            <div
              key={idx}
              style={{
                textAlign: 'center',
                padding: '25px',
                background: 'rgba(108, 92, 231, 0.03)',
                borderRadius: '16px',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '12px' }}>{feature.icon}</span>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#2d3436', fontWeight: 600 }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#636e72', lineHeight: 1.5, margin: 0 }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 구분선 */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(108, 92, 231, 0.2), transparent)',
          margin: '50px 0'
        }} />

        {/* 구독 폼 섹션 */}
        <div className="text-center" style={{ maxWidth: '600px', margin: '0 auto 50px auto' }}>
          <h3 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '15px' }}>
            🎯 지금 바로 시작하세요!
          </h3>
          <p style={{ fontSize: '1.1rem', color: '#636e72', marginBottom: '25px' }}>
            무료로 매일 아침 새로운 일본어를 받아보세요
          </p>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <input
                type="email"
                name="email"
                placeholder="이메일 주소를 입력하세요"
                required
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  flex: 1,
                  padding: '15px 25px',
                  borderRadius: '50px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  outline: 'none',
                  background: 'white'
                }}
              />
              <button type="submit" className="btn-primary">구독하기</button>
            </div>
          </form>
          <div style={{ color: '#636e72' }}>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>
              🌟 현재 <strong>{isLoadingSubscribers ? '...' : subscriberCount}</strong>명이 함께 학습하고 있습니다!
            </p>
          </div>
        </div>

        {/* 구분선 */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(108, 92, 231, 0.2), transparent)',
          margin: '50px 0'
        }} />

        {/* 미리보기 섹션 */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h3 className="text-gradient" style={{ margin: 0, fontSize: '2rem' }}>📖 콘텐츠 미리보기</h3>
            <button onClick={() => navigate('/contents')} className="btn-secondary">
              전체 보기 &rarr;
            </button>
          </div>

          {/* 콘텐츠 탭 메뉴 */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '30px',
            flexWrap: 'wrap'
          }}>
            {[['words', '핵심 단어'], ['conversation', '실전 회화'], ['culture', '일본 문화'], ['dialect', '방언 탐방']].map(([key, label]) => (
              <button
                key={key}
                onClick={() => handleTabClick(key)}
                className={activeTab === key ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '10px 20px' }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* 탭 컨텐츠 영역 */}
          <div style={{
            background: 'rgba(108, 92, 231, 0.03)',
            borderRadius: '16px',
            padding: '30px',
            border: '1px solid rgba(108, 92, 231, 0.1)'
          }}>
            {activeTab === 'words' && (
              <div>
                <h4 style={{ color: '#2d3436', marginBottom: '15px', fontSize: '1.2rem' }}>📝 오늘의 핵심 단어</h4>
                <JapaneseText text="一期一会 (いちごいちえ)" size="large" />
                <p style={{ color: '#636e72', marginTop: '10px', lineHeight: 1.6 }}>일생에 한 번뿐인 만남; 이 순간은 다시 오지 않으니 소중히 하라는 뜻.</p>
              </div>
            )}
            {activeTab === 'conversation' && (
              <div>
                <h4 style={{ color: '#2d3436', marginBottom: '15px', fontSize: '1.2rem' }}>💬 바로 써먹는 회화</h4>
                <JapaneseText text="おつかれさま。また明日！" size="large" />
                <p style={{ color: '#636e72', marginTop: '10px', lineHeight: 1.6 }}>수고하셨어요. 내일 봐요!</p>
              </div>
            )}
            {activeTab === 'culture' && (
              <div>
                <h4 style={{ color: '#2d3436', marginBottom: '15px', fontSize: '1.2rem' }}>🎭 알쓸신잡 일본 문화</h4>
                <p style={{ color: '#636e72', lineHeight: 1.6 }}>
                  '오츠카레사마'는 일본 직장 예절의 핵심으로, 상대방의 노고를 인정하고 존중하는 의미를 담고 있습니다.
                </p>
              </div>
            )}
            {activeTab === 'dialect' && (
              <div>
                <h4 style={{ color: '#2d3436', marginBottom: '15px', fontSize: '1.2rem' }}>🗾 오사카 방언</h4>
                <JapaneseText text="おつかれやん (Otsukarey-an)" size="large" />
                <p style={{ color: '#636e72', marginTop: '10px', lineHeight: 1.6 }}>표준어: おつかれさま (수고했어)</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
