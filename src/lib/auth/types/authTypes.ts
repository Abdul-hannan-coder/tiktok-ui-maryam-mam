// Shared auth types used across the auth hook modules

export interface User {
  id: string
  email: string
  username: string
  full_name: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface SignupData {
  email: string
  username: string
  full_name: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}

export interface SignupResponse {
  email: string
  username: string
  full_name: string
  is_active: boolean
  created_at: string
  updated_at: string
  id: string
}
