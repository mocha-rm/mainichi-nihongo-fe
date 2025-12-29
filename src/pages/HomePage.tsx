import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
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

  // Glass Mixin
  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '24px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
  };

  // 구독자 수 조회
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
      const message = await subscribe(formData.email)
      setAlert({
        type: 'success',
        message: message
      })
      setFormData({ email: '' })
      await fetchSubscribers()
    } catch (error) {
      setAlert({
        type: 'error',
        message: error instanceof Error ? error.message : '구독 중 오류가 발생했습니다.'
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ email: e.target.value })
  }

  const [activeTab, setActiveTab] = useState('words')

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
  }

  const featureCardStyle = {
    ...glassStyle,
    padding: '30px',
    textAlign: 'center' as const,
    color: '#2d3436',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  }

  return (
    <>
      <Header
        title="마이니치 니홍고"
        subtitle="매일 만나는 일본어"
        showTags={true}
      />

      <div className="main-content">
        <Alert alert={alert} onClose={() => setAlert(null)} />

        {/* 소개 섹션 */}
        <div className="intro-section text-center mb-30">
          <h2 style={{
            fontSize: '3rem',
            marginBottom: '20px',
            fontFamily: "'Gaegu', cursive",
            background: 'linear-gradient(120deg, #6c5ce7, #a29bfe)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            일본어 학습의 새로운 경험
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#636e72' }}>
            매일 아침, 여러분의 이메일로 전해지는 특별한 일본어 레슨
          </p>
          <p style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#b2bec3' }}>
            단순한 암기가 아닌, 살아있는 일본 문화와 함께하는 진짜 일본어를 만나보세요
          </p>
        </div>

        {/* 특징 섹션 */}
        <div className="features" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          margin: '60px 0'
        }}>
          {[
            { icon: '📅', title: '매일 새로운 콘텐츠', desc: '매일 다른 주제의 흥미로운 콘텐츠를 제공합니다.' },
            { icon: '🏛️', title: '문화와 함께', desc: '언어뿐만 아니라 일본의 문화와 관습도 배웁니다.' },
            { icon: '🗣️', title: '실전 표현', desc: '교과서에 없는, 실제 원어민이 쓰는 표현.' },
            { icon: '📍', title: '지역별 방언', desc: '오사카, 교토 등 다양한 지역 방언 탐구.' }
          ].map((feature, idx) => (
            <div key={idx} className="feature" style={featureCardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px 0 rgba(31, 38, 135, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.07)';
              }}
            >
              <h3 style={{ fontFamily: 'Gaegu', fontSize: '1.5rem', marginBottom: '15px', color: '#2d3436' }}>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '10px' }}>{feature.icon}</span>
                {feature.title}
              </h3>
              <p style={{ fontSize: '1rem', opacity: 0.8, lineHeight: 1.6, color: '#636e72' }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 구독 폼 - Glassmorphism */}
        <div className="subscription-form" style={{
          ...glassStyle,
          background: 'rgba(255, 255, 255, 0.35)',
          padding: '50px',
          textAlign: 'center',
          margin: '50px 0'
        }}>
          <h3 style={{ fontFamily: 'Gaegu', fontSize: '2.5rem', marginBottom: '20px', color: '#2d3436' }}>
            🎯 지금 바로 시작하세요!
          </h3>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px', color: '#636e72' }}>무료로 매일 아침 새로운 일본어를 받아보세요.</p>

          <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div className="form-group" style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <input
                type="email"
                name="email"
                placeholder="이메일 주소를 입력하세요"
                required
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  padding: '15px 25px',
                  borderRadius: '50px',
                  border: '1px solid rgba(255,255,255,0.6)',
                  background: 'rgba(255,255,255,0.8)',
                  fontSize: '1rem',
                  flex: 1,
                  outline: 'none',
                  boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)'
                }}
              />
              <button type="submit"
                style={{
                  padding: '15px 30px',
                  borderRadius: '50px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 5px 15px rgba(108, 92, 231, 0.4)',
                  transition: 'all 0.3s',
                  minWidth: '100px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                구독하기
              </button>
            </div>
          </form>

          <div className="stats" style={{
            marginTop: '30px',
            color: '#636e72'
          }}>
            <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 500 }}>
              🌟 현재 <strong>{isLoadingSubscribers ? '...' : subscriberCount}</strong>명이 함께 학습하고 있습니다!
            </p>
          </div>
        </div>

        {/* 샘플 콘텐츠 미리보기 - Glassmorphism */}
        <div style={{ ...glassStyle, padding: '40px', marginTop: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h3 style={{ color: '#2d3436', margin: 0, fontSize: '1.8rem', fontFamily: 'Gaegu' }}>📖 콘텐츠 미리보기</h3>
            <button
              onClick={() => navigate('/contents')}
              style={{
                padding: '10px 25px',
                borderRadius: '30px',
                border: '1px solid rgba(108, 92, 231, 0.3)',
                background: 'rgba(108, 92, 231, 0.1)',
                color: '#6c5ce7',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(108, 92, 231, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(108, 92, 231, 0.1)'}
            >
              전체 보기 &rarr;
            </button>
          </div>

          {/* 콘텐츠 탭 메뉴 */}
          <div className="content-tabs" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '35px',
            flexWrap: 'wrap'
          }}>
            {[['words', '핵심 단어'], ['conversation', '실전 회화'], ['culture', '일본 문화'], ['dialect', '방언 탐방']].map(([key, label]) => (
              <button
                key={key}
                onClick={() => handleTabClick(key)}
                style={{
                  padding: '10px 25px',
                  borderRadius: '30px',
                  border: 'none',
                  background: activeTab === key ? 'white' : 'rgba(255,255,255,0.4)',
                  color: activeTab === key ? '#6c5ce7' : '#636e72',
                  fontWeight: activeTab === key ? 700 : 500,
                  cursor: 'pointer',
                  boxShadow: activeTab === key ? '0 5px 15px rgba(0,0,0,0.05)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* 탭 컨텐츠 영역 */}
          <div style={{ background: 'rgba(255,255,255,0.6)', borderRadius: '20px', padding: '30px', border: '1px solid rgba(255,255,255,0.4)' }}>
            {activeTab === 'words' && (
              <div>
                <h4 style={{ color: '#2d3436', marginBottom: '15px' }}>📝 오늘의 핵심 단어</h4>
                <JapaneseText text="一期一会 (いちごいちえ)" size="large" />
                <p style={{ color: '#636e72', marginTop: '10px' }}>일생에 한 번뿐인 만남; 이 순간은 다시 오지 않으니 소중히 하라는 뜻.</p>
              </div>
            )}
            {activeTab === 'conversation' && (
              <div>
                <h4 style={{ color: '#2d3436', marginBottom: '15px' }}>💬 바로 써먹는 회화</h4>
                <JapaneseText text="おつかれさま。また明日！" size="large" />
                <p style={{ color: '#636e72', marginTop: '10px' }}>수고하셨어요. 내일 봐요!</p>
              </div>
            )}
            {activeTab === 'culture' && (
              <div>
                <h4 style={{ color: '#2d3436', marginBottom: '15px' }}>🎭 알쓸신잡 일본 문화</h4>
                <p style={{ color: '#636e72', lineHeight: 1.6 }}>
                  '오츠카레사마'는 일본 직장 예절의 핵심으로, 상대방의 노고를 인정하고 존중하는 의미를 담고 있습니다.
                </p>
              </div>
            )}
            {activeTab === 'dialect' && (
              <div>
                <h4 style={{ color: '#2d3436', marginBottom: '15px' }}>🗾 오사카 방언</h4>
                <JapaneseText text="おつかれやん (Otsukarey-an)" size="large" />
                <p style={{ color: '#636e72', marginTop: '10px' }}>표준어: おつかれさま (수고했어)</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default HomePage
