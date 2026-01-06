/* src/components/Layout.tsx */
import React from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      /* 배경은 global.css의 body에서 처리하므로 여기서 중복 제거 가능하지만,
         오버레이 효과를 위해 남겨둔다면 아래처럼 유지 */
    }}>
      <Header />

      <main style={{
        flex: 1,
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
      }}>
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default Layout