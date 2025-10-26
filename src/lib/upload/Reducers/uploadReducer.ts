import { TikTokUploadData, TikTokUploadStatusResponse } from '../types/uploadTypes'

export interface UploadState {
  isUploading: boolean
  progress: number | null
  error: string | null
  result: TikTokUploadData | null
  message: string | null
  lastStatus: TikTokUploadStatusResponse | null
}

export const initialUploadState: UploadState = {
  isUploading: false,
  progress: null,
  error: null,
  result: null,
  message: null,
  lastStatus: null,
}

type UploadAction =
  | { type: 'START_UPLOAD' }
  | { type: 'SET_PROGRESS'; payload: number | null }
  | { type: 'UPLOAD_SUCCESS'; payload: { data: TikTokUploadData; message?: string } }
  | { type: 'UPLOAD_ERROR'; payload: string }
  | { type: 'SET_STATUS'; payload: TikTokUploadStatusResponse | null }
  | { type: 'RESET' }

export const uploadReducer = (state: UploadState, action: UploadAction): UploadState => {
  switch (action.type) {
    case 'START_UPLOAD':
      return { ...state, isUploading: true, error: null, message: null, progress: null, result: null }
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload }
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        isUploading: false,
        error: null,
        result: action.payload.data,
        message: action.payload.message ?? 'Upload completed',
      }
    case 'UPLOAD_ERROR':
      return { ...state, isUploading: false, error: action.payload }
    case 'SET_STATUS':
      return { ...state, lastStatus: action.payload }
    case 'RESET':
      return { ...initialUploadState }
    default:
      return state
  }
}
