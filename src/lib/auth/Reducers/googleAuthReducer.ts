import { GoogleAuthState, GoogleAuthStatus } from '../types/googleAuthTypes'

export const initialGoogleAuthState: GoogleAuthState = {
  isLoading: false,
  error: null,
  authStatus: null,
}

export type GoogleAuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_STATUS'; payload: GoogleAuthStatus | null }

export function googleAuthReducer(
  state: GoogleAuthState,
  action: GoogleAuthAction
): GoogleAuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_STATUS':
      return { ...state, authStatus: action.payload }
    default:
      return state
  }
}
