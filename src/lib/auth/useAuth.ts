import { useEffect, useCallback, useReducer } from 'react'
import axios from 'axios'
import { 
  generateSessionId, 
  setSessionId, 
  removeSessionId,
  setActiveUserId,
  removeActiveUserId,
  validateSession,
  getSessionId,
  getActiveUserId
} from '@/lib/auth'

// Types now imported from ./authTypes

import { api } from './authApi'
import { DEBUG_LOGS } from '@/lib/config/appConfig'
import { STORAGE_KEYS } from './authConstants'
import type { SignupData, LoginData, AuthResponse, SignupResponse } from './types/authTypes'
import { authReducer, initialAuthState } from './Reducers/authReducer'

export default function useAuth() {
  const [authState, dispatch] = useReducer(authReducer, initialAuthState)

  const logout = useCallback((redirectPath: string = '/auth/login') => {
    console.log('🔒 Starting logout process...')
    
    // Clear all storage items
    const itemsToRemove = [
      STORAGE_KEYS.AUTH_TOKEN,
      STORAGE_KEYS.USER_DATA,
      STORAGE_KEYS.SESSION_ID,
      STORAGE_KEYS.ACTIVE_USER_ID,
      'user_id',
    ]
    
    itemsToRemove.forEach(item => {
      localStorage.removeItem(item)
    })
    
    // Also clear any other localStorage items that might be app-related
    // This is a more thorough cleanup
    const allKeys = Object.keys(localStorage)
    allKeys.forEach(key => {
      // Remove any keys that might be related to our app
      if (key.includes('auth') || 
          key.includes('user') || 
          key.includes('token') || 
          key.includes('video') || 
          key.includes('youtube') || 
          key.includes('gemini') ||
          key.includes('credential') ||
          key.includes('session')) {
        localStorage.removeItem(key)
      }
    })
    
    console.log('✅ Cleared all session and auth data')
    
    // Reset auth state
    dispatch({ type: 'LOGOUT' })
    
    // Return the redirect path so the caller can handle navigation
    // This allows using Next.js router instead of window.location
    return redirectPath
  }, [])

  // Initialize auth state from localStorage with session validation
  useEffect(() => {
    if (DEBUG_LOGS) console.log('🔄 Initializing auth state from localStorage...')
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    const user = localStorage.getItem(STORAGE_KEYS.USER_DATA)
    
    if (DEBUG_LOGS) console.log('📦 localStorage data:', { 
      token: token ? 'exists' : 'not found', 
      user: user ? 'exists' : 'not found',
      sessionId: getSessionId() ? 'exists' : 'not found',
      activeUserId: getActiveUserId() ? 'exists' : 'not found'
    })
    
    if (token && user) {
      try {
        const userData = JSON.parse(user)
        if (DEBUG_LOGS) console.log('👤 Parsed user data:', userData)
        
        // Validate session
        const sessionValidation = validateSession()
        
        if (!sessionValidation.valid) {
          console.warn('⚠️ Session validation failed:', sessionValidation.reason)
          console.warn('🔒 Forcing logout due to invalid session')
          logout()
          return
        }
        
        if (DEBUG_LOGS) console.log('✅ Session validation successful')
        
        dispatch({ type: 'INIT', payload: { user: userData, token } })
        if (DEBUG_LOGS) console.log('✅ Auth state initialized successfully')
      } catch (error) {
        if (DEBUG_LOGS) console.error('❌ Error parsing user data:', error)
        logout()
      }
    } else {
      if (DEBUG_LOGS) console.log('ℹ️ No auth data found, setting as unauthenticated')
      dispatch({ type: 'INIT', payload: { user: null, token: null } })
    }
  }, [logout])

  const signup = useCallback(async (data: SignupData): Promise<SignupResponse> => {
    if (DEBUG_LOGS) console.log('📝 Starting signup process with data:', { ...data, password: '[REDACTED]' })
    
    try {
      const requestData = {
        ...data,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      
      if (DEBUG_LOGS) console.log('📤 Sending signup request with data:', { ...requestData, password: '[REDACTED]' })
      
      const response = await api.post('/auth/signup', requestData)
      
      if (DEBUG_LOGS) console.log('✅ Signup successful:', response.data)
      
      // Save user ID to localStorage
      localStorage.setItem(STORAGE_KEYS.USER_ID, response.data.id)
      console.log('💾 Saved user ID to localStorage:', response.data.id)
      
      return response.data
    } catch (error: unknown) {
      if (DEBUG_LOGS) console.error('❌ Signup failed:', error)
      
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.detail || `Signup failed: ${error.response?.status}`
        if (DEBUG_LOGS) console.error('📋 Error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        })
        throw new Error(errorMessage)
      } else {
        throw new Error('Signup failed due to network error')
      }
    }
  }, [])

  const getAuthHeaders = useCallback(() => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    const headers = token
      ? {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      : {
          'Content-Type': 'application/json',
        }
    
    if (DEBUG_LOGS) console.log('🔑 Generated auth headers:', { hasToken: !!token, headers })
    return headers
  }, [])

  const login = useCallback(async (data: LoginData): Promise<AuthResponse> => {
    if (DEBUG_LOGS) console.log('🔐 Starting login process with email:', data.email)
    
    // Check if there's already an active session
    const existingToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    const existingUser = localStorage.getItem(STORAGE_KEYS.USER_DATA)
    
    if (existingToken && existingUser) {
      try {
        const existingUserData = JSON.parse(existingUser)
        
        // Check if trying to login with a different account
        if (existingUserData.email !== data.email) {
          console.warn('⚠️ Attempting to login with different account while already logged in')
          console.warn(`⚠️ Current user: ${existingUserData.email}, New login: ${data.email}`)
          
          // Force logout of existing session
          console.log('🔒 Forcing logout of existing session before new login')
          removeSessionId()
          removeActiveUserId()
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
          localStorage.removeItem(STORAGE_KEYS.USER_DATA)
          localStorage.removeItem(STORAGE_KEYS.USER_ID)
        }
      } catch (error) {
        console.error('❌ Error checking existing session:', error)
      }
    }
    
    try {
      if (DEBUG_LOGS) console.log('📤 Sending login request...')
      
      const response = await api.post('/auth/login', data)
      
      if (DEBUG_LOGS) console.log('✅ Login successful:', {
        token: response.data.access_token ? 'exists' : 'not found',
        user: response.data.user,
      })
      
      // Generate new session ID
      const newSessionId = generateSessionId()
      console.log('🆔 Generated new session ID:', newSessionId)
      
      // Save auth data to localStorage
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.access_token)
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user))
      
      // Save session data
      setSessionId(newSessionId)
      setActiveUserId(response.data.user.id)
      
      if (DEBUG_LOGS) console.log('💾 Saved auth data and session to localStorage')
      
      // Update auth state
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: response.data.user, token: response.data.access_token } })
      if (DEBUG_LOGS) console.log('🔄 Updated auth state to authenticated')

      // Quietly fetch and cache Gemini API key (non-blocking, ignore errors)
      ;(async () => {
        try {
          type GeminiKeyData = { api_key_preview?: string | null; is_active?: boolean | null } | null
          const isGeminiKeyData = (val: unknown): val is Exclude<GeminiKeyData, null> => {
            if (!val || typeof val !== 'object') return false
            const maybe = val as Record<string, unknown>
            const apk = maybe.api_key_preview
            const active = maybe.is_active
            const apkOk = apk === null || typeof apk === 'string' || typeof apk === 'undefined'
            const activeOk = active === null || typeof active === 'boolean' || typeof active === 'undefined'
            return apkOk && activeOk
          }

          const headers = getAuthHeaders()
          const res = await api.get('/gemini-keys/', { headers })
          const raw = res?.data as unknown

          if (isGeminiKeyData(raw)) {
            const api_key_preview = raw?.api_key_preview ?? null
            const is_active = raw?.is_active ?? null
            if (api_key_preview) {
              localStorage.setItem(STORAGE_KEYS.GEMINI_API_KEY_PREVIEW, String(api_key_preview))
            }
            localStorage.setItem(
              STORAGE_KEYS.HAS_GEMINI_KEY,
              String(!!(api_key_preview || is_active))
            )
            if (DEBUG_LOGS) console.log('🔑 Cached Gemini key presence from server')
          } else {
            // Explicitly clear presence when API returns null or invalid
            localStorage.setItem(STORAGE_KEYS.HAS_GEMINI_KEY, 'false')
            localStorage.removeItem(STORAGE_KEYS.GEMINI_API_KEY_PREVIEW)
            if (DEBUG_LOGS) console.log('ℹ️ No Gemini key found (null/invalid)')
          }
        } catch {
          if (DEBUG_LOGS) console.warn('⚠️ Gemini key fetch failed (ignored)')
        }
      })()
      
      return response.data
    } catch (error: unknown) {
      if (DEBUG_LOGS) console.error('❌ Login failed:', error)
      
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        let errorMessage = 'Login failed. Please try again.'
        if (status === 401) errorMessage = 'Invalid email or password.'
        else if (status === 429) errorMessage = 'Too many attempts. Please wait and try again.'
        else if (status === 500) errorMessage = 'Server error during login. Please try again later.'
        else if (error.response?.data?.detail) errorMessage = String(error.response.data.detail)
        if (DEBUG_LOGS) console.error('📋 Error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        })
        throw new Error(errorMessage)
      } else {
        throw new Error('Network error. Please check your connection and try again.')
      }
    }
  }, [getAuthHeaders])

  type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    body?: unknown
    data?: unknown
    headers?: Record<string, string>
  }

  const fetchWithAuth = useCallback(async (url: string, options: FetchOptions = {}) => {
    if (DEBUG_LOGS) console.log('🌐 Making authenticated request to:', url)
    
    const authHeaders = getAuthHeaders()
    
    try {
      const response = await axios({
        url,
        method: options.method ?? 'GET',
        data: options.body ?? options.data,
        headers: {
          ...authHeaders,
          ...(options.headers ?? {}),
        },
      })
      
      if (DEBUG_LOGS) console.log('✅ Authenticated request successful:', {
        status: response.status,
        url,
      })
      
      return response
    } catch (error: unknown) {
      if (DEBUG_LOGS) console.error('❌ Authenticated request failed:', error)
      
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        if (DEBUG_LOGS) console.log('🔒 Unauthorized response, logging out...')
        logout()
      }
      
      throw error
    }
  }, [getAuthHeaders, logout])

  // Log current auth state when it changes
  useEffect(() => {
    if (DEBUG_LOGS) {
      console.log('🔄 Auth state updated:', {
        isAuthenticated: authState.isAuthenticated,
        isLoading: authState.isLoading,
        hasUser: !!authState.user,
        hasToken: !!authState.token,
        user: authState.user ? { id: authState.user.id, email: authState.user.email, username: authState.user.username } : null,
      })
    }
  }, [authState])

  return {
    ...authState,
    signup,
    login,
    logout,
    getAuthHeaders,
    fetchWithAuth,
  }
}