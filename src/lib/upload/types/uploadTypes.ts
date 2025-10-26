// Types for TikTok video upload flow

export interface TikTokUploadFileInfo {
  filename: string
  file_size: number
  content_type: string
  chunk_size?: number
  total_chunks?: number
  upload_completed?: boolean
}

export interface TikTokUploadData {
  publish_id: string
  upload_url?: string
  source_type?: 'FILE_UPLOAD' | string
  post_id?: number
  upload_status?: 'completed' | 'processing' | 'failed' | string
  file_info?: TikTokUploadFileInfo
  status_check_url?: string
  status_check_instructions?: string
  // Allow backend to add extra fields without breaking types
  [key: string]: unknown
}

export interface TikTokUploadResponse {
  success: boolean
  message: string
  data: TikTokUploadData
}

export interface TikTokUploadStatusData {
  publish_id: string
  state?: 'queued' | 'processing' | 'published' | 'failed' | string
  error?: string | null
  // Allow arbitrary metadata from backend
  [key: string]: unknown
}

export interface TikTokUploadStatusResponse {
  success: boolean
  message: string
  data: TikTokUploadStatusData
}
