# User Authentication Flow Documentation

## Overview
Complete authentication flow with TikTok connection integration for the Next.js application.

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER VISITS APP                           │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
                   ┌────────────────┐
                   │  Not Logged In │
                   └────────┬───────┘
                            │
                            ▼
              ┌─────────────────────────┐
              │  /auth/login (Login Page)│
              └──────────┬───────────────┘
                         │
            ┌────────────┴────────────┐
            │                         │
            ▼                         ▼
    ┌──────────────┐          ┌──────────────┐
    │ Email/Pass   │          │   Google     │
    │    Login     │          │    OAuth     │
    └──────┬───────┘          └──────┬───────┘
           │                         │
           └──────────┬──────────────┘
                      │
                      ▼
          ┌───────────────────────┐
          │  Login Successful     │
          │  (JWT Token Received) │
          └───────────┬───────────┘
                      │
                      ▼
          ┌───────────────────────────┐
          │ Check TikTok Connection   │
          │  (checkTikTokConnection)  │
          └──────┬──────────┬─────────┘
                 │          │
        ┌────────┘          └────────┐
        │                            │
        ▼                            ▼
┌───────────────┐          ┌──────────────────┐
│  NOT Connected│          │   CONNECTED      │
└───────┬───────┘          └────────┬─────────┘
        │                            │
        ▼                            ▼
┌────────────────────┐    ┌──────────────────────┐
│ /auth/connect      │    │   /dashboard         │
│ (Connect TikTok)   │    │   (Main Dashboard)   │
└────────┬───────────┘    └──────────────────────┘
         │
         ▼
┌──────────────────────────┐
│ User Clicks "Connect"    │
│ Generate OAuth URL       │
│ Store CSRF State         │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Redirect to TikTok       │
│ OAuth Authorization      │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ User Approves on TikTok  │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ /auth/tiktok/callback        │
│ (OAuth Callback Handler)     │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ 1. Verify CSRF State         │
│ 2. Exchange Code for Token   │
│ 3. Fetch User Info           │
│ 4. Store in LocalStorage     │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│   Redirect to /dashboard     │
└──────────────────────────────┘
```

## Authentication States

### 1. Not Authenticated
- **Location**: Any public page
- **Action**: Can browse public pages
- **Redirect**: Login page when trying to access protected routes

### 2. Authenticated (No TikTok)
- **Location**: /auth/connect
- **Action**: Must connect TikTok account
- **Redirect**: Cannot access dashboard until TikTok is connected

### 3. Fully Authenticated (With TikTok)
- **Location**: /dashboard and protected routes
- **Action**: Full access to all features
- **Redirect**: None (full access)

## Implementation Details

### Files Created/Modified

#### 1. `src/lib/auth/authFlow.ts` (NEW)
**Purpose**: Core authentication flow utilities

**Functions**:
- `checkTikTokConnectionStatus()` - Check if user has active TikTok connection
- `getPostLoginRedirectPath()` - Determine where to redirect after login
- `canAccessDashboard()` - Verify if user can access dashboard
- `storeTikTokConnection()` - Save TikTok credentials
- `clearTikTokConnection()` - Remove TikTok credentials

**Usage**:
```typescript
import { getPostLoginRedirectPath } from '@/lib/auth/authFlow'

const redirectPath = getPostLoginRedirectPath()
// Returns: '/dashboard' if TikTok connected
// Returns: '/auth/connect' if TikTok not connected
```

#### 2. `src/components/TikTokAuthGuard.tsx` (NEW)
**Purpose**: Protect routes requiring TikTok connection

**Component**: `<TikTokAuthGuard>`
```tsx
<TikTokAuthGuard>
  <YourProtectedComponent />
</TikTokAuthGuard>
```

**Hook**: `useTikTokAuthGuard()`
```typescript
const { isAuthorized, isChecking } = useTikTokAuthGuard()
```

#### 3. `src/app/auth/login/page.tsx` (MODIFIED)
**Changes**:
- Added TikTok connection check after login
- Dynamic redirect based on connection status
- Updated success message to reflect destination

**Flow**:
```typescript
await login(formData)
const redirectPath = getPostLoginRedirectPath()
// Redirects to /auth/connect OR /dashboard
router.push(redirectPath)
```

#### 4. `src/app/auth/connect/page.tsx` (MODIFIED)
**Changes**:
- Real OAuth URL generation
- CSRF state management
- Check if already connected
- Show different UI for connected users

**Flow**:
```typescript
const { authUrl, state } = generateTikTokAuthUrl()
localStorage.setItem('tiktok_auth_state', state)
window.location.href = authUrl // Redirect to TikTok
```

#### 5. `src/app/auth/tiktok/callback/page.tsx` (NEW)
**Purpose**: Handle OAuth callback from TikTok

**Flow**:
1. Verify CSRF state parameter
2. Exchange authorization code for access token
3. Fetch user information from TikTok
4. Store tokens and user info in localStorage
5. Redirect to dashboard

**Error Handling**:
- Invalid state → Security error
- No code → Authorization failed
- API errors → Display error with retry option

#### 6. `src/app/dashboard/page.tsx` (MODIFIED)
**Changes**:
- Wrapped with `TikTokAuthGuard`
- Protected from unauthorized access

**Implementation**:
```typescript
function DashboardPageWithGuard() {
  return (
    <TikTokAuthGuard>
      <DashboardPage />
    </TikTokAuthGuard>
  )
}
```

## Security Features

### 1. CSRF Protection
- State parameter generated for each OAuth request
- Stored in localStorage before redirect
- Verified on callback
- Prevents malicious authorization attempts

### 2. Token Management
- Access tokens stored securely in localStorage
- Expiry time tracked and validated
- Automatic expiry detection
- Refresh token support

### 3. Session Validation
- Multi-layer authentication checks
- Session ID validation
- Active user ID verification
- Token presence and validity

### 4. Route Protection
- Dashboard requires both auth + TikTok
- Automatic redirects prevent unauthorized access
- Loading states prevent UI flashing

## LocalStorage Keys

```typescript
// Auth Keys
'auth_token' - JWT authentication token
'user_data' - User profile information
'session_id' - Session identifier
'active_user_id' - Currently active user

// TikTok Keys
'tiktok_access_token' - TikTok OAuth access token
'tiktok_refresh_token' - Token for refreshing access
'tiktok_user_info' - TikTok user profile data
'tiktok_token_expires_at' - Token expiration timestamp
'tiktok_auth_state' - CSRF state for OAuth
```

## User Journey Examples

### Example 1: New User
```
1. Visit site → Homepage
2. Click "Login" → /auth/login
3. Enter credentials → Login successful
4. System checks TikTok → Not connected
5. Redirect → /auth/connect
6. Click "Connect TikTok" → TikTok OAuth
7. Approve on TikTok → Callback handler
8. Process tokens → Store data
9. Redirect → /dashboard ✓
```

### Example 2: Returning User (Connected)
```
1. Visit site → Homepage
2. Click "Login" → /auth/login
3. Enter credentials → Login successful
4. System checks TikTok → Connected!
5. Direct redirect → /dashboard ✓
```

### Example 3: User Tries to Access Dashboard Directly
```
1. Visit /dashboard → TikTokAuthGuard activates
2. Check auth token → Not found
3. Redirect → /auth/login
```

### Example 4: Authenticated but No TikTok
```
1. Visit /dashboard → TikTokAuthGuard activates
2. Check auth token → Found ✓
3. Check TikTok token → Not found
4. Redirect → /auth/connect
```

## Error Handling

### Login Errors
- Invalid credentials → Display error message
- Network error → Display retry option
- Server error → Display error with details

### TikTok Connection Errors
- User denies → Redirect to connect page with error
- Invalid state → Security error, retry required
- Token exchange fails → API error, retry option
- Network timeout → Retry with exponential backoff

### Dashboard Access Errors
- No auth token → Redirect to login
- Expired token → Force logout, redirect to login
- No TikTok connection → Redirect to connect
- Expired TikTok token → Redirect to connect

## Testing Checklist

- [ ] New user can sign up and is redirected to connect
- [ ] New user can connect TikTok and access dashboard
- [ ] Returning user with TikTok goes directly to dashboard
- [ ] User without TikTok cannot access dashboard
- [ ] User without auth token cannot access any protected route
- [ ] CSRF state validation works on callback
- [ ] Error states display correctly
- [ ] Loading states show during async operations
- [ ] Token expiry is detected correctly
- [ ] Logout clears all tokens and redirects properly

## Environment Variables Required

```env
# Backend API
NEXT_PUBLIC_API_BASE_URL=https://backend.postsiva.com

# TikTok OAuth
NEXT_PUBLIC_TIKTOK_CLIENT_KEY=your_client_key
TIKTOK_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_TIKTOK_REDIRECT_URI=http://localhost:3000/auth/tiktok/callback
```

## API Endpoints Required

Your backend must implement:

```
POST /api/auth/login
POST /api/auth/signup
POST /api/tiktok/token        - Exchange code for token
GET  /api/tiktok/connection   - Verify token validity
GET  /api/tiktok/user         - Get user information
POST /api/tiktok/refresh      - Refresh access token
DELETE /api/tiktok/disconnect - Disconnect account
```

## Next Steps

1. **Test the complete flow**
   - Run through each user journey
   - Test error cases
   - Verify security measures

2. **Add to other protected routes**
   - Apply `TikTokAuthGuard` to upload pages
   - Apply to settings page
   - Apply to any TikTok-dependent features

3. **Enhance user experience**
   - Add toast notifications
   - Add loading skeletons
   - Add reconnect prompts for expired tokens

4. **Monitor and optimize**
   - Add analytics tracking
   - Monitor OAuth success rates
   - Track error patterns

## Troubleshooting

### "Redirecting in a loop"
- Check if TikTok token is being stored correctly
- Verify localStorage keys match constants
- Check browser console for errors

### "CSRF validation failed"
- Ensure state is stored before redirect
- Check localStorage is enabled
- Verify callback URL matches registered URL

### "Cannot access dashboard"
- Check both auth_token and tiktok_access_token exist
- Verify tokens haven't expired
- Check TikTokAuthGuard is properly implemented

### "OAuth callback fails"
- Verify redirect URI matches TikTok app settings
- Check backend token exchange endpoint
- Ensure client credentials are correct

## Summary

✅ **Complete authentication flow implemented**
✅ **TikTok connection required for dashboard access**
✅ **Automatic redirects based on connection status**
✅ **CSRF protection with state parameter**
✅ **Error handling at every step**
✅ **Loading states for better UX**
✅ **Security best practices followed**

The user flow is now: **Login → Check TikTok → Connect (if needed) → Dashboard**
