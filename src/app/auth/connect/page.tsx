"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Home-Content/Header";
import { Footer } from "@/components/Home-Content/Footer";
import { ExternalLink, Loader2, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { generateTikTokAuthUrl, getTikTokTokenFromBackend } from "@/lib/auth/tiktokApi";
import { STORAGE_KEYS } from "@/lib/auth/authConstants";
import { checkTikTokConnectionStatus, storeTikTokConnection } from "@/lib/auth/authFlow";

export default function ConnectPage() {
  const [isConnecting, setIsConnecting] = useState(false);
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [alreadyConnected, setAlreadyConnected] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Check if already connected
  useEffect(() => {
    // First, do a quick local check (cached tokens)
    const { isConnected } = checkTikTokConnectionStatus();
    if (isConnected) {
      setAlreadyConnected(true);
      return;
    }

    // Then, confirm via backend: GET /tiktok/get-token
    const run = async () => {
      try {
        const appToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        if (!appToken) return;

        const res = await getTikTokTokenFromBackend(appToken);
        if (res?.success && res.data?.access_token) {
          // Store tokens locally to unify connection checks across the app
          const expiresIn = typeof res.data.expires_in === 'number'
            ? res.data.expires_in
            : // fallback if only expires_at exists
              (res.data.expires_at ? Math.max(0, Math.floor((new Date(res.data.expires_at).getTime() - Date.now()) / 1000)) : 0);

          storeTikTokConnection({
            accessToken: res.data.access_token,
            refreshToken: res.data.refresh_token ?? undefined,
            expiresIn,
            userInfo: {
              open_id: res.data.open_id,
              scope: res.data.scope,
            },
          });

          setAlreadyConnected(true);
        }
      } catch (err) {
        // Silent fail; keep showing connect UI
        console.warn('TikTok backend token check failed:', err);
      }
    };

    run();
  }, []);

  const handleConnectTikTok = () => {
    setIsConnecting(true);
    
    try {
      // Generate TikTok OAuth URL
      const { authUrl, state } = generateTikTokAuthUrl();
      
      // Store state for CSRF verification
      localStorage.setItem(STORAGE_KEYS.TIKTOK_AUTH_STATE, state);
      
      // Redirect to TikTok OAuth
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error generating TikTok auth URL:', error);
      setIsConnecting(false);
    }
  };

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A012A] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-[#6C63FF] animate-spin mx-auto mb-4" />
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0A012A]">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A012A] via-[#1A103D] to-[#0A012A] pb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/10 via-[#FF2E97]/10 to-[#6C63FF]/10"></div>
      </section>

      {/* Connect Section */}
      <section className="py-12 relative overflow-hidden bg-gradient-to-br from-[#0A012A] via-[#1A103D] to-[#0A012A]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/8 via-[#FF2E97]/8 to-[#6C63FF]/8"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto">
            <Card className="bg-[#1A103D]/30 backdrop-blur-sm border-0 shadow-2xl shadow-[#6C63FF]/50 ring-0">
              <CardContent className="p-12 text-center">
                {/* TikTok Logo */}
                <div className="w-24 h-24 bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg
                    className="h-12 w-12 text-white fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-white mb-8">
                  {alreadyConnected ? "TikTok Already Connected!" : "Connect Your TikTok Channel"}
                </h1>

                {alreadyConnected ? (
                  <>
                    {/* Success Icon */}
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                    
                    {/* Go to Dashboard Button */}
                    <Button
                      onClick={handleGoToDashboard}
                      className="w-full bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] hover:from-[#5A52E6] hover:to-[#E61E87] text-white font-semibold py-4 rounded-2xl transition-all duration-300 mb-4"
                    >
                      Go to Dashboard
                    </Button>

                    <p className="text-[#C5C5D2] text-sm">
                      Your TikTok account is already connected. Head to the dashboard to manage your content.
                    </p>
                  </>
                ) : (
                  <>
                    {/* Connect Button */}
                    <Button
                      onClick={handleConnectTikTok}
                      disabled={isConnecting}
                      className="w-full bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] hover:from-[#5A52E6] hover:to-[#E61E87] text-white font-semibold py-4 rounded-2xl transition-all duration-300 mb-8"
                    >
                      {isConnecting ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <ExternalLink className="h-5 w-5 mr-2" />
                          Connect with TikTok
                        </>
                      )}
                    </Button>

                    {/* Loading Bar */}
                    {isConnecting && (
                      <div className="w-full bg-[#2A1A4D] rounded-full h-2 mb-4">
                        <div
                          className="bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] h-2 rounded-full animate-pulse"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    )}

                    {/* Info Text */}
                    <p className="text-[#C5C5D2] text-sm">
                      {isConnecting
                        ? "Redirecting to TikTok authorization..."
                        : "Connect your TikTok account to start automating your posts"}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
