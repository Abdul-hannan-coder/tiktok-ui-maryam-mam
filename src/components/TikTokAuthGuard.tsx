'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { canAccessDashboard, checkTikTokConnectionStatus } from '@/lib/auth/authFlow'
import { STORAGE_KEYS } from '@/lib/auth/authConstants'
import { Loader2 } from 'lucide-react'

interface TikTokAuthGuardProps {
  children: React.ReactNode
}

/**
 * TikTok Auth Guard Component
 * Protects routes that require both authentication AND TikTok connection
 * Redirects to /auth/login if not authenticated
 * Redirects to /auth/connect if authenticated but TikTok not connected
 */
export function TikTokAuthGuard({ children }: TikTokAuthGuardProps) {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      // Check if user is authenticated
      const authToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
      
      if (!authToken) {
        // Not authenticated, redirect to login
        router.push('/auth/login')
        return
      }

      // Check TikTok connection
      const { isConnected } = checkTikTokConnectionStatus()
      
      if (!isConnected) {
        // Authenticated but TikTok not connected
        router.push('/auth/connect')
        return
      }

      // Both authenticated and TikTok connected
      setIsAuthorized(true)
      setIsChecking(false)
    }

    checkAuth()
  }, [router])

  // Show loading state while checking
  if (isChecking || !isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A012A] via-[#1A103D] to-[#0A012A] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#6C63FF] animate-spin mx-auto mb-4" />
          <p className="text-[#C5C5D2] text-lg">Verifying access...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

/**
 * Hook version for more flexible usage
 */
export function useTikTokAuthGuard() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
      
      if (!authToken) {
        router.push('/auth/login')
        setIsChecking(false)
        return
      }

      const canAccess = canAccessDashboard()
      
      if (!canAccess) {
        router.push('/auth/connect')
        setIsChecking(false)
        return
      }

      setIsAuthorized(true)
      setIsChecking(false)
    }

    checkAuth()
  }, [router])

  return { isAuthorized, isChecking }
}
