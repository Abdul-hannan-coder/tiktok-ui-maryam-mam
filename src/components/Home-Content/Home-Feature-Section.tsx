import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../ui/card";
import { Clock, Target, Zap, Users, Sparkles, CheckCircle } from "lucide-react";

export function HomeFeatureSection() {
  return (
<section className="relative overflow-hidden bg-gradient-to-br from-[#1A103D] via-[#0A012A] to-[#1A103D] py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/8 via-[#FF2E97]/8 to-[#6C63FF]/8"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Powerful Features</h2>
            <p className="text-xl text-[#C5C5D2] max-w-2xl mx-auto">
              Everything you need to scale your TikTok presence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-lg transition-all duration-300 bg-[#1A103D]/50 backdrop-blur-sm border-0 shadow-xl shadow-[#6C63FF]/30">
              <CardHeader>
                <Clock className="h-8 w-8 text-[#6C63FF] mb-2" />
                <CardTitle className="text-white">Time Saving</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#C5C5D2]">
                  Reduce content creation time by 80%. Focus on strategy while we handle the automation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 bg-[#1A103D]/50 backdrop-blur-sm border-0 shadow-xl shadow-[#6C63FF]/30">
              <CardHeader>
                <Target className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle className="text-white">SEO Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#C5C5D2]">
                  AI-generated videos and captions optimized for TikTok&apos;s algorithm and trending topics.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 bg-[#1A103D]/50 backdrop-blur-sm border-0 shadow-xl shadow-[#6C63FF]/30">
              <CardHeader>
                <Zap className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle className="text-white">Smart Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#C5C5D2]">
                  Schedule videos for peak engagement times based on your audience analytics and time zones.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 bg-[#1A103D]/50 backdrop-blur-sm border-0 shadow-xl shadow-[#6C63FF]/30">
              <CardHeader>
                <Users className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle className="text-white">Audience Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#C5C5D2]">
                  Get detailed analytics on what content performs best with your TikTok audience.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 bg-[#1A103D]/50 backdrop-blur-sm border-0 shadow-xl shadow-[#6C63FF]/30">
              <CardHeader>
                <Sparkles className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle className="text-white">AI Thumbnails</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#C5C5D2]">Generate viral video content and engaging captions that increases your reach and engagement.</CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 bg-[#1A103D]/50 backdrop-blur-sm border-0 shadow-xl shadow-[#6C63FF]/30">
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle className="text-white">Bulk Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#C5C5D2]">
                  Process multiple videos at once and manage your entire TikTok content pipeline.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

