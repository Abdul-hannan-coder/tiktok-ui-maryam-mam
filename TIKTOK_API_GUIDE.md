# TikTok API Integration Guide

This guide explains how to use the TikTok API integration and authentication hooks in your Next.js application.

## Table of Contents
1. [Setup](#setup)
2. [Configuration](#configuration)
3. [API Functions](#api-functions)
4. [React Hook Usage](#react-hook-usage)
5. [Component Examples](#component-examples)
6. [Best Practices](#best-practices)

## Setup

### 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
NEXT_PUBLIC_API_BASE_URL=https://backend.postsiva.com
NEXT_PUBLIC_TIKTOK_CLIENT_KEY=your_client_key
TIKTOK_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_TIKTOK_REDIRECT_URI=http://localhost:3000/auth/tiktok/callback
```

### 2. TikTok Developer Setup

1. Go to [TikTok for Developers](https://developers.tiktok.com/)
2. Create a new app
3. Configure OAuth redirect URI
4. Copy your Client Key and Client Secret

## Configuration

### App Config (`src/lib/config/appConfig.ts`)

The TikTok configuration is centralized in `TIKTOK_CONFIG`:

```typescript
export const TIKTOK_CONFIG = {
  CLIENT_KEY: process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY || '',
  CLIENT_SECRET: process.env.TIKTOK_CLIENT_SECRET || '',
  REDIRECT_URI: process.env.NEXT_PUBLIC_TIKTOK_REDIRECT_URI || '',
  AUTH_URL: 'https://www.tiktok.com/v2/auth/authorize',
  TOKEN_URL: 'https://open.tiktokapis.com/v2/oauth/token/',
  API_BASE_URL: 'https://open.tiktokapis.com',
  DEFAULT_SCOPE: ['user.info.basic', 'video.list', 'video.upload'].join(','),
}
```

## API Functions

### Import

```typescript
import {
  checkTikTokConnection,
  generateTikTokAuthUrl,
  exchangeTikTokCode,
  getTikTokUserInfo,
  refreshTikTokToken,
  disconnectTikTok,
} from '@/lib/auth/tiktokApi'
```

### 1. Generate Auth URL

```typescript
const { authUrl, state } = generateTikTokAuthUrl()

// Store state in localStorage for CSRF protection
localStorage.setItem('tiktok_auth_state', state)

// Redirect user to TikTok
window.location.href = authUrl
```

### 2. Check Connection Status

```typescript
const response = await checkTikTokConnection(accessToken)

if (response.error) {
  console.error('Connection failed:', response.error.message)
} else {
  console.log('Connected:', response.data?.isConnected)
  console.log('User info:', response.data)
}
```

### 3. Exchange Authorization Code

```typescript
// After TikTok redirects back with code
const response = await exchangeTikTokCode(code)

if (response.data) {
  const { accessToken, refreshToken, expiresIn } = response.data
  
  // Store tokens
  localStorage.setItem('tiktok_access_token', accessToken)
  localStorage.setItem('tiktok_refresh_token', refreshToken)
  
  // Calculate expiry
  const expiresAt = new Date(Date.now() + expiresIn * 1000)
  localStorage.setItem('tiktok_token_expires_at', expiresAt.toISOString())
}
```

### 4. Get User Information

```typescript
const response = await getTikTokUserInfo(accessToken)

if (response.data) {
  console.log('User:', response.data.displayName)
  console.log('Avatar:', response.data.avatarUrl)
  console.log('Followers:', response.data.followerCount)
}
```

### 5. Refresh Token

```typescript
const response = await refreshTikTokToken(refreshToken)

if (response.data) {
  // Update stored tokens
  localStorage.setItem('tiktok_access_token', response.data.accessToken)
}
```

### 6. Disconnect Account

```typescript
const response = await disconnectTikTok(accessToken)

if (response.data?.success) {
  // Clear all TikTok data
  localStorage.removeItem('tiktok_access_token')
  localStorage.removeItem('tiktok_refresh_token')
  localStorage.removeItem('tiktok_user_info')
  localStorage.removeItem('tiktok_token_expires_at')
}
```

## React Hook Usage

### Import

```typescript
import useTikTokAuth from '@/lib/auth/useTikTokAuth'
```

### Basic Usage

```typescript
function MyComponent() {
  const {
    isConnected,
    isLoading,
    error,
    userInfo,
    connectionData,
    checkConnection,
    refreshUserInfo,
    clearError,
    disconnect,
  } = useTikTokAuth()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <div>
      {isConnected ? (
        <div>
          <p>Connected as {userInfo?.displayName}</p>
          <img src={userInfo?.avatarUrl} alt="Avatar" />
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <p>Not connected</p>
      )}
    </div>
  )
}
```

### With Custom Token

```typescript
const { isConnected } = useTikTokAuth(customToken)
```

### Without Auto-Check

```typescript
const { isConnected, checkConnection } = useTikTokAuth(undefined, false)

// Manually trigger connection check
useEffect(() => {
  checkConnection()
}, [checkConnection])
```

## Component Examples

### 1. TikTok Connect Button

```typescript
'use client'

import { generateTikTokAuthUrl } from '@/lib/auth/tiktokApi'
import { STORAGE_KEYS } from '@/lib/auth/authConstants'

export function TikTokConnectButton() {
  const handleConnect = () => {
    const { authUrl, state } = generateTikTokAuthUrl()
    
    // Store state for verification
    localStorage.setItem(STORAGE_KEYS.TIKTOK_AUTH_STATE, state)
    
    // Redirect to TikTok
    window.location.href = authUrl
  }

  return (
    <button
      onClick={handleConnect}
      className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
    >
      Connect TikTok
    </button>
  )
}
```

### 2. TikTok Status Display

```typescript
'use client'

import useTikTokAuth from '@/lib/auth/useTikTokAuth'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'

export function TikTokStatus() {
  const {
    isConnected,
    isLoading,
    error,
    userInfo,
    refreshUserInfo,
    disconnect,
  } = useTikTokAuth()

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Checking connection...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-red-600">
        <XCircle className="w-4 h-4" />
        <span>{error}</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {isConnected && userInfo ? (
        <div className="flex items-center gap-4">
          <img
            src={userInfo.avatarUrl}
            alt={userInfo.displayName}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <p className="font-semibold">{userInfo.displayName}</p>
            <p className="text-sm text-gray-600">
              {userInfo.followerCount?.toLocaleString()} followers
            </p>
          </div>
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
      ) : (
        <p>Not connected to TikTok</p>
      )}
      
      <div className="flex gap-2">
        <button
          onClick={refreshUserInfo}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Refresh
        </button>
        {isConnected && (
          <button
            onClick={disconnect}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Disconnect
          </button>
        )}
      </div>
    </div>
  )
}
```

### 3. OAuth Callback Handler

```typescript
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { exchangeTikTokCode } from '@/lib/auth/tiktokApi'
import { STORAGE_KEYS } from '@/lib/auth/authConstants'

export default function TikTokCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code')
      const state = searchParams.get('state')
      const storedState = localStorage.getItem(STORAGE_KEYS.TIKTOK_AUTH_STATE)

      // Verify state for CSRF protection
      if (state !== storedState) {
        setStatus('error')
        setError('Invalid state parameter')
        return
      }

      if (!code) {
        setStatus('error')
        setError('No authorization code received')
        return
      }

      // Exchange code for token
      const response = await exchangeTikTokCode(code)

      if (response.error) {
        setStatus('error')
        setError(response.error.message)
        return
      }

      if (response.data) {
        // Store tokens
        localStorage.setItem(STORAGE_KEYS.TIKTOK_ACCESS_TOKEN, response.data.accessToken)
        
        if (response.data.refreshToken) {
          localStorage.setItem(STORAGE_KEYS.TIKTOK_REFRESH_TOKEN, response.data.refreshToken)
        }

        // Calculate and store expiry
        const expiresAt = new Date(Date.now() + response.data.expiresIn * 1000)
        localStorage.setItem(STORAGE_KEYS.TIKTOK_TOKEN_EXPIRES_AT, expiresAt.toISOString())

        // Clean up state
        localStorage.removeItem(STORAGE_KEYS.TIKTOK_AUTH_STATE)

        setStatus('success')
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      }
    }

    handleCallback()
  }, [searchParams, router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      {status === 'loading' && (
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Connecting to TikTok...</p>
        </div>
      )}
      
      {status === 'success' && (
        <div className="text-center">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-4" />
          <p>Successfully connected!</p>
          <p className="text-sm text-gray-600">Redirecting...</p>
        </div>
      )}
      
      {status === 'error' && (
        <div className="text-center">
          <XCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  )
}
```

## Best Practices

### 1. Error Handling

Always check for errors in API responses:

```typescript
const response = await checkTikTokConnection(token)

if (response.error) {
  // Handle error
  console.error(response.error.message)
  // Show user-friendly error message
  setErrorMessage('Failed to connect to TikTok. Please try again.')
} else {
  // Handle success
  console.log(response.data)
}
```

### 2. Token Management

- Store tokens securely in localStorage
- Check token expiry before making requests
- Implement automatic token refresh
- Clear tokens on logout

```typescript
const isTokenExpired = () => {
  const expiresAt = localStorage.getItem(STORAGE_KEYS.TIKTOK_TOKEN_EXPIRES_AT)
  if (!expiresAt) return true
  return new Date(expiresAt) <= new Date()
}

if (isTokenExpired()) {
  // Refresh token
  const refreshToken = localStorage.getItem(STORAGE_KEYS.TIKTOK_REFRESH_TOKEN)
  if (refreshToken) {
    await refreshTikTokToken(refreshToken)
  }
}
```

### 3. Loading States

Always show loading indicators:

```typescript
const { isLoading } = useTikTokAuth()

if (isLoading) {
  return <LoadingSpinner />
}
```

### 4. CSRF Protection

Always use state parameter for OAuth:

```typescript
const { authUrl, state } = generateTikTokAuthUrl()
localStorage.setItem('tiktok_auth_state', state)

// In callback, verify state matches
const receivedState = searchParams.get('state')
const storedState = localStorage.getItem('tiktok_auth_state')

if (receivedState !== storedState) {
  throw new Error('Invalid state parameter')
}
```

### 5. Type Safety

Use TypeScript types for all API responses:

```typescript
import type { TikTokUserInfo, TikTokApiResponse } from '@/lib/auth/types/tiktokTypes'

const response: TikTokApiResponse<TikTokUserInfo> = await getTikTokUserInfo(token)
```

## Debugging

Enable debug logs by setting `NODE_ENV=development`:

```env
NODE_ENV=development
```

Debug logs will appear in the console with emoji prefixes:
- 🚀 Request sent
- ✅ Success
- ❌ Error
- ⚠️ Warning
- 🔗 URL generated
- 🔌 Disconnection

## Common Issues

### 1. "No access token found"

**Solution:** Ensure token is stored in localStorage after OAuth callback.

### 2. "Token has expired"

**Solution:** Implement token refresh logic or prompt user to reconnect.

### 3. "Invalid state parameter"

**Solution:** Ensure state is stored before redirecting and verified in callback.

### 4. CORS errors

**Solution:** Configure your backend to allow requests from your frontend domain.

## Support

For issues or questions:
1. Check the console for debug logs
2. Verify environment variables are set correctly
3. Ensure TikTok app is configured properly in the developer portal
4. Check TikTok API documentation for any changes

## Resources

- [TikTok for Developers](https://developers.tiktok.com/)
- [TikTok API Documentation](https://developers.tiktok.com/doc/login-kit-web)
- [OAuth 2.0 Specification](https://oauth.net/2/)
