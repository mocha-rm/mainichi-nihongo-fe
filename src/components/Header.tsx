/* src/components/Header.tsx */
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: '홈', path: '/' },
    { label: '학습 콘텐츠', path: '/contents' },
    { label: '구독 관리', path: '/unsubscribe' },
  ];

  return (
    <header className="glass-header" style={{ padding: '15px 0' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* 로고 영역 */}
        <div
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 'bold', fontSize: '20px',
            boxShadow: '0 4px 10px rgba(108, 92, 231, 0.3)'
          }}>
            日
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#2d3436' }}>
            마이니치 니홍고
          </h1>
        </div>

        {/* 네비게이션 메뉴 */}
        <nav style={{ display: 'flex', gap: '10px' }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  background: isActive ? 'rgba(108, 92, 231, 0.1)' : 'transparent',
                  color: isActive ? '#6c5ce7' : '#636e72',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export default Header