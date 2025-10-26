import { useEffect, useState, useCallback } from 'react'
import { checkTikTokConnection, getTikTokUserInfo } from './tiktokApi'
import { STORAGE_KEYS, DEBUG_LOGS } from './authConstants'
import { TikTokConnectionResponse, TikTokUserInfo } from './types/tiktokTypes'

export interface UseTikTokAuthState {
  isConnected: boolean
  isLoading: boolean
  error: string | null
  userInfo: TikTokUserInfo | null
  connectionData: TikTokConnectionResponse | null
}

export interface UseTikTokAuthReturn extends UseTikTokAuthState {
  checkConnection: () => Promise<void>
  refreshUserInfo: () => Promise<void>
  clearError: () => void
  disconnect: () => void
}

/**
 * Custom hook for managing TikTok authentication state
 * @param token - The TikTok access token (optional, will try to load from localStorage)
 * @param autoCheck - Whether to automatically check connection on mount (default: true)
 * @returns TikTok authentication state and helper functions
 */
const useTikTokAuth = (token?: string, autoCheck = true): UseTikTokAuthReturn => {
  const [state, setState] = useState<UseTikTokAuthState>({
    isConnected: false,
    isLoading: true,
    error: null,
    userInfo: null,
    connectionData: null,
  })

  // Get token from localStorage if not provided
  const getToken = useCallback((): string | null => {
    if (token) return token
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.TIKTOK_ACCESS_TOKEN)
    }
    return null
  }, [token])

  // Check if token is expired
  const isTokenExpired = useCallback((): boolean => {
    if (typeof window === 'undefined') return true
    
    const expiresAt = localStorage.getItem(STORAGE_KEYS.TIKTOK_TOKEN_EXPIRES_AT)
    if (!expiresAt) return true
    
    return new Date(expiresAt) <= new Date()
  }, [])

  // Verify TikTok connection
  const checkConnection = useCallback(async () => {
    const accessToken = getToken()

    if (!accessToken) {
      setState((prev) => ({
        ...prev,
        isConnected: false,
        isLoading: false,
        error: 'No access token found',
      }))
      return
    }

    // Check if token is expired
    if (isTokenExpired()) {
      setState((prev) => ({
        ...prev,
        isConnected: false,
        isLoading: false,
        error: 'Token has expired',
      }))
      return
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await checkTikTokConnection(accessToken)

      if (response.error) {
        setState((prev) => ({
          ...prev,
          isConnected: false,
          isLoading: false,
          error: response.error?.message || 'Failed to verify connection',
        }))
        return
      }

      const isConnected = response.data?.isConnected || false

      setState((prev) => ({
        ...prev,
        isConnected,
        connectionData: response.data || null,
        isLoading: false,
        error: null,
      }))

      if (DEBUG_LOGS) {
        console.log('✅ TikTok connection status:', { isConnected, data: response.data })
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      
      setState((prev) => ({
        ...prev,
        isConnected: false,
        isLoading: false,
        error: errorMessage,
      }))

      if (DEBUG_LOGS) {
        console.error('❌ TikTok connection check error:', error)
      }
    }
  }, [getToken, isTokenExpired])

  // Fetch user information
  const refreshUserInfo = useCallback(async () => {
    const accessToken = getToken()

    if (!accessToken) {
      setState((prev) => ({
        ...prev,
        error: 'No access token found',
      }))
      return
    }

    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      const response = await getTikTokUserInfo(accessToken)

      if (response.error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: response.error?.message || 'Failed to fetch user info',
        }))
        return
      }

      setState((prev) => ({
        ...prev,
        userInfo: response.data || null,
        isLoading: false,
        error: null,
      }))

      // Cache user info in localStorage
      if (response.data && typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.TIKTOK_USER_INFO, JSON.stringify(response.data))
      }

      if (DEBUG_LOGS) {
        console.log('✅ TikTok user info loaded:', response.data)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user info'
      
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))

      if (DEBUG_LOGS) {
        console.error('❌ TikTok user info error:', error)
      }
    }
  }, [getToken])

  // Clear error state
  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }))
  }, [])

  // Disconnect TikTok account
  const disconnect = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.TIKTOK_ACCESS_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.TIKTOK_REFRESH_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.TIKTOK_USER_INFO)
      localStorage.removeItem(STORAGE_KEYS.TIKTOK_TOKEN_EXPIRES_AT)
      localStorage.removeItem(STORAGE_KEYS.TIKTOK_AUTH_STATE)
    }

    setState({
      isConnected: false,
      isLoading: false,
      error: null,
      userInfo: null,
      connectionData: null,
    })

    if (DEBUG_LOGS) {
      console.log('🔌 TikTok account disconnected')
    }
  }, [])

  // Load cached user info on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cachedUserInfo = localStorage.getItem(STORAGE_KEYS.TIKTOK_USER_INFO)
      if (cachedUserInfo) {
        try {
          const parsedUserInfo = JSON.parse(cachedUserInfo) as TikTokUserInfo
          setState((prev) => ({ ...prev, userInfo: parsedUserInfo }))
        } catch (error) {
          if (DEBUG_LOGS) {
            console.warn('⚠️ Failed to parse cached TikTok user info:', error)
          }
        }
      }
    }
  }, [])

  // Auto-check connection on mount or when token changes
  useEffect(() => {
    if (autoCheck) {
      checkConnection()
    }
  }, [autoCheck, checkConnection])

  return {
    ...state,
    checkConnection,
    refreshUserInfo,
    clearError,
    disconnect,
  }
}

export default useTikTokAuth
