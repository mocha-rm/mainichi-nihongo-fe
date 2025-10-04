import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import JapaneseText from '../components/JapaneseText'
import { LearningContent } from '../types'

const LearningPage: React.FC = () => {
  const { date } = useParams<{ date?: string }>()
  const [content, setContent] = useState<LearningContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 실제로는 API에서 데이터를 가져올 예정
    // 현재는 샘플 데이터로 구현
    const sampleContent: LearningContent = {
      date: date || '2025년 01월 15일',
      level: 'N3',
      topic: '인사말',
      words: [
        {
          japanese: 'おはようございます',
          pronunciation: '오하요우고자이마스',
          meaning: '좋은 아침입니다 (정중한 표현)',
          example: '회사에서 상사에게 인사할 때 사용하는 정중한 표현입니다.'
        },
        {
          japanese: 'こんにちは',
          pronunciation: '콘니치와',
          meaning: '안녕하세요 (낮 인사)',
          example: '오후 시간대에 만나는 사람에게 하는 인사말입니다.'
        }
      ],
      conversations: [
        {
          situation: '직장에서 동료와 아침 인사',
          japanese: 'おはようございます。今日もよろしくお願いします。',
          pronunciation: '오하요우고자이마스。쿄우모요로시쿠오네가이시마스。',
          korean: '좋은 아침입니다. 오늘도 잘 부탁드립니다.'
        }
      ],
      culture: {
        title: '일본의 인사 문화',
        content: '일본에서는 인사할 때 반드시 목례를 하는 것이 중요합니다. 특히 직장에서는 상하 관계에 따라 인사말의 정중함이 달라집니다.'
      },
      dialects: [
        {
          region: '오사카',
          dialect: 'おはようさん',
          standard: 'おはようございます',
          meaning: '좋은 아침입니다 (오사카식)'
        }
      ]
    }

    setTimeout(() => {
      setContent(sampleContent)
      setLoading(false)
    }, 500)
  }, [date])

  if (loading) {
    return (
      <div className="container">
        <div className="main-content text-center">
          <p>로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="container">
        <div className="main-content text-center">
          <p>콘텐츠를 찾을 수 없습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header 
        title="🌸 오늘의 일본어 🌸"
        subtitle="매일 새로운 일본어와 만나는 시간!"
        date={content.date}
        level={content.level}
        topic={content.topic}
        showContentInfo={true}
      />

      <div className="main-content">
        {/* 핵심 단어 섹션 */}
        {content.words.length > 0 && (
          <div className="content-section mb-30">
            <div className="section-header" style={{
              background: 'linear-gradient(45deg, #ff6b6b, #ffa726)',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
              padding: '15px 20px',
              borderRadius: '15px',
              color: 'white',
              fontWeight: 600,
              fontSize: '18px'
            }}>
              <div className="section-icon" style={{
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px',
                fontSize: '20px'
              }}>
                📝
              </div>
              오늘의 핵심 단어
            </div>
            
            {content.words.map((word, index) => (
              <div key={index} className="card mb-20">
                <strong className="japanese-text">
                  <JapaneseText text={word.japanese} size="large" />
                </strong>
                <div className="pronunciation" style={{ 
                  color: '#666', 
                  fontSize: '16px', 
                  marginBottom: '10px', 
                  fontStyle: 'italic' 
                }}>
                  {word.pronunciation}
                </div>
                <div className="meaning" style={{ 
                  color: 'var(--accent-color)', 
                  fontWeight: 500, 
                  fontSize: '18px', 
                  marginBottom: '15px' 
                }}>
                  {word.meaning}
                </div>
                {word.example && (
                  <div className="example" style={{ 
                    marginTop: '15px', 
                    paddingTop: '15px', 
                    borderTop: '2px solid #eee', 
                    fontSize: '16px', 
                    color: '#666', 
                    lineHeight: 1.6 
                  }}>
                    {word.example}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 실전 회화 섹션 */}
        {content.conversations.length > 0 && (
          <div className="content-section mb-30">
            <div className="section-header" style={{
              background: 'linear-gradient(45deg, #4a90e2, #7b68ee)',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
              padding: '15px 20px',
              borderRadius: '15px',
              color: 'white',
              fontWeight: 600,
              fontSize: '18px'
            }}>
              <div className="section-icon" style={{
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px',
                fontSize: '20px'
              }}>
                💬
              </div>
              바로 써먹는 실전 회화
            </div>
            
            {content.conversations.map((conversation, index) => (
              <div key={index} className="conversation-item" style={{
                background: 'white',
                padding: '20px',
                borderRadius: '15px',
                marginBottom: '15px',
                borderLeft: '4px solid #4a90e2',
                boxShadow: 'var(--card-shadow)'
              }}>
                <div className="conversation-situation" style={{ 
                  color: '#333', 
                  fontSize: '14px', 
                  marginBottom: '10px', 
                  fontWeight: 500 
                }}>
                  {conversation.situation}
                </div>
                <p style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#2c3e50' }}>
                  <strong>일본어:</strong> <JapaneseText text={conversation.japanese} size="large" />
                </p>
                <p style={{ margin: '0 0 5px 0', fontStyle: 'italic', color: '#7f8c8d' }}>
                  <strong>발음:</strong> {conversation.pronunciation}
                </p>
                <p style={{ margin: 0, color: '#e74c3c', fontWeight: 500 }}>
                  <strong>한국어:</strong> {conversation.korean}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* 일본 문화 섹션 */}
        {content.culture && (
          <div className="content-section mb-30">
            <div className="section-header" style={{
              background: 'linear-gradient(45deg, #52c41a, #73d13d)',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
              padding: '15px 20px',
              borderRadius: '15px',
              color: 'white',
              fontWeight: 600,
              fontSize: '18px'
            }}>
              <div className="section-icon" style={{
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px',
                fontSize: '20px'
              }}>
                🎭
              </div>
              오늘의 일본 문화 TMI
            </div>
            
            <div className="culture-content" style={{
              background: 'white',
              padding: '20px',
              borderRadius: '15px',
              borderLeft: '4px solid #52c41a',
              lineHeight: 1.8,
              color: '#333'
            }}>
              <h4 style={{ marginBottom: '10px', color: '#52c41a' }}>{content.culture.title}</h4>
              <p style={{ margin: 0 }}>{content.culture.content}</p>
            </div>
          </div>
        )}

        {/* 방언 탐방 섹션 */}
        {content.dialects.length > 0 && (
          <div className="content-section mb-30">
            <div className="section-header" style={{
              background: 'linear-gradient(45deg, #eb2f96, #f759ab)',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
              padding: '15px 20px',
              borderRadius: '15px',
              color: 'white',
              fontWeight: 600,
              fontSize: '18px'
            }}>
              <div className="section-icon" style={{
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px',
                fontSize: '20px'
              }}>
                🗾
              </div>
              오늘의 방언 탐방
            </div>
            
            {content.dialects.map((dialect, index) => (
              <div key={index} className="dialect-item" style={{
                background: 'white',
                padding: '20px',
                borderRadius: '15px',
                marginBottom: '15px',
                borderLeft: '4px solid #eb2f96',
                boxShadow: 'var(--card-shadow)'
              }}>
                <div className="dialect-region" style={{ 
                  color: '#eb2f96', 
                  fontWeight: 600, 
                  marginBottom: '10px', 
                  fontSize: '16px' 
                }}>
                  🏮 지역: {dialect.region}
                </div>
                <p style={{ margin: '0 0 5px 0', fontSize: '16px' }}>
                  <strong>방언:</strong> <JapaneseText text={dialect.dialect} size="large" />
                </p>
                <p style={{ margin: '0 0 5px 0', color: '#666' }}>
                  <strong>표준어:</strong> {dialect.standard}
                </p>
                <p style={{ margin: 0, color: '#333' }}>
                  <strong>의미:</strong> {dialect.meaning}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* 마무리 섹션 */}
        <div style={{
          background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
          padding: '20px',
          borderRadius: '12px',
          marginTop: '30px',
          textAlign: 'center'
        }}>
          <p style={{ color: 'white', margin: 0, fontSize: '16px', fontWeight: 500 }}>
            🎯 내일도 함께 일본어 모험을 떠나요!
          </p>
          <p style={{ color: 'rgba(255,255,255,0.8)', margin: '8px 0 0 0', fontSize: '14px' }}>
            매일 조금씩, 확실하게 성장하는 우리 💪
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '2px solid #f0f0f0', margin: '30px 0 20px' }} />

        <div style={{ 
          textAlign: 'center', 
          padding: '15px', 
          background: '#f8f9fa', 
          borderRadius: '8px' 
        }}>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#666', margin: 0 }}>
            🌟 <strong>마이니치 니홍고</strong>는 매일 새로운 일본어와 문화를 전해드립니다<br />
            더 이상 받아보고 싶지 않으시다면
            <a href="/unsubscribe" style={{ color: '#ff6b6b', textDecoration: 'none', fontWeight: 500 }}>
              여기서 구독해지
            </a>해주세요 😊
          </p>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default LearningPage
