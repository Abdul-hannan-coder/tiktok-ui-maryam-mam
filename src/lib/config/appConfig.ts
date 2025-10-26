// Application configuration constants
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://backend.postsiva.com'
export const DEBUG_LOGS = process.env.NODE_ENV === 'development'

// TikTok Configuration
export const TIKTOK_CONFIG = {
  CLIENT_KEY: process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY || '',
  CLIENT_SECRET: process.env.TIKTOK_CLIENT_SECRET || '', // Keep secret on server side
  REDIRECT_URI: process.env.NEXT_PUBLIC_TIKTOK_REDIRECT_URI || `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/tiktok/callback`,
  AUTH_URL: 'https://www.tiktok.com/v2/auth/authorize',
  TOKEN_URL: 'https://open.tiktokapis.com/v2/oauth/token/',
  API_BASE_URL: 'https://open.tiktokapis.com',
  DEFAULT_SCOPE: ['user.info.basic', 'video.list', 'video.upload'].join(','),
} as const
