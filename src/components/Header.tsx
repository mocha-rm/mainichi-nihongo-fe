/* src/components/Header.tsx */
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const menuItems = [
    { label: '홈', path: '/' },
    { label: '학습 콘텐츠', path: '/contents' },
    { label: '구독 관리', path: '/unsubscribe' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

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

        {/* 네비게이션 및 인증 영역 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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

          {/* 인증 상태에 따른 버튼 */}
          {!isLoading && (
            isAuthenticated && user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* 사용자 정보 */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 12px',
                  background: 'rgba(108, 92, 231, 0.08)',
                  borderRadius: '20px'
                }}>
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 600
                    }}>
                      {user.name?.charAt(0) || '?'}
                    </div>
                  )}
                  <span style={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: '#2d3436',
                    maxWidth: '100px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {user.name}
                  </span>
                  {user.subscriptionTier === 'PREMIUM' && (
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: '#fff',
                      background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
                      padding: '2px 6px',
                      borderRadius: '8px'
                    }}>
                      PRO
                    </span>
                  )}
                </div>

                {/* 로그아웃 버튼 */}
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'transparent',
                    color: '#636e72',
                    border: '1px solid #dfe6e9',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#6c5ce7';
                    e.currentTarget.style.color = '#6c5ce7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#dfe6e9';
                    e.currentTarget.style.color = '#636e72';
                  }}
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                style={{
                  background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 15px rgba(108, 92, 231, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(108, 92, 231, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(108, 92, 231, 0.3)';
                }}
              >
                로그인
              </button>
            )
          )}
        </div>
      </div>
    </header>
  )
}

export default Header