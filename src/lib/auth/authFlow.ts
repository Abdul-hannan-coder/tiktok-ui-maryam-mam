/**
 * Authentication Flow Utilities
 * Handles the user flow after login: check TikTok connection and redirect accordingly
 */

import { STORAGE_KEYS } from './authConstants'

export interface TikTokConnectionStatus {
  isConnected: boolean
  shouldRedirect: boolean
  redirectPath: '/auth/connect' | '/dashboard'
}

/**
 * Check if user has TikTok connected
 * @returns Connection status and redirect information
 */
export const checkTikTokConnectionStatus = (): TikTokConnectionStatus => {
  if (typeof window === 'undefined') {
    return {
      isConnected: false,
      shouldRedirect: true,
      redirectPath: '/auth/connect',
    }
  }

  // Check if user has TikTok access token
  const tiktokToken = localStorage.getItem(STORAGE_KEYS.TIKTOK_ACCESS_TOKEN)
  
  // Check if token is expired
  const tokenExpiresAt = localStorage.getItem(STORAGE_KEYS.TIKTOK_TOKEN_EXPIRES_AT)
  const isTokenExpired = tokenExpiresAt ? new Date(tokenExpiresAt) <= new Date() : true

  const isConnected = !!(tiktokToken && !isTokenExpired)

  return {
    isConnected,
    shouldRedirect: true,
    redirectPath: isConnected ? '/dashboard' : '/auth/connect',
  }
}

/**
 * Get the appropriate redirect path after successful login
 * @returns The path to redirect to
 */
export const getPostLoginRedirectPath = (): string => {
  const { redirectPath } = checkTikTokConnectionStatus()
  return redirectPath
}

/**
 * Check if user should access dashboard
 * Returns true if user is authenticated AND has TikTok connected
 */
export const canAccessDashboard = (): boolean => {
  if (typeof window === 'undefined') return false

  // Check if user is logged in
  const authToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
  if (!authToken) return false

  // Check if TikTok is connected
  const { isConnected } = checkTikTokConnectionStatus()
  
  return isConnected
}

/**
 * Store TikTok connection data after successful OAuth
 */
export const storeTikTokConnection = (data: {
  accessToken: string
  refreshToken?: string
  expiresIn: number
  userInfo?: Record<string, unknown>
}) => {
  if (typeof window === 'undefined') return

  localStorage.setItem(STORAGE_KEYS.TIKTOK_ACCESS_TOKEN, data.accessToken)
  
  if (data.refreshToken) {
    localStorage.setItem(STORAGE_KEYS.TIKTOK_REFRESH_TOKEN, data.refreshToken)
  }

  // Calculate and store expiry time
  const expiresAt = new Date(Date.now() + data.expiresIn * 1000)
  localStorage.setItem(STORAGE_KEYS.TIKTOK_TOKEN_EXPIRES_AT, expiresAt.toISOString())

  // Store user info if provided
  if (data.userInfo) {
    localStorage.setItem(STORAGE_KEYS.TIKTOK_USER_INFO, JSON.stringify(data.userInfo))
  }
}

/**
 * Clear TikTok connection data
 */
export const clearTikTokConnection = () => {
  if (typeof window === 'undefined') return

  localStorage.removeItem(STORAGE_KEYS.TIKTOK_ACCESS_TOKEN)
  localStorage.removeItem(STORAGE_KEYS.TIKTOK_REFRESH_TOKEN)
  localStorage.removeItem(STORAGE_KEYS.TIKTOK_USER_INFO)
  localStorage.removeItem(STORAGE_KEYS.TIKTOK_TOKEN_EXPIRES_AT)
  localStorage.removeItem(STORAGE_KEYS.TIKTOK_AUTH_STATE)
}
