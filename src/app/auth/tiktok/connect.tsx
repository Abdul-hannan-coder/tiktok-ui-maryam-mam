'use client'

import React from 'react'
import { generateTikTokAuthUrl } from '@/lib/auth/tiktokApi'
import { STORAGE_KEYS } from '@/lib/auth/authConstants'

const TikTokConnect: React.FC = () => {
  const handleConnect = () => {
    const { authUrl, state } = generateTikTokAuthUrl()
    
    // Store state for CSRF verification
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.TIKTOK_AUTH_STATE, state)
    }
    
    // Redirect to TikTok OAuth
    window.location.href = authUrl
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0A012A] via-[#1A103D] to-[#0A012A]">
      <div className="relative overflow-hidden bg-white/5 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/10 via-[#FF2E97]/10 to-[#6C63FF]/10"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Connect to TikTok
            </h1>
            <p className="text-gray-400">
              Connect your TikTok account to start automating your content
            </p>
          </div>

          <button
            onClick={handleConnect}
            className="w-full bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] hover:from-[#5A52E6] hover:to-[#E61E87] text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Connect with TikTok
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            By connecting, you agree to TikTok&apos;s terms of service and privacy policy
          </p>
        </div>
      </div>
    </div>
  )
}

export default TikTokConnect
