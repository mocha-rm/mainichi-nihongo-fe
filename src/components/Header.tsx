import React from 'react'
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string
  subtitle?: string
  showTags?: boolean
}

const Header: React.FC<HeaderProps> = ({ title = "마이니치 니홍고", showTags = false }) => {
  const navigate = useNavigate();

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 40px',
      marginTop: '20px',
      marginBottom: '40px',
      borderRadius: '24px',
      background: 'rgba(255, 255, 255, 0.25)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
    }}>
      <div
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        <div style={{
          width: '40px', height: '40px', borderRadius: '12px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 'bold', fontSize: '20px'
        }}>
          日
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#2d3436', fontFamily: "'Gaegu', cursive" }}>
          {title}
        </h1>
      </div>

      <nav style={{ display: 'flex', gap: '30px' }}>
        {['홈', '콘텐츠 목록'].map((item) => (
          <span
            key={item}
            onClick={() => navigate(item === '홈' ? '/' : '/contents')}
            style={{
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#2d3436',
              opacity: 0.8,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
          >
            {item}
          </span>
        ))}
      </nav>
    </header>
  )
}

export default Header
