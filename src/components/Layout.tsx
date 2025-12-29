import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
      fontFamily: "'Noto Sans KR', sans-serif",
      color: '#2d3436'
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.4)', // Overlay to soften
        minHeight: '100vh',
        backdropFilter: 'blur(50px)', // Heavy blur for smooth background
        WebkitBackdropFilter: 'blur(50px)',
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
