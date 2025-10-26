"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGoogleAuth } from "@/lib/auth";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

function GoogleCallbackContent() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { handleGoogleCallback } = useGoogleAuth();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state") || "";

    if (!code) {
      setStatus("error");
      setMessage("Authorization code missing.");
      return;
    }

    const completeGoogleLogin = async () => {
      try {
        await handleGoogleCallback(code, state);
        setStatus("success");
        setMessage("Login successful! Redirecting...");
        setTimeout(() => router.push("/dashboard"), 1500);
      } catch (err) {
        console.error(err);
        setStatus("error");
        setMessage("Failed to complete Google login.");
      }
    };

    completeGoogleLogin();
  }, [searchParams, router, handleGoogleCallback]);

  return (
    <div className="min-h-screen bg-[#0A012A] flex items-center justify-center">
      <div className="text-center text-white space-y-4">
        {status === "loading" && (
          <>
            <Loader2 className="animate-spin w-10 h-10 mx-auto" />
            <p>Completing Google Login...</p>
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle className="text-green-500 w-10 h-10 mx-auto" />
            <p>{message}</p>
          </>
        )}
        {status === "error" && (
          <>
            <XCircle className="text-red-500 w-10 h-10 mx-auto" />
            <p>{message}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-20">Loading callback...</div>}>
      <GoogleCallbackContent />
    </Suspense>
  );
}
