/* src/pages/LoginPage.tsx */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getGoogleLoginUrl, getKakaoLoginUrl } from '../utils/authApi'

const LoginPage: React.FC = () => {
    const navigate = useNavigate()
    const { isAuthenticated, isLoading } = useAuth()

    // 이미 로그인된 경우 홈으로 리다이렉트
    React.useEffect(() => {
        if (!isLoading && isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, isLoading, navigate])

    const handleGoogleLogin = () => {
        window.location.href = getGoogleLoginUrl()
    }

    const handleKakaoLogin = () => {
        window.location.href = getKakaoLoginUrl()
    }

    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh'
            }}>
                <div style={{ color: '#6c5ce7', fontSize: '1.2rem' }}>로딩 중...</div>
            </div>
        )
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            padding: '40px 20px'
        }}>
            {/* 로그인 카드 */}
            <div style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                padding: '48px 40px',
                boxShadow: '0 8px 32px rgba(108, 92, 231, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                maxWidth: '420px',
                width: '100%',
                textAlign: 'center'
            }}>
                {/* 로고 */}
                <img
                    src="/favicon.ico"
                    alt="마이니치 니홍고"
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        margin: '0 auto 24px',
                        objectFit: 'contain'
                    }}
                />

                <h1 style={{
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    color: '#2d3436',
                    marginBottom: '12px'
                }}>
                    마이니치 니홍고
                </h1>

                <p style={{
                    color: '#636e72',
                    fontSize: '1rem',
                    marginBottom: '36px',
                    lineHeight: 1.6
                }}>
                    소셜 계정으로 간편하게 로그인하고<br />
                    프리미엄 기능을 이용해보세요!
                </p>

                {/* 소셜 로그인 버튼들 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {/* 카카오 로그인 */}
                    <button
                        onClick={handleKakaoLogin}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            width: '100%',
                            padding: '14px 24px',
                            background: '#FEE500',
                            color: '#000000',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 2px 8px rgba(254, 229, 0, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)'
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(254, 229, 0, 0.4)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(254, 229, 0, 0.3)'
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.47 1.607 4.647 4.041 5.904-.178.567-.643 2.054-.736 2.372-.115.392.143.386.302.281.124-.082 1.981-1.312 2.784-1.846A11.76 11.76 0 0012 17.5c5.523 0 10-3.477 10-7.5S17.523 3 12 3z" />
                        </svg>
                        카카오로 시작하기
                    </button>

                    {/* 구글 로그인 */}
                    <button
                        onClick={handleGoogleLogin}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            width: '100%',
                            padding: '14px 24px',
                            background: '#ffffff',
                            color: '#3c4043',
                            border: '1px solid #dadce0',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)'
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)'
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google로 시작하기
                    </button>
                </div>

                {/* 하단 안내 */}
                <p style={{
                    marginTop: '32px',
                    fontSize: '0.85rem',
                    color: '#b2bec3',
                    lineHeight: 1.5
                }}>
                    로그인하면 이용약관 및 개인정보처리방침에<br />
                    동의하는 것으로 간주됩니다.
                </p>
            </div>
        </div>
    )
}

export default LoginPage
