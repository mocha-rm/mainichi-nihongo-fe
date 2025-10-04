import React from 'react'

interface HeaderProps {
  title: string
  subtitle?: string
  date?: string
  level?: string
  topic?: string
  showContentInfo?: boolean
  showTags?: boolean
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  subtitle, 
  date, 
  level, 
  topic, 
  showContentInfo = false,
  showTags = false 
}) => {
  return (
    <div className="header">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      
      {showContentInfo && date && level && topic && (
        <div className="content-info">
          <p style={{ margin: 0, fontSize: '18px' }}>
            📅 <strong>{date}</strong> | 
            📚 <strong>{level}</strong> 레벨 | 
            🎯 <strong>{topic}</strong> 주제
          </p>
        </div>
      )}
      
      {showTags && (
        <div className="tags">
          <span className="tag">🗾 일본 문화</span>
          <span className="tag">💬 방언 탐방</span>
          <span className="tag">📚 오늘의 단어</span>
          <span className="tag">🎌 생생한 일본어</span>
        </div>
      )}
    </div>
  )
}

export default Header
