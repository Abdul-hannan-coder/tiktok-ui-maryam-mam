export interface GoogleAuthStatus {
  google_oauth_configured: boolean
  redirect_uri: string
  login_url: string
}

export interface GoogleAuthResponseUser {
  id: string
  email: string
  name: string
}

export interface GoogleAuthResponse {
  success: boolean
  message: string
  token?: string
  user?: GoogleAuthResponseUser
}

export interface GoogleAuthState {
  isLoading: boolean
  error: string | null
  authStatus: GoogleAuthStatus | null
}
