"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { Key, Trash2, Save, AlertTriangle, Twitter } from "lucide-react"

export default function SettingsPage() {
  const [geminiKey, setGeminiKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Load saved Gemini key on component mount
  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key')
    if (savedKey) {
      setGeminiKey(savedKey)
    }
  }, [])

  const handleSaveKey = async () => {
    if (!geminiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid Gemini API key",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    try {
      // Save to localStorage (in a real app, this would be saved to a backend)
      localStorage.setItem('gemini_api_key', geminiKey)
      
      toast({
        title: "Success",
        description: "Gemini API key saved successfully",
      })
    } catch {
      toast({
        title: "Error",
        description: "Failed to save Gemini API key",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveKey = () => {
    localStorage.removeItem('gemini_api_key')
    setGeminiKey("")
    toast({
      title: "Success",
      description: "Gemini API key removed successfully",
    })
  }

  const handleDisconnectTikTok = () => {
    // Clear TikTok connection data
    localStorage.removeItem('tiktok_access_token')
    localStorage.removeItem('tiktok_user_data')
    
    toast({
      title: "Disconnected",
      description: "Successfully disconnected from TikTok",
    })
    
    // In a real app, you might want to redirect to login or show a reconnection option
    // For now, we'll just show a success message
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between px-2 sm:px-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Settings</h1>
            <p className="text-[#C5C5D2] mt-1 sm:mt-2 text-sm sm:text-base">Manage your account settings and API keys</p>
          </div>
        </div>

        {/* Gemini API Key Section */}
        <Card className="bg-[#1A103D]/50 backdrop-blur-sm border-0 shadow-xl shadow-[#6C63FF]/30 mx-2 sm:mx-0">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-white flex items-center space-x-2 text-lg sm:text-xl">
              <Key className="h-4 w-4 sm:h-5 sm:w-5 text-[#6C63FF]" />
              <span>Gemini API Key</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor="gemini-key" className="text-[#C5C5D2] text-sm sm:text-base">
                API Key
              </Label>
              <Input
                id="gemini-key"
                type="password"
                placeholder="Enter your Gemini API key"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                className="bg-[#2A1A4D]/50 border-0 text-white placeholder-[#C5C5D2] focus:border-[#6C63FF] h-10 sm:h-11 text-sm sm:text-base shadow-lg shadow-[#6C63FF]/20"
              />
              <p className="text-xs sm:text-sm text-[#C5C5D2] leading-relaxed">
                Your API key is stored locally and used to generate content with Gemini AI.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    disabled={isLoading || !geminiKey.trim()}
                    className="bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] hover:from-[#5A52E6] hover:to-[#E61E87] text-white w-full sm:w-auto h-10 sm:h-11 text-sm sm:text-base shadow-lg shadow-[#6C63FF]/30"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? "Saving..." : "Save Key"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[#1A103D] border-0 shadow-2xl shadow-[#6C63FF]/50 mx-4 sm:mx-0 max-w-sm sm:max-w-md">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white text-lg sm:text-xl">Save Gemini API Key?</AlertDialogTitle>
                    <AlertDialogDescription className="text-[#C5C5D2] text-sm sm:text-base">
                      This will save your Gemini API key locally. Make sure you&apos;ve entered the correct key.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <AlertDialogCancel className="bg-[#2A1A4D] text-[#C5C5D2] hover:bg-[#3A2A5D] w-full sm:w-auto h-10 sm:h-11 text-sm sm:text-base">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleSaveKey}
                      className="bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] hover:from-[#5A52E6] hover:to-[#E61E87] text-white w-full sm:w-auto h-10 sm:h-11 text-sm sm:text-base"
                    >
                      Save Key
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              
              {geminiKey && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white w-full sm:w-auto h-10 sm:h-11 text-sm sm:text-base"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Key
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-[#1A103D] border-0 shadow-2xl shadow-[#6C63FF]/50 mx-4 sm:mx-0 max-w-sm sm:max-w-md">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white text-lg sm:text-xl">Remove Gemini API Key?</AlertDialogTitle>
                      <AlertDialogDescription className="text-[#C5C5D2] text-sm sm:text-base">
                        This will permanently remove your saved Gemini API key. You&apos;ll need to enter it again to use Gemini features.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <AlertDialogCancel className="bg-[#2A1A4D] text-[#C5C5D2] hover:bg-[#3A2A5D] w-full sm:w-auto h-10 sm:h-11 text-sm sm:text-base">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleRemoveKey}
                        className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto h-10 sm:h-11 text-sm sm:text-base"
                      >
                        Remove Key
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </CardContent>
        </Card>

        {/* TikTok Connection Section */}
        <Card className="bg-[#1A103D]/50 backdrop-blur-sm border-0 shadow-xl shadow-[#6C63FF]/30 mx-2 sm:mx-0">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-white flex items-center space-x-2 text-lg sm:text-xl">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-[#6C63FF]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              <span>TikTok Connection</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between p-3 sm:p-4 bg-[#2A1A4D]/50 rounded-xl border-0 shadow-lg shadow-[#6C63FF]/20">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] rounded-full flex items-center justify-center shrink-0">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white font-medium text-sm sm:text-base truncate">@MuhammadUz1654</p>
                  <p className="text-[#C5C5D2] text-xs sm:text-sm">Connected</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 text-green-400 shrink-0">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs sm:text-sm">Active</span>
              </div>
            </div>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white w-full h-10 sm:h-11 text-sm sm:text-base"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Disconnect from TikTok
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[#1A103D] border-0 shadow-2xl shadow-[#6C63FF]/50 mx-4 sm:mx-0 max-w-sm sm:max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white text-lg sm:text-xl">Disconnect from TikTok?</AlertDialogTitle>
                  <AlertDialogDescription className="text-[#C5C5D2] text-sm sm:text-base">
                    This will disconnect your TikTok account from Postiva. You&apos;ll need to reconnect 
                    to post content and access your TikTok data. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <AlertDialogCancel className="bg-[#2A1A4D] text-[#C5C5D2] hover:bg-[#3A2A5D] w-full sm:w-auto h-10 sm:h-11 text-sm sm:text-base">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDisconnectTikTok}
                    className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto h-10 sm:h-11 text-sm sm:text-base"
                  >
                    Disconnect
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  )
}
