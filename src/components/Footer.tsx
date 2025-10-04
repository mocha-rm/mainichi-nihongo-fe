import React from 'react'

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <p>
        <a href="/">메인 페이지로 돌아가기</a> | 
        <a href="/unsubscribe">구독 취소하기</a>
      </p>
      <p style={{ marginTop: '10px', fontSize: '14px', opacity: 0.7 }}>
        © 2025 마이니치 니홍고. 매일 새로운 일본어와 함께하세요.
      </p>
    </div>
  )
}

export default Footer
