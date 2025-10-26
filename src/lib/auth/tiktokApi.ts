import api from './authApi'
import { TIKTOK_CONFIG, DEBUG_LOGS } from './authConstants'
import {
  TikTokConnectionResponse,
  TikTokAuthUrlResponse,
  TikTokTokenResponse,
  TikTokUserInfo,
  TikTokApiResponse,
} from './types/tiktokTypes'

// Backend token shape for GET /tiktok/get-token
export interface TikTokBackendToken {
  access_token: string
  token_type?: string
  user_id?: string
  scope?: string
  tiktok_user_id?: string | null
  refresh_expires_in?: number
  created_at?: string
  refresh_token?: string
  id?: number
  expires_in?: number
  expires_at?: string
  open_id?: string
  test_user_id?: string | null
  updated_at?: string
}

export interface TikTokGetTokenResponse {
  success: boolean
  message: string
  data: TikTokBackendToken | null
}

/**
 * Check if the user has a valid TikTok connection
 * @param token - The access token to validate
 * @returns Promise with connection status and user info
 */
export const checkTikTokConnection = async (
  token: string
): Promise<TikTokApiResponse<TikTokConnectionResponse>> => {
  try {
    if (!token) {
      return {
        data: { isConnected: false },
        message: 'No token provided',
      }
    }

    // Call your backend endpoint that validates the TikTok token
    const response = await api.get<TikTokConnectionResponse>('/api/tiktok/connection', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (DEBUG_LOGS) {
      console.log('✅ TikTok connection verified:', response.data)
    }

    return {
      data: response.data,
      message: 'Connection verified successfully',
    }
  } catch (error: unknown) {
    if (DEBUG_LOGS) {
      console.error('❌ TikTok connection check failed:', error)
    }

    return {
      data: { isConnected: false },
      error: {
        code: 'CONNECTION_CHECK_FAILED',
        message: error instanceof Error ? error.message : 'Failed to check TikTok connection',
        details: error,
      },
    }
  }
}

/**
 * Fetch TikTok token from backend to determine if user already connected.
 * Uses app auth token (Bearer) and returns backend-stored TikTok token info if available.
 */
export const getTikTokTokenFromBackend = async (
  authToken: string
): Promise<TikTokGetTokenResponse> => {
  const res = await api.get<TikTokGetTokenResponse>('/tiktok/get-token', {
    headers: {
      Authorization: `Bearer ${authToken}`,
      accept: 'application/json',
    },
  })
  return res.data
}

/**
 * Generate TikTok OAuth authorization URL
 * @param state - Optional state parameter for CSRF protection
 * @returns Authorization URL and state
 */
export const generateTikTokAuthUrl = (state?: string): TikTokAuthUrlResponse => {
  try {
    // Generate a random state if not provided
    const authState = state || Math.random().toString(36).substring(2, 15)

    // Build the authorization URL with proper parameters
    const params = new URLSearchParams({
      client_key: TIKTOK_CONFIG.CLIENT_KEY,
      response_type: 'code',
      scope: TIKTOK_CONFIG.DEFAULT_SCOPE,
      redirect_uri: TIKTOK_CONFIG.REDIRECT_URI,
      state: authState,
    })

    const authUrl = `${TIKTOK_CONFIG.AUTH_URL}?${params.toString()}`

    if (DEBUG_LOGS) {
      console.log('🔗 Generated TikTok auth URL:', {
        url: authUrl,
        state: authState,
        redirectUri: TIKTOK_CONFIG.REDIRECT_URI,
      })
    }

    return {
      authUrl,
      state: authState,
    }
  } catch (error) {
    if (DEBUG_LOGS) {
      console.error('❌ Failed to generate TikTok auth URL:', error)
    }
    throw new Error('Failed to generate TikTok authorization URL')
  }
}

/**
 * Exchange authorization code for access token
 * @param code - The authorization code from TikTok callback
 * @returns Promise with token response
 */
export const exchangeTikTokCode = async (
  code: string
): Promise<TikTokApiResponse<TikTokTokenResponse>> => {
  try {
    // Call your backend endpoint to exchange the code
    // This should be done server-side to keep the client secret secure
    const response = await api.post<TikTokTokenResponse>('/api/tiktok/token', {
      code,
      redirectUri: TIKTOK_CONFIG.REDIRECT_URI,
    })

    if (DEBUG_LOGS) {
      console.log('✅ TikTok token exchanged successfully')
    }

    return {
      data: response.data,
      message: 'Token exchanged successfully',
    }
  } catch (error: unknown) {
    if (DEBUG_LOGS) {
      console.error('❌ TikTok token exchange failed:', error)
    }

    return {
      error: {
        code: 'TOKEN_EXCHANGE_FAILED',
        message: error instanceof Error ? error.message : 'Failed to exchange authorization code',
        details: error,
      },
    }
  }
}

/**
 * Get TikTok user information
 * @param accessToken - The user's access token
 * @returns Promise with user information
 */
export const getTikTokUserInfo = async (
  accessToken: string
): Promise<TikTokApiResponse<TikTokUserInfo>> => {
  try {
    const response = await api.get<TikTokUserInfo>('/api/tiktok/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (DEBUG_LOGS) {
      console.log('✅ TikTok user info retrieved:', response.data)
    }

    return {
      data: response.data,
      message: 'User info retrieved successfully',
    }
  } catch (error: unknown) {
    if (DEBUG_LOGS) {
      console.error('❌ Failed to get TikTok user info:', error)
    }

    return {
      error: {
        code: 'USER_INFO_FAILED',
        message: error instanceof Error ? error.message : 'Failed to get user information',
        details: error,
      },
    }
  }
}

/**
 * Refresh TikTok access token
 * @param refreshToken - The refresh token
 * @returns Promise with new token response
 */
export const refreshTikTokToken = async (
  refreshToken: string
): Promise<TikTokApiResponse<TikTokTokenResponse>> => {
  try {
    const response = await api.post<TikTokTokenResponse>('/api/tiktok/refresh', {
      refreshToken,
    })

    if (DEBUG_LOGS) {
      console.log('✅ TikTok token refreshed successfully')
    }

    return {
      data: response.data,
      message: 'Token refreshed successfully',
    }
  } catch (error: unknown) {
    if (DEBUG_LOGS) {
      console.error('❌ TikTok token refresh failed:', error)
    }

    return {
      error: {
        code: 'TOKEN_REFRESH_FAILED',
        message: error instanceof Error ? error.message : 'Failed to refresh token',
        details: error,
      },
    }
  }
}

/**
 * Disconnect TikTok account
 * @param accessToken - The user's access token
 * @returns Promise with disconnection status
 */
export const disconnectTikTok = async (
  accessToken: string
): Promise<TikTokApiResponse<{ success: boolean }>> => {
  try {
    const response = await api.delete<{ success: boolean }>('/api/tiktok/disconnect', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (DEBUG_LOGS) {
      console.log('✅ TikTok account disconnected')
    }

    return {
      data: response.data,
      message: 'Account disconnected successfully',
    }
  } catch (error: unknown) {
    if (DEBUG_LOGS) {
      console.error('❌ TikTok disconnect failed:', error)
    }

    return {
      error: {
        code: 'DISCONNECT_FAILED',
        message: error instanceof Error ? error.message : 'Failed to disconnect account',
        details: error,
      },
    }
  }
}
