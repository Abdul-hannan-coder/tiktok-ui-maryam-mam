"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGoogleAuth } from "@/lib/auth";
import { getPostLoginRedirectPath } from "@/lib/auth/authFlow";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

function GoogleCallbackContent() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Completing Google Login...");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { handleGoogleCallback } = useGoogleAuth();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state") || "";
    const error = searchParams.get("error");

    // Check for OAuth errors
    if (error) {
      setStatus("error");
      setMessage(`Google OAuth error: ${error}`);
      return;
    }

    if (!code) {
      setStatus("error");
      setMessage("Authorization code missing from Google.");
      return;
    }

    const completeGoogleLogin = async () => {
      try {
        setMessage("Authenticating with Google...");
        await handleGoogleCallback(code, state);
        
        setMessage("Checking your account...");
        
        // Check TikTok connection and get appropriate redirect
        const redirectPath = getPostLoginRedirectPath();
        
        setStatus("success");
        
        if (redirectPath === '/dashboard') {
          setMessage("Login successful! You're all set. Redirecting to dashboard...");
        } else {
          setMessage("Login successful! Let's connect your TikTok account...");
        }
        
        setTimeout(() => router.push(redirectPath), 2000);
      } catch (err) {
        console.error('Google callback error:', err);
        setStatus("error");
        setMessage(err instanceof Error ? err.message : "Failed to complete Google login.");
      }
    };

    completeGoogleLogin();
  }, [searchParams, router, handleGoogleCallback]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A012A] via-[#1A103D] to-[#0A012A] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
        <div className="text-center space-y-6">
          {status === "loading" && (
            <>
              <Loader2 className="animate-spin w-16 h-16 mx-auto text-[#6C63FF]" />
              <h2 className="text-2xl font-bold text-white">Signing you in...</h2>
              <p className="text-[#C5C5D2]">{message}</p>
              <div className="w-full bg-[#2A1A4D] rounded-full h-2">
                <div className="bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] h-2 rounded-full animate-pulse w-2/3"></div>
              </div>
            </>
          )}
          {status === "success" && (
            <>
              <div className="w-16 h-16 bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="text-white w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-white">Success!</h2>
              <p className="text-[#C5C5D2]">{message}</p>
            </>
          )}
          {status === "error" && (
            <>
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
                <XCircle className="text-red-500 w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-white">Authentication Failed</h2>
              <p className="text-[#C5C5D2]">{message}</p>
              <button
                onClick={() => router.push('/auth/login')}
                className="w-full bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] hover:from-[#5A52E6] hover:to-[#E61E87] text-white font-semibold py-3 rounded-xl transition-all duration-300"
              >
                Back to Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-[#0A012A] via-[#1A103D] to-[#0A012A] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-[#6C63FF] animate-spin mx-auto mb-4" />
            <p className="text-[#C5C5D2]">Loading...</p>
          </div>
        </div>
      }
    >
      <GoogleCallbackContent />
    </Suspense>
  );
}
