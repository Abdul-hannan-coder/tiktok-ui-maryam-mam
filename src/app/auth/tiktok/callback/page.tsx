'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { exchangeTikTokCode, getTikTokUserInfo } from '@/lib/auth/tiktokApi'
import { STORAGE_KEYS } from '@/lib/auth/authConstants'
import { storeTikTokConnection } from '@/lib/auth/authFlow'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'

export default function TikTokCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState<string>('')
  const [progress, setProgress] = useState<string>('Connecting to TikTok...')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code')
        const state = searchParams.get('state')
        const errorParam = searchParams.get('error')
        const errorDescription = searchParams.get('error_description')

        // Check for OAuth errors
        if (errorParam) {
          setStatus('error')
          setError(errorDescription || errorParam)
          return
        }

        if (!code) {
          setStatus('error')
          setError('No authorization code received from TikTok')
          return
        }

        // Verify state for CSRF protection
        const storedState = localStorage.getItem(STORAGE_KEYS.TIKTOK_AUTH_STATE)
        if (state !== storedState) {
          setStatus('error')
          setError('Security validation failed. Please try connecting again.')
          return
        }

        setProgress('Exchanging authorization code...')

        // Exchange code for token
        const tokenResponse = await exchangeTikTokCode(code)

        if (tokenResponse.error) {
          setStatus('error')
          setError(tokenResponse.error.message)
          return
        }

        if (!tokenResponse.data) {
          setStatus('error')
          setError('Failed to receive access token')
          return
        }

        setProgress('Fetching your TikTok profile...')

        // Get user information
        const userInfoResponse = await getTikTokUserInfo(tokenResponse.data.accessToken)

        // Store connection data
        storeTikTokConnection({
          accessToken: tokenResponse.data.accessToken,
          refreshToken: tokenResponse.data.refreshToken,
          expiresIn: tokenResponse.data.expiresIn,
          userInfo: userInfoResponse.data ? userInfoResponse.data as unknown as Record<string, unknown> : undefined,
        })

        // Clean up state
        localStorage.removeItem(STORAGE_KEYS.TIKTOK_AUTH_STATE)

        setProgress('Successfully connected!')
        setStatus('success')

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      } catch (err) {
        console.error('TikTok callback error:', err)
        setStatus('error')
        setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      }
    }

    handleCallback()
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A012A] via-[#1A103D] to-[#0A012A] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
        {status === 'loading' && (
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-[#6C63FF] animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">Connecting TikTok</h2>
            <p className="text-[#C5C5D2]">{progress}</p>
            <div className="mt-6 w-full bg-[#2A1A4D] rounded-full h-2">
              <div className="bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] h-2 rounded-full animate-pulse w-2/3"></div>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Successfully Connected!</h2>
            <p className="text-[#C5C5D2] mb-4">{progress}</p>
            <p className="text-sm text-gray-400">Redirecting to dashboard...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Connection Failed</h2>
            <p className="text-[#C5C5D2] mb-6">{error}</p>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/auth/connect')}
                className="w-full bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] hover:from-[#5A52E6] hover:to-[#E61E87] text-white font-semibold py-3 rounded-xl transition-all duration-300"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full bg-white/5 hover:bg-white/10 text-[#C5C5D2] hover:text-white font-semibold py-3 rounded-xl transition-all duration-300"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
