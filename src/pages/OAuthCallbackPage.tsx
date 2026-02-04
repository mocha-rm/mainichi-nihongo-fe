/* src/pages/OAuthCallbackPage.tsx */
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const OAuthCallbackPage: React.FC = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { login } = useAuth()
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const handleCallback = async () => {
            const accessToken = searchParams.get('accessToken')
            const refreshToken = searchParams.get('refreshToken')
            const errorParam = searchParams.get('error')

            if (errorParam) {
                setError('로그인에 실패했습니다. 다시 시도해주세요.')
                setTimeout(() => navigate('/login'), 3000)
                return
            }

            if (accessToken && refreshToken) {
                try {
                    await login(accessToken, refreshToken)
                    navigate('/', { replace: true })
                } catch (err) {
                    console.error('Login failed:', err)
                    setError('로그인 처리 중 오류가 발생했습니다.')
                    setTimeout(() => navigate('/login'), 3000)
                }
            } else {
                setError('잘못된 인증 정보입니다.')
                setTimeout(() => navigate('/login'), 3000)
            }
        }

        handleCallback()
    }, [searchParams, login, navigate])

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            padding: '40px 20px'
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                padding: '48px 40px',
                boxShadow: '0 8px 32px rgba(108, 92, 231, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                textAlign: 'center'
            }}>
                {error ? (
                    <>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px'
                        }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                            </svg>
                        </div>
                        <h2 style={{ color: '#2d3436', marginBottom: '12px' }}>로그인 실패</h2>
                        <p style={{ color: '#636e72' }}>{error}</p>
                        <p style={{ color: '#b2bec3', fontSize: '0.9rem', marginTop: '16px' }}>
                            잠시 후 로그인 페이지로 이동합니다...
                        </p>
                    </>
                ) : (
                    <>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px',
                            animation: 'pulse 1.5s infinite'
                        }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                                <circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="2" strokeDasharray="60" strokeDashoffset="20">
                                    <animateTransform attributeName="transform" type="rotate" dur="1s" from="0 12 12" to="360 12 12" repeatCount="indefinite" />
                                </circle>
                            </svg>
                        </div>
                        <h2 style={{ color: '#2d3436', marginBottom: '12px' }}>로그인 처리 중...</h2>
                        <p style={{ color: '#636e72' }}>잠시만 기다려주세요.</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default OAuthCallbackPage
