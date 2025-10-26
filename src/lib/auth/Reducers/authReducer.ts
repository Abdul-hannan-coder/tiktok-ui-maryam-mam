import { AuthState, User } from '../types/authTypes'

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
}

export type AuthAction =
  | { type: 'INIT'; payload: { user: User | null; token: string | null } }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'INIT': {
      const { user, token } = action.payload
      return {
        user,
        token,
        isAuthenticated: !!(user && token),
        isLoading: false,
      }
    }
    case 'LOGIN_SUCCESS': {
      const { user, token } = action.payload
      return {
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      }
    }
    case 'LOGOUT': {
      return { ...initialAuthState, isLoading: false }
    }
    case 'SET_LOADING': {
      return { ...state, isLoading: action.payload }
    }
    default:
      return state
  }
}
