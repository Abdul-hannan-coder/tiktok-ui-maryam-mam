"use client";

import { useCallback, useReducer, useRef } from 'react'
import { STORAGE_KEYS } from '@/lib/auth/authConstants'
import { uploadReducer, initialUploadState } from './Reducers/uploadReducer'
import { uploadTikTokVideo, checkTikTokUploadStatus } from './uploadApi'
import {
  TikTokUploadResponse,
  TikTokUploadStatusResponse,
} from './types/uploadTypes'

/**
 * useTikTokUpload
 * Hook to upload TikTok videos via backend and (optionally) check processing status.
 *
 * Contract
 * - Inputs: file (File | Blob), title (string)
 * - Auth: reads Bearer token from localStorage (STORAGE_KEYS.AUTH_TOKEN)
 * - Success: returns backend response data and message
 * - Error: sets error string; consumer can clear via reset
 */
const useTikTokUpload = () => {
  const [state, dispatch] = useReducer(uploadReducer, initialUploadState)
  const lastProgress = useRef<number | null>(null)

  const getToken = () => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
  }

  const uploadVideo = useCallback(
    async (file: File | Blob, title: string): Promise<TikTokUploadResponse | null> => {
      dispatch({ type: 'START_UPLOAD' })
      try {
        const token = getToken()
        if (!token) {
          throw new Error('You must be logged in to upload')
        }

        // Perform upload
        const result = await uploadTikTokVideo(file, title, token)
        dispatch({ type: 'UPLOAD_SUCCESS', payload: { data: result.data, message: result.message } })
        return result
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Upload failed'
        dispatch({ type: 'UPLOAD_ERROR', payload: message })
        return null
      }
    },
    []
  )

  const checkStatus = useCallback(
    async (statusUrl: string): Promise<TikTokUploadStatusResponse | null> => {
      try {
        const token = getToken()
        if (!token) throw new Error('Missing auth token')
        const status = await checkTikTokUploadStatus(statusUrl, token)
        dispatch({ type: 'SET_STATUS', payload: status })
        return status
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Status check failed'
        dispatch({ type: 'UPLOAD_ERROR', payload: message })
        return null
      }
    },
    []
  )

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' })
    lastProgress.current = null
  }, [])

  return {
    // state
    isUploading: state.isUploading,
    progress: state.progress,
    error: state.error,
    message: state.message,
    result: state.result,
    lastStatus: state.lastStatus,

    // actions
    uploadVideo,
    checkStatus,
    reset,
  }
}

export default useTikTokUpload
