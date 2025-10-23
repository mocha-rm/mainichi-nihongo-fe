import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Alert from '../components/Alert'
import JapaneseText from '../components/JapaneseText'
import { AlertMessage, SubscriptionFormData } from '../types'

const HomePage: React.FC = () => {
  const [alert, setAlert] = useState<AlertMessage | null>(null)
  const [formData, setFormData] = useState<SubscriptionFormData>({ email: '' })
  const [subscriberCount] = useState(1250) // 실제로는 API에서 가져올 데이터

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/subscribe', {
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
          message: result.message || '구독이 완료되었습니다!'
        })
        setFormData({ email: '' })
      } else {
        setAlert({
          type: 'error',
          message: result.message || '구독 중 오류가 발생했습니다.'
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

  const [activeTab, setActiveTab] = useState('words')

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
  }

  return (
    <>
      <Header 
        title="🌸 마이니치 니홍고 🌸"
        subtitle="매일 새로운 일본어와 만나는 시간!"
        showTags={true}
      />

      <div className="main-content">
        <Alert alert={alert} onClose={() => setAlert(null)} />

        {/* 소개 섹션 */}
        <div className="intro-section text-center mb-30">
          <h2 style={{ 
            color: 'var(--primary-color)', 
            fontSize: '36px', 
            marginBottom: '20px',
            background: 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            일본어 학습의 새로운 경험
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '15px' }}>
            매일 아침, 여러분의 이메일로 전해지는 특별한 일본어 레슨
          </p>
          <p style={{ fontSize: '18px', marginBottom: '15px' }}>
            단순한 단어 암기가 아닌, 살아있는 일본 문화와 함께하는 진짜 일본어를 만나보세요
          </p>
          <p style={{ fontSize: '18px', marginBottom: '15px' }}>
            오사카 방언부터 도쿄 표준어까지, 다양한 일본어의 매력을 발견할 수 있습니다
          </p>
        </div>

        {/* 특징 섹션 */}
        <div className="features" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '25px', 
          margin: '40px 0' 
        }}>
          <div className="feature" style={{
            background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
            padding: '30px',
            borderRadius: '20px',
            textAlign: 'center',
            color: 'white',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{ fontFamily: 'Gaegu, cursive', fontSize: '24px', marginBottom: '15px' }}>
              📅 매일 새로운 콘텐츠
            </h3>
            <p style={{ fontSize: '16px', opacity: 0.9, lineHeight: 1.6 }}>
              매일 다른 주제로 구성된 흥미로운 일본어 학습 콘텐츠를 받아보세요
            </p>
          </div>
          
          <div className="feature" style={{
            background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
            padding: '30px',
            borderRadius: '20px',
            textAlign: 'center',
            color: 'white',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{ fontFamily: 'Gaegu, cursive', fontSize: '24px', marginBottom: '15px' }}>
              🏛️ 문화와 함께
            </h3>
            <p style={{ fontSize: '16px', opacity: 0.9, lineHeight: 1.6 }}>
              언어뿐만 아니라 일본의 문화, 관습, 생활까지 함께 배울 수 있어요
            </p>
          </div>
          
          <div className="feature" style={{
            background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
            padding: '30px',
            borderRadius: '20px',
            textAlign: 'center',
            color: 'white',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{ fontFamily: 'Gaegu, cursive', fontSize: '24px', marginBottom: '15px' }}>
              🗣️ 실용적인 표현
            </h3>
            <p style={{ fontSize: '16px', opacity: 0.9, lineHeight: 1.6 }}>
              교과서에서 배울 수 없는 실제 일본인들이 사용하는 생생한 표현들
            </p>
          </div>
          
          <div className="feature" style={{
            background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
            padding: '30px',
            borderRadius: '20px',
            textAlign: 'center',
            color: 'white',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{ fontFamily: 'Gaegu, cursive', fontSize: '24px', marginBottom: '15px' }}>
              📍 지역별 방언
            </h3>
            <p style={{ fontSize: '16px', opacity: 0.9, lineHeight: 1.6 }}>
              오사카, 교토, 히로시마 등 다양한 지역의 독특한 방언도 만나보세요
            </p>
          </div>
        </div>

        {/* 구독 폼 */}
        <div className="subscription-form" style={{
          background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
          padding: '40px',
          borderRadius: '30px',
          textAlign: 'center',
          color: 'white',
          margin: '30px 0',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h3 style={{ fontFamily: 'Gaegu, cursive', fontSize: '32px', marginBottom: '15px', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            🎯 지금 바로 시작하세요!
          </h3>
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>무료로 매일 아침 새로운 일본어를 받아보세요</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="email" 
                name="email" 
                placeholder="이메일 주소를 입력하세요" 
                required 
                value={formData.email}
                onChange={handleInputChange}
              />
              <button type="submit" className="btn">구독하기</button>
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
            <p style={{ margin: 0, fontSize: '20px', fontWeight: 500, fontFamily: 'Gaegu, cursive' }}>
              🌟 현재 <strong>{subscriberCount}</strong>명이 함께 학습하고 있어요!
            </p>
          </div>
        </div>

        {/* 샘플 콘텐츠 미리보기 */}
        <div style={{ background: '#f8f9fa', padding: '30px', borderRadius: '15px', marginTop: '30px' }}>
          <h3 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>📖 콘텐츠 미리보기</h3>
          
          {/* 콘텐츠 탭 메뉴 */}
          <div className="content-tabs" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '15px', 
            marginBottom: '25px', 
            flexWrap: 'wrap' 
          }}>
            <button 
              className={`content-tab ${activeTab === 'words' ? 'active' : ''}`}
              onClick={() => handleTabClick('words')}
            >
              📝 핵심 단어
            </button>
            <button 
              className={`content-tab ${activeTab === 'conversation' ? 'active' : ''}`}
              onClick={() => handleTabClick('conversation')}
            >
              💬 실전 회화
            </button>
            <button 
              className={`content-tab ${activeTab === 'culture' ? 'active' : ''}`}
              onClick={() => handleTabClick('culture')}
            >
              🎭 일본 문화
            </button>
            <button 
              className={`content-tab ${activeTab === 'dialect' ? 'active' : ''}`}
              onClick={() => handleTabClick('dialect')}
            >
              🗾 방언 탐방
            </button>
          </div>

          {/* 핵심 단어 섹션 */}
          {activeTab === 'words' && (
            <div className="content-section active fade-in">
            <div style={{ background: '#f8f9fa', border: '2px solid #0f3460', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ color: '#0f3460', margin: '0 0 15px 0', display: 'flex', alignItems: 'center' }}>
                <span style={{ 
                  background: '#0f3460', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: '25px', 
                  height: '25px', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginRight: '10px', 
                  fontSize: '14px' 
                }}>📝</span>
                오늘의 핵심 단어
              </h3>
              <div style={{ display: 'grid', gap: '15px' }}>
                <div className="card">
                  <strong className="japanese-text">
                    <JapaneseText text="一期一会 (いちごいちえ)" size="large" />
                  </strong>
                  <div style={{ color: '#666', fontSize: '16px', marginBottom: '10px', fontStyle: 'italic' }}>
                    이치고이치에
                  </div>
                  <div style={{ color: 'var(--accent-color)', fontWeight: 500, fontSize: '18px', marginBottom: '15px' }}>
                    일생에 한 번뿐인 만남
                  </div>
                  <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '2px solid #eee', fontSize: '16px', color: '#666', lineHeight: 1.6 }}>
                    일본 다도(茶道)에서 유래한 말로, 모든 만남을 소중히 여기는 마음을 담고 있어요.
                  </div>
                </div>
                
                <div className="card">
                  <strong className="japanese-text">
                    <JapaneseText text="木漏れ日 (こもれび)" size="large" />
                  </strong>
                  <div style={{ color: '#666', fontSize: '16px', marginBottom: '10px', fontStyle: 'italic' }}>
                    코모레비
                  </div>
                  <div style={{ color: 'var(--accent-color)', fontWeight: 500, fontSize: '18px', marginBottom: '15px' }}>
                    나뭇잎 사이로 비치는 햇살
                  </div>
                  <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '2px solid #eee', fontSize: '16px', color: '#666', lineHeight: 1.6 }}>
                    일본의 아름다운 자연을 표현하는 대표적인 단어 중 하나예요.
                  </div>
                </div>
              </div>
            </div>
            </div>
          )}

          {/* 실전 회화 섹션 */}
          {activeTab === 'conversation' && (
            <div className="content-section active fade-in">
            <div style={{ background: '#f0f8ff', border: '2px solid #4a90e2', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ color: '#4a90e2', margin: '0 0 15px 0', display: 'flex', alignItems: 'center' }}>
                <span style={{ 
                  background: '#4a90e2', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: '25px', 
                  height: '25px', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginRight: '10px', 
                  fontSize: '14px' 
                }}>💬</span>
                바로 써먹는 실전 회화
              </h3>
              <div style={{ background: 'white', padding: '15px', borderRadius: '8px', marginBottom: '10px', borderLeft: '4px solid #4a90e2' }}>
                <p style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#333' }}>
                  <strong>상황:</strong> 퇴근 시간, 동료와 헤어질 때
                </p>
                <p style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#2c3e50' }}>
                  <strong>일본어:</strong> <JapaneseText text="おつかれさま。また明日！" size="large" />
                </p>
                <p style={{ margin: '0 0 5px 0', fontStyle: 'italic', color: '#7f8c8d' }}>
                  <strong>발음:</strong> Otsukaresama. Mata ashita!
                </p>
                <p style={{ margin: 0, color: '#e74c3c', fontWeight: 500 }}>
                  <strong>한국어:</strong> 수고하셨어요. 내일 봐요!
                </p>
              </div>
            </div>
            </div>
          )}

          {/* 일본 문화 섹션 */}
          {activeTab === 'culture' && (
            <div className="content-section active fade-in">
            <div style={{ background: '#f0fff4', border: '2px solid #52c41a', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ color: '#52c41a', margin: '0 0 15px 0', display: 'flex', alignItems: 'center' }}>
                <span style={{ 
                  background: '#52c41a', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: '25px', 
                  height: '25px', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginRight: '10px', 
                  fontSize: '14px' 
                }}>🎭</span>
                오늘의 일본 문화 TMI
              </h3>
              <div style={{ background: 'white', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #52c41a' }}>
                <p style={{ margin: 0, lineHeight: 1.6, color: '#333' }}>
                  'おつかれさま'는 단순한 인사말이 아닌, 일본 직장 문화의 핵심을 보여주는 표현입니다. 
                  상대방의 노력과 수고를 인정하고 존중하는 마음을 담고 있어요. 
                  특히 일본에서는 퇴근할 때 이 말을 하지 않으면 예의가 없다고 여겨질 정도로 중요한 표현이랍니다.
                </p>
              </div>
            </div>
            </div>
          )}

          {/* 방언 탐방 섹션 */}
          {activeTab === 'dialect' && (
            <div className="content-section active fade-in">
            <div style={{ background: '#fff0f6', border: '2px solid #eb2f96', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ color: '#eb2f96', margin: '0 0 15px 0', display: 'flex', alignItems: 'center' }}>
                <span style={{ 
                  background: '#eb2f96', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: '25px', 
                  height: '25px', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginRight: '10px', 
                  fontSize: '14px' 
                }}>🗾</span>
                오늘의 방언 탐방
              </h3>
              <div style={{ background: 'white', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #eb2f96' }}>
                <p style={{ margin: '0 0 8px 0', color: '#eb2f96', fontWeight: 600 }}>🏮 지역: 오사카</p>
                <p style={{ margin: '0 0 5px 0', fontSize: '16px' }}>
                  <strong>방언:</strong> <JapaneseText text="おつかれやん (Otsukarey-an)" size="large" />
                </p>
                <p style={{ margin: '0 0 5px 0', color: '#666' }}>
                  <strong>표준어:</strong> おつかれさま (Otsukaresama)
                </p>
                <p style={{ margin: 0, color: '#333' }}>
                  <strong>의미:</strong> 수고하셨어요 (오사카식)
                </p>
              </div>
            </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default HomePage
