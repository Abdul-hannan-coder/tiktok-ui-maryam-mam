"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useTikTokUpload } from "@/lib/upload"
import { ArrowLeft, Upload, CheckCircle2, AlertCircle, RefreshCw, Link2 } from "lucide-react"

export default function VideoUrlUploadPage() {
  const [title, setTitle] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const { isUploading, error, message, result, lastStatus, uploadVideoByUrl, checkStatus, reset } = useTikTokUpload()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await uploadVideoByUrl(videoUrl.trim(), title.trim())
  }

  const handleCheckStatus = async () => {
    const statusUrl = result?.status_check_url
    if (statusUrl) {
      await checkStatus(statusUrl)
    }
  }

  const handleReset = () => {
    reset()
    setTitle("")
    setVideoUrl("")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="relative overflow-hidden bg-linear-to-br from-black via-gray-900 to-black rounded-2xl p-8">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-4">
              <Link href="/dashboard/upload" className="p-2 text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">Upload TikTok Video via URL</h1>
                <p className="text-gray-300">Paste a public video URL and give it a title.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Card */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Import by URL</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-gray-300 font-medium">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a title for your video"
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="videoUrl" className="text-gray-300 font-medium">Video URL</Label>
                  <Input
                    id="videoUrl"
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://example.com/video.mp4"
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                  <p className="text-gray-400 text-sm flex items-center gap-1">
                    <Link2 className="h-4 w-4" /> Ensure the URL is publicly accessible
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    disabled={isUploading}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    {isUploading ? 'Uploading…' : 'Upload via URL'}
                  </Button>
                  <Button type="button" variant="outline" className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white" onClick={handleReset}>
                    Reset
                  </Button>
                </div>
              </form>

              {/* Error */}
              {error && (
                <div className="mt-4 flex items-start gap-2 text-red-400">
                  <AlertCircle className="h-5 w-5 mt-0.5" />
                  <div>
                    <p className="font-medium">Upload failed</p>
                    <p className="text-sm opacity-90">{error}</p>
                  </div>
                </div>
              )}

              {/* Success */}
              {result && (
                <div className="mt-6 space-y-3 rounded-lg border border-emerald-600/30 bg-emerald-950/30 p-4">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="h-5 w-5" />
                    <p className="font-medium">{message || 'Video uploaded. Processing asynchronously.'}</p>
                  </div>
                  <div className="text-gray-300 text-sm">
                    <p><span className="text-gray-400">Publish ID:</span> {result.publish_id}</p>
                    {result.upload_status && (
                      <p><span className="text-gray-400">Upload Status:</span> {result.upload_status}</p>
                    )}
                    {result.file_info?.filename && (
                      <p><span className="text-gray-400">File:</span> {String(result.file_info.filename)}</p>
                    )}
                    {result.status_check_url && (
                      <div className="mt-3 flex items-center gap-3">
                        <Button size="sm" onClick={handleCheckStatus} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                          <RefreshCw className="h-4 w-4 mr-1" /> Check Status
                        </Button>
                        <code className="text-xs text-gray-400 break-all">{result.status_check_url}</code>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Processing Status</CardTitle>
            </CardHeader>
            <CardContent>
              {lastStatus ? (
                <div className="space-y-2 text-gray-300">
                  <p><span className="text-gray-400">Publish ID:</span> {lastStatus.data.publish_id}</p>
                  {"state" in lastStatus.data && (
                    <p><span className="text-gray-400">State:</span> {String(lastStatus.data.state)}</p>
                  )}
                  {"error" in lastStatus.data && lastStatus.data.error && (
                    <p className="text-red-400"><span className="text-gray-400">Error:</span> {String(lastStatus.data.error)}</p>
                  )}
                </div>
              ) : (
                <p className="text-gray-400">No status fetched yet. Upload a video and click "Check Status".</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
