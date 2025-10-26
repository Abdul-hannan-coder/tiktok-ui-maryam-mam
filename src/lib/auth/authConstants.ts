// Centralized constants for the auth hook
import { API_BASE_URL, DEBUG_LOGS, TIKTOK_CONFIG } from '@/lib/config/appConfig'
// Re-export to preserve existing import paths in the codebase
export { API_BASE_URL, DEBUG_LOGS, TIKTOK_CONFIG }

// Local storage keys used by the app
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  USER_ID: 'user_id',
  SESSION_ID: 'session_id',
  ACTIVE_USER_ID: 'active_user_id',
  GEMINI_API_KEY: 'gemini_api_key',
  GEMINI_API_KEY_PREVIEW: 'gemini_api_key_preview',
  HAS_GEMINI_KEY: 'has_gemini_key',
  CURRENT_VIDEO_DATA: 'current_video_data',
  CURRENT_VIDEO_ID: 'current_video_id',
  YT_REDIRECT_AFTER_AUTH: 'youtube_redirect_after_auth',
  GOOGLE_AUTH_REDIRECT: 'google_auth_redirect',
  // TikTok specific keys
  TIKTOK_ACCESS_TOKEN: 'tiktok_access_token',
  TIKTOK_REFRESH_TOKEN: 'tiktok_refresh_token',
  TIKTOK_USER_INFO: 'tiktok_user_info',
  TIKTOK_TOKEN_EXPIRES_AT: 'tiktok_token_expires_at',
  TIKTOK_AUTH_STATE: 'tiktok_auth_state',
} as const
