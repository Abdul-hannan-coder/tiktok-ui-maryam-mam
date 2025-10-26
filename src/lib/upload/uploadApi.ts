import api from '@/lib/auth/authApi'
import { TikTokUploadResponse, TikTokUploadStatusResponse } from './types/uploadTypes'

/**
 * Upload a video file to TikTok via backend
 * Endpoint: POST /tiktok/post/upload (multipart/form-data)
 */
export const uploadTikTokVideo = async (
  file: File | Blob,
  title: string,
  token: string
): Promise<TikTokUploadResponse> => {
  if (!token) {
    throw new Error('Missing auth token')
  }

  const form = new FormData()
  // If File is provided, we can set filename from file; for Blob fallback provide a default name
  const filename = (file as File).name || 'video.mp4'
  form.append('file', file, filename)
  form.append('title', title)

  const res = await api.post<TikTokUploadResponse>('/tiktok/post/upload', form, {
    headers: {
      Authorization: `Bearer ${token}`,
      // Let the browser/axios set the correct multipart boundary automatically
      'Content-Type': 'multipart/form-data',
    },
    // Optional: you can track progress if backend supports chunking
    onUploadProgress: (progressEvent) => {
      // Consumers can override using axios interceptors; hook will handle in component
    },
  })

  return res.data
}

/**
 * Upload a TikTok video by providing a public video URL
 * Endpoint: POST /tiktok/post/upload-url (application/x-www-form-urlencoded)
 */
export const uploadTikTokVideoByUrl = async (
  videoUrl: string,
  title: string,
  token: string
): Promise<TikTokUploadResponse> => {
  if (!token) {
    throw new Error('Missing auth token')
  }

  const body = new URLSearchParams()
  body.set('title', title)
  body.set('video_url', videoUrl)

  const res = await api.post<TikTokUploadResponse>('/tiktok/post/upload-url', body, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      accept: 'application/json',
    },
  })

  return res.data
}

/**
 * Check processing/publish status of an uploaded video.
 * Accepts either an absolute or base-relative path returned by backend (e.g., "/tiktok/post/status/<publish_id>").
 */
export const checkTikTokUploadStatus = async (
  statusUrl: string,
  token: string
): Promise<TikTokUploadStatusResponse> => {
  if (!token) {
    throw new Error('Missing auth token')
  }

  const res = await api.get<TikTokUploadStatusResponse>(statusUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}
