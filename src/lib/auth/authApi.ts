import axios from 'axios'
import { API_BASE_URL, DEBUG_LOGS } from '@/lib/config/appConfig'

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// Add request interceptor (quiet)
api.interceptors.request.use(
  (config) => {
    if (DEBUG_LOGS) {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        headers: config.headers,
        data: config.data,
      })
    }
    return config
  },
  (error) => {
    if (DEBUG_LOGS) console.error('❌ API Request Error:', error)
    return Promise.reject(error)
  }
)

// Add response interceptor (quiet)
api.interceptors.response.use(
  (response) => {
    if (DEBUG_LOGS) {
      console.log('✅ API Response:', {
        status: response.status,
        statusText: response.statusText,
        url: response.config.url,
        data: response.data,
      })
    }
    return response
  },
  (error) => {
    if (DEBUG_LOGS) {
      console.error('❌ API Response Error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        data: error.response?.data,
        message: error.message,
      })
    }
    return Promise.reject(error)
  }
)

export default api
