"use client"

import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Video, 
  FileText, 
  Calendar,
  Clock,
  Upload,
  ArrowLeft,
  Send,
  Play
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function VideoTextPostPage() {
  const [formData, setFormData] = useState({
    text: "",
    scheduledDate: "",
    scheduledTime: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle post creation logic here
    console.log("Creating video + text post:", formData)
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
                <h1 className="text-3xl font-bold text-white">Create Video + Text Post</h1>
                <p className="text-gray-300">Upload videos and write engaging descriptions</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Video className="h-5 w-5" />
                <span>Upload Video</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-purple-500 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 mb-2">Drag and drop video here</p>
                <p className="text-gray-400 text-sm mb-4">or click to browse</p>
                <Button variant="outline" className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white">
                  Choose Video File
                </Button>
              </div>
              
              {/* Video Preview */}
              <div className="mt-6">
                <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center relative">
                  <Play className="h-12 w-12 text-gray-500" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="w-full bg-gray-600 rounded-full h-1">
                      <div className="bg-purple-500 h-1 rounded-full" style={{width: '30%'}}></div>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">0:45 / 2:30</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Text & Schedule Section */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Post Content</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Text Content */}
                <div className="space-y-2">
                  <Label htmlFor="text" className="text-gray-300 font-medium">
                    Video Description
                  </Label>
                  <Textarea
                    id="text"
                    name="text"
                    placeholder="Write your video description here..."
                    value={formData.text}
                    onChange={handleInputChange}
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 min-h-[120px]"
                    required
                  />
                  <p className="text-gray-400 text-sm">
                    {formData.text.length}/280 characters
                  </p>
                </div>

                {/* Scheduling */}
                <div className="space-y-4">
                  <Label className="text-gray-300 font-medium flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Schedule Post</span>
                  </Label>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="scheduledDate" className="text-gray-400 text-sm">
                        Date
                      </Label>
                      <Input
                        id="scheduledDate"
                        name="scheduledDate"
                        type="date"
                        value={formData.scheduledDate}
                        onChange={handleInputChange}
                        className="bg-gray-700/50 border-gray-600 text-white focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scheduledTime" className="text-gray-400 text-sm">
                        Time
                      </Label>
                      <Input
                        id="scheduledTime"
                        name="scheduledTime"
                        type="time"
                        value={formData.scheduledTime}
                        onChange={handleInputChange}
                        className="bg-gray-700/50 border-gray-600 text-white focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-2xl transition-all duration-300"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Post Now
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white px-6 py-3 rounded-2xl"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Post Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">U</span>
                </div>
                <div>
                  <p className="text-white font-medium">Learn Ai With Uzair</p>
                  <p className="text-gray-400 text-sm">@MuhammadUz1654</p>
                </div>
              </div>
              
              <p className="text-gray-200 mb-4 leading-relaxed">
                {formData.text || "Your video description will appear here..."}
              </p>
              
              <div className="aspect-video bg-gray-600 rounded-lg flex items-center justify-center relative mb-4">
                <Play className="h-12 w-12 text-gray-400" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-full bg-gray-500 rounded-full h-1">
                    <div className="bg-purple-500 h-1 rounded-full" style={{width: '30%'}}></div>
                  </div>
                </div>
              </div>
              
              <div className="text-gray-400 text-sm">
                {formData.scheduledDate && formData.scheduledTime ? (
                  <p>Scheduled for: {formData.scheduledDate} at {formData.scheduledTime}</p>
                ) : (
                  <p>Posted now</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
