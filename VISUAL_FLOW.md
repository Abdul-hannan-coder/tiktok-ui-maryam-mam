# 🎯 Visual User Flow - Quick Reference

## Complete Authentication Flow

```
                                    START
                                      │
                                      ▼
                              ┌───────────────┐
                              │  User Visits  │
                              │   Homepage    │
                              └───────┬───────┘
                                      │
                                      ▼
                              ┌───────────────┐
                              │ Click "Login" │
                              └───────┬───────┘
                                      │
                                      ▼
                        ╔═════════════════════════╗
                        ║   /auth/login (Page)    ║
                        ║                         ║
                        ║  • Email/Password form  ║
                        ║  • Google OAuth button  ║
                        ╚═════════╦═══════════════╝
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
          ┌──────────────────┐        ┌──────────────────┐
          │  Enter Email &   │        │   Click Google   │
          │    Password      │        │      Login       │
          └─────────┬────────┘        └─────────┬────────┘
                    │                           │
                    └─────────────┬─────────────┘
                                  │
                                  ▼
                        ┌──────────────────┐
                        │  Login API Call  │
                        │  (Backend Auth)  │
                        └─────────┬────────┘
                                  │
                        ┌─────────┴─────────┐
                        │                   │
                        ▼                   ▼
              ┌──────────────┐    ┌──────────────┐
              │   Success!   │    │    Error!    │
              │  Got JWT     │    │ Show Message │
              └──────┬───────┘    └──────────────┘
                     │
                     ▼
        ╔════════════════════════════════╗
        ║  checkTikTokConnectionStatus() ║
        ║                                ║
        ║  Checks localStorage for:      ║
        ║  • tiktok_access_token         ║
        ║  • tiktok_token_expires_at     ║
        ╚════════════╦═══════════════════╝
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
    ┌──────────┐          ┌──────────┐
    │   Has    │          │  Doesn't │
    │  TikTok  │          │   Have   │
    │Connected │          │  TikTok  │
    └────┬─────┘          └────┬─────┘
         │                     │
         │                     │
         ▼                     ▼
╔═══════════════════╗  ╔═══════════════════════╗
║   /dashboard      ║  ║  /auth/connect (Page) ║
║                   ║  ║                       ║
║ • User stats      ║  ║  • TikTok logo        ║
║ • Analytics       ║  ║  • Connect button     ║
║ • Upload content  ║  ║  • Instructions       ║
╚═══════════════════╝  ╚═════════╦═════════════╝
         │                       │
         │                       ▼
         │              ┌─────────────────┐
         │              │ User Clicks     │
         │              │ "Connect TikTok"│
         │              └────────┬────────┘
         │                       │
         │                       ▼
         │              ┌─────────────────────┐
         │              │ generateTikTokAuth  │
         │              │ Url()               │
         │              │                     │
         │              │ • Creates OAuth URL │
         │              │ • Generates state   │
         │              │ • Stores state      │
         │              └────────┬────────────┘
         │                       │
         │                       ▼
         │              ┌─────────────────────┐
         │              │ Redirect to TikTok  │
         │              │ OAuth Page          │
         │              │                     │
         │              │ (TikTok.com)        │
         │              └────────┬────────────┘
         │                       │
         │              ┌────────┴────────┐
         │              │                 │
         │              ▼                 ▼
         │     ┌──────────────┐  ┌──────────────┐
         │     │ User Approves│  │ User Denies  │
         │     └──────┬───────┘  └──────┬───────┘
         │            │                  │
         │            │                  └────── Error Redirect
         │            │
         │            ▼
         │   ╔════════════════════════════════╗
         │   ║ /auth/tiktok/callback (Page)   ║
         │   ║                                ║
         │   ║ 1. Verify CSRF State           ║
         │   ║ 2. Exchange Code for Token     ║
         │   ║ 3. Fetch TikTok User Info      ║
         │   ║ 4. Store in localStorage:      ║
         │   ║    • tiktok_access_token       ║
         │   ║    • tiktok_refresh_token      ║
         │   ║    • tiktok_user_info          ║
         │   ║    • tiktok_token_expires_at   ║
         │   ╚════════════════╦═══════════════╝
         │                   │
         │                   ▼
         │          ┌──────────────────┐
         │          │ Success! Tokens  │
         │          │     Stored       │
         │          └────────┬─────────┘
         │                   │
         └───────────────────┘
                     │
                     ▼
            ╔═══════════════════╗
            ║   /dashboard      ║
            ║                   ║
            ║ • Full Access!    ║
            ║ • All Features    ║
            ║ • Upload Videos   ║
            ╚═══════════════════╝
```

---

## Route Protection Flow

```
User Tries to Access /dashboard
         │
         ▼
   ┌──────────────┐
   │ TikTokAuth   │
   │    Guard     │
   │  Activates   │
   └──────┬───────┘
          │
          ▼
  ┌──────────────────┐
  │ Check auth_token │
  │ in localStorage  │
  └────────┬─────────┘
           │
     ┌─────┴─────┐
     │           │
     ▼           ▼
┌─────────┐  ┌─────────┐
│ Found ✓ │  │Not Found│
└────┬────┘  └────┬────┘
     │            │
     │            ▼
     │       Redirect to
     │       /auth/login
     │
     ▼
  ┌─────────────────────┐
  │ Check tiktok_access │
  │ _token              │
  └────────┬────────────┘
           │
     ┌─────┴─────┐
     │           │
     ▼           ▼
┌─────────┐  ┌─────────┐
│ Found ✓ │  │Not Found│
└────┬────┘  └────┬────┘
     │            │
     │            ▼
     │       Redirect to
     │       /auth/connect
     │
     ▼
  ┌──────────────┐
  │ Check token  │
  │ expiry date  │
  └────────┬─────┘
           │
     ┌─────┴──────┐
     │            │
     ▼            ▼
┌─────────┐  ┌──────────┐
│ Valid ✓ │  │ Expired  │
└────┬────┘  └────┬─────┘
     │            │
     │            ▼
     │       Redirect to
     │       /auth/connect
     │
     ▼
╔═══════════════╗
║   GRANTED!    ║
║               ║
║ Show Dashboard║
╚═══════════════╝
```

---

## OAuth Flow Detail

```
/auth/connect Page
      │
      ▼
┌──────────────────────────┐
│ generateTikTokAuthUrl()  │
│                          │
│ Generates:               │
│ • Client Key             │
│ • Response Type: "code"  │
│ • Scope: permissions     │
│ • Redirect URI           │
│ • State: random string   │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ Store State              │
│ localStorage.setItem(    │
│   'tiktok_auth_state',   │
│   state                  │
│ )                        │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ Redirect User            │
│ window.location.href =   │
│ TikTok OAuth URL         │
└──────────┬───────────────┘
           │
           ▼
   ┌───────────────┐
   │   User at     │
   │ TikTok.com    │
   │               │
   │ Grant Access? │
   └───────┬───────┘
           │
     ┌─────┴─────┐
     │           │
     ▼           ▼
┌─────────┐  ┌────────┐
│ Approve │  │ Deny   │
└────┬────┘  └───┬────┘
     │           │
     │           └─── Error Callback
     │
     ▼
TikTok Redirects:
callback?code=ABC&state=XYZ
     │
     ▼
/auth/tiktok/callback
     │
     ▼
┌──────────────────────────┐
│ Verify State             │
│                          │
│ stored === received ?    │
└──────────┬───────────────┘
           │
     ┌─────┴─────┐
     │           │
     ▼           ▼
┌─────────┐  ┌────────┐
│ Match ✓ │  │Mismatch│
└────┬────┘  └───┬────┘
     │           │
     │           └─── Security Error
     │
     ▼
┌──────────────────────────┐
│ Exchange Code for Token  │
│                          │
│ POST /api/tiktok/token   │
│ Body: { code, redirect } │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ Receive Tokens           │
│ • access_token           │
│ • refresh_token          │
│ • expires_in             │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ Fetch User Info          │
│                          │
│ GET /api/tiktok/user     │
│ Header: Bearer token     │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ storeTikTokConnection()  │
│                          │
│ Saves to localStorage:   │
│ • Tokens                 │
│ • Expiry                 │
│ • User Info              │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ Redirect to /dashboard   │
└──────────────────────────┘
```

---

## State Management (LocalStorage)

```
┌─────────────────────────────────────────┐
│          LocalStorage Keys              │
├─────────────────────────────────────────┤
│                                         │
│  Authentication Keys:                   │
│  ├─ auth_token (JWT)                    │
│  ├─ user_data (JSON)                    │
│  ├─ session_id                          │
│  └─ active_user_id                      │
│                                         │
│  TikTok Keys:                           │
│  ├─ tiktok_access_token (OAuth)         │
│  ├─ tiktok_refresh_token                │
│  ├─ tiktok_user_info (JSON)             │
│  ├─ tiktok_token_expires_at (ISO Date)  │
│  └─ tiktok_auth_state (CSRF)            │
│                                         │
└─────────────────────────────────────────┘
```

---

## Error Handling Paths

```
Any Step in Flow
      │
      ▼
┌──────────────┐
│ Error Occurs │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│ Error Type?          │
└──┬────────┬──────┬───┘
   │        │      │
   ▼        ▼      ▼
┌─────┐ ┌─────┐ ┌────┐
│Auth │ │OAuth│ │API │
│Error│ │Error│ │Err │
└──┬──┘ └──┬──┘ └─┬──┘
   │       │      │
   ▼       ▼      ▼
Show      Show   Show
Error     Error  Error
Message   +      +
↓         Retry  Retry
Redirect  Button Button
to Login  ↓      ↓
          Stay   Stay
          on     on
          Page   Page
```

---

## Quick Reference - Files

```
Created Files:
├─ src/lib/auth/authFlow.ts           ← Flow utilities
├─ src/components/TikTokAuthGuard.tsx ← Route protection
├─ src/app/auth/tiktok/callback/      ← OAuth callback
│  └─ page.tsx
├─ USER_AUTH_FLOW.md                  ← This documentation
├─ IMPLEMENTATION_SUMMARY.md          ← Complete summary
└─ .env.example                       ← Environment template

Modified Files:
├─ src/app/auth/login/page.tsx        ← Smart redirects
├─ src/app/auth/connect/page.tsx      ← Real OAuth
└─ src/app/dashboard/page.tsx         ← Protected route
```

---

## Decision Tree - Where User Goes

```
Is user logged in?
├─ No → /auth/login
└─ Yes
   └─ Has TikTok connected?
      ├─ No → /auth/connect
      └─ Yes → /dashboard ✓
```

---

**🎯 This visual guide shows the complete flow at a glance!**
