// TikTok API Types and Interfaces

export interface TikTokConnectionResponse {
  isConnected: boolean;
  userId?: string;
  username?: string;
  displayName?: string;
  avatarUrl?: string;
  expiresAt?: string;
}

export interface TikTokAuthUrlParams {
  clientId: string;
  redirectUri: string;
  scope: string[];
  state?: string;
}

export interface TikTokAuthUrlResponse {
  authUrl: string;
  state: string;
}

export interface TikTokTokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  tokenType: string;
  scope: string;
}

export interface TikTokUserInfo {
  openId: string;
  unionId?: string;
  displayName: string;
  avatarUrl: string;
  avatarLargeUrl?: string;
  followerCount?: number;
  followingCount?: number;
  videoCount?: number;
}

export interface TikTokError {
  code: string;
  message: string;
  details?: unknown;
}

export interface TikTokApiResponse<T> {
  data?: T;
  error?: TikTokError;
  message?: string;
}
