import api from './api'
import { SubscriberResponseDto } from '../types'

// 구독 요청 DTO 타입
export interface SubscribeRequest {
  email: string
}

// 구독취소 요청 DTO 타입
export interface UnsubscribeRequest {
  email: string
}

// API 응답 타입
export interface ApiResponse {
  message: string
}

/**
 * 구독 API
 * @param email 구독할 이메일 주소
 * @returns 성공 메시지
 */
export const subscribe = async (email: string): Promise<string> => {
  try {
    const response = await api.post<ApiResponse>('/api/subscribe', { email })
    return response.data || '구독이 완료되었습니다!'
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('구독 중 오류가 발생했습니다.')
  }
}

/**
 * 구독취소 API
 * @param email 구독취소할 이메일 주소
 * @returns 성공 메시지
 */
export const unsubscribe = async (email: string): Promise<string> => {
  try {
    const response = await api.post<ApiResponse>('/api/unsubscribe', { email })
    return response.data || '구독이 취소되었습니다.'
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('구독 취소 중 오류가 발생했습니다.')
  }
}

/**
 * 구독자 목록 조회 API
 * @returns 구독자 목록
 */
export const getSubscribers = async (): Promise<SubscriberResponseDto[]> => {
  try {
    const response = await api.get<SubscriberResponseDto[]>('/api/subscribers')
    return response.data || []
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('구독자 목록 조회 중 오류가 발생했습니다.')
  }
}
