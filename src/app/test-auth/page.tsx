"use client";

import { useAuth, useGoogleAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default function TestAuthPage() {
  const { isAuthenticated, user, logout } = useAuth();
  const { initiateGoogleLogin } = useGoogleAuth();

  return (
    <div className="min-h-screen bg-[#0A012A] p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Auth Test Page</h1>

        <div className="bg-[#1A103D]/30 backdrop-blur-sm border-0 shadow-2xl shadow-[#6C63FF]/50 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Authentication Status
          </h2>
          <p className="text-[#C5C5D2] mb-2">
            <strong>Authenticated:</strong> {isAuthenticated ? "Yes" : "No"}
          </p>
          {user && (
            <p className="text-[#C5C5D2] mb-2">
              <strong>User:</strong> {user.email} ({user.username})
            </p>
          )}
        </div>

        <div className="space-y-4">
          <Button
            onClick={initiateGoogleLogin}
            className="bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] hover:from-[#5A52E6] hover:to-[#E61E87] text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300"
          >
            Test Google Login
          </Button>

          {isAuthenticated && (
            <Button
              onClick={() => logout()}
              className="bg-gradient-to-r from-[#FF2E97] to-[#FF2E97] hover:from-[#E61E87] hover:to-[#E61E87] text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300"
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
