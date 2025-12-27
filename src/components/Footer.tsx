import React from 'react'
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer style={{
      marginTop: 'auto',
      padding: '30px',
      textAlign: 'center',
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(5px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      color: '#636e72',
      fontSize: '0.9rem'
    }}>
      <div style={{ marginBottom: '15px' }}>
        <span onClick={() => navigate('/')} style={{ cursor: 'pointer', marginRight: '20px' }}>홈</span>
        <span onClick={() => navigate('/contents')} style={{ cursor: 'pointer', marginRight: '20px' }}>콘텐츠 목록</span>
        <span onClick={() => navigate('/unsubscribe')} style={{ cursor: 'pointer' }}>구독 취소</span>
      </div>
      <p style={{ margin: 0, opacity: 0.8 }}>
        © 2025 마이니치 니홍고. 매일 새로운 일본어와 함께하세요.
      </p>
    </footer>
  )
}

export default Footer
