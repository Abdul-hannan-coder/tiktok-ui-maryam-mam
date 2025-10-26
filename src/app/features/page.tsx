import { Header } from "@/components/Home-Content/Header"
import { Footer } from "@/components/Home-Content/Footer"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Target, Zap, Users, Sparkles, CheckCircle, BarChart3, Calendar, Brain, Shield, Globe, Smartphone } from "lucide-react"

export default function FeaturesPage() {
  const features = [
    {
      icon: Brain,
      title: "AI Content Generation",
      description: "Generate viral TikTok videos and captions using advanced AI that understands trending topics and your audience preferences.",
      color: "text-[#6C63FF]"
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Schedule your content for optimal posting times based on your audience activity and engagement patterns.",
      color: "text-[#FF2E97]"
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Track your performance with detailed analytics and get insights to improve your content strategy.",
      color: "text-[#00F5FF]"
    },
    {
      icon: Target,
      title: "Audience Targeting",
      description: "Reach the right audience with AI-powered targeting that maximizes engagement and growth.",
      color: "text-[#6C63FF]"
    },
    {
      icon: Zap,
      title: "Automation Tools",
      description: "Automate repetitive tasks and focus on creating amazing content while we handle the rest.",
      color: "text-[#FF2E97]"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Collaborate with your team members and manage multiple TikTok accounts from one dashboard.",
      color: "text-[#00F5FF]"
    },
    {
      icon: Sparkles,
      title: "Trend Analysis",
      description: "Stay ahead of trends with real-time analysis of what's working in your niche and industry.",
      color: "text-[#6C63FF]"
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      description: "Enterprise-grade security ensures your content and data are always protected and private.",
      color: "text-[#FF2E97]"
    },
    {
      icon: Globe,
      title: "Multi-Platform Support",
      description: "Manage TikTok and other social platforms from one unified dashboard for maximum efficiency.",
      color: "text-[#00F5FF]"
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      description: "Manage your TikTok presence on the go with our intuitive mobile app for iOS and Android.",
      color: "text-[#6C63FF]"
    }
  ]

  return (
    <div className="min-h-screen bg-[#0A012A]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A012A] via-[#1A103D] to-[#0A012A] pt-20 pb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/10 via-[#FF2E97]/10 to-[#6C63FF]/10"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Glow Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6C63FF]/30 to-transparent"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF2E97]/30 to-transparent"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6C63FF]/30 to-transparent"></div>
        
        {/* Vertical Glow Lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#6C63FF]/20 to-transparent"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#FF2E97]/20 to-transparent"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-[#6C63FF]/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="default" className="mb-6 bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] text-white">
              Powerful Features
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Everything You Need to Succeed
            </h1>
            <p className="text-xl md:text-2xl text-[#C5C5D2] mb-8 max-w-3xl mx-auto">
              Discover the comprehensive suite of tools designed to elevate your TikTok presence and maximize your growth potential.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#1A103D] via-[#0A012A] to-[#1A103D]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/8 via-[#FF2E97]/8 to-[#6C63FF]/8"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">All Features</h2>
            <p className="text-xl text-[#C5C5D2] max-w-2xl mx-auto">
              Comprehensive tools to grow your TikTok presence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 bg-[#1A103D]/50 backdrop-blur-sm border-0 shadow-xl shadow-[#6C63FF]/30">
                <CardHeader>
                  <feature.icon className={`h-8 w-8 ${feature.color} mb-2`} />
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#C5C5D2]">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#0A012A] via-[#1A103D] to-[#0A012A]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/8 via-[#FF2E97]/8 to-[#6C63FF]/8"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-[#C5C5D2] mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of creators who are already using our platform to grow their TikTok presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/auth/signup" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] hover:from-[#5A52E6] hover:to-[#E61E87] text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg shadow-[#6C63FF]/30">
              Start Free Trial
            </a>
            <a href="/about" className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-[#3A2A5D] text-[#C5C5D2] hover:bg-[#1A103D] hover:text-white rounded-2xl transition-all duration-300">
              Learn More
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}