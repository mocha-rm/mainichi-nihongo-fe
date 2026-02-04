import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import {
    User,
    getAccessToken,
    getRefreshToken,
    saveTokens,
    clearTokens,
    fetchUserInfo,
    logout as logoutApi,
    refreshAccessToken
} from '../utils/authApi'

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (accessToken: string, refreshToken: string) => Promise<void>
    logout: () => Promise<void>
    refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const refreshUser = useCallback(async () => {
        try {
            const userInfo = await fetchUserInfo()
            setUser(userInfo)
        } catch (error) {
            console.error('Failed to fetch user info:', error)
            clearTokens()
            setUser(null)
        }
    }, [])

    // 앱 시작 시 토큰 확인 및 사용자 정보 로드
    useEffect(() => {
        const initAuth = async () => {
            const accessToken = getAccessToken()
            const refreshToken = getRefreshToken()

            if (accessToken && refreshToken) {
                try {
                    await refreshUser()
                } catch (error) {
                    // 토큰이 만료된 경우 갱신 시도
                    try {
                        await refreshAccessToken()
                        await refreshUser()
                    } catch {
                        clearTokens()
                        setUser(null)
                    }
                }
            }
            setIsLoading(false)
        }

        initAuth()
    }, [refreshUser])

    const login = async (accessToken: string, refreshToken: string) => {
        saveTokens(accessToken, refreshToken)
        await refreshUser()
    }

    const logout = async () => {
        await logoutApi()
        setUser(null)
    }

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        refreshUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
