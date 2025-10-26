import { Header } from "@/components/Home-Content/Header"
import { Footer } from "@/components/Home-Content/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Heart, TrendingUp, Globe, Shield, Zap } from "lucide-react"

export default function AboutPage() {
  const stats = [
    { icon: Users, value: "50K+", label: "Active Creators", color: "text-[#6C63FF]" },
    { icon: Target, value: "1M+", label: "Videos Scheduled", color: "text-[#FF2E97]" },
    { icon: TrendingUp, value: "300%", label: "Average Growth", color: "text-[#00F5FF]" },
    { icon: Globe, value: "150+", label: "Countries Served", color: "text-[#6C63FF]" }
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      description: "Former TikTok executive with 10+ years in social media strategy.",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      description: "AI and machine learning expert with a passion for creator tools.",
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      description: "Product strategist focused on creator empowerment and growth.",
      avatar: "ER"
    },
    {
      name: "David Kim",
      role: "Head of Engineering",
      description: "Full-stack engineer building scalable automation solutions.",
      avatar: "DK"
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
              About Us
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Empowering Creators Worldwide
            </h1>
            <p className="text-xl md:text-2xl text-[#C5C5D2] mb-8 max-w-3xl mx-auto">
              We&apos;re on a mission to democratize social media success by providing creators with the tools they need to grow, engage, and monetize their TikTok presence.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#1A103D] via-[#0A012A] to-[#1A103D]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/8 via-[#FF2E97]/8 to-[#6C63FF]/8"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Impact</h2>
            <p className="text-xl text-[#C5C5D2] max-w-2xl mx-auto">
              Numbers that speak to our success
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300 bg-[#1A103D]/50 backdrop-blur-sm border-0 shadow-xl shadow-[#6C63FF]/30">
                <CardContent className="p-8">
                  <stat.icon className={`h-12 w-12 ${stat.color} mx-auto mb-4`} />
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-[#C5C5D2] text-lg">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#0A012A] via-[#1A103D] to-[#0A012A]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/8 via-[#FF2E97]/8 to-[#6C63FF]/8"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Our Mission</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-[#1A103D]/50 backdrop-blur-sm border-0 shadow-xl shadow-[#6C63FF]/30">
                <CardContent className="p-8 text-center">
                  <Heart className="h-12 w-12 text-[#FF2E97] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-4">Creator-First</h3>
                  <p className="text-[#C5C5D2]">
                    We believe every creator deserves access to professional-grade tools that were previously only available to large brands.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-[#1A103D]/50 backdrop-blur-sm border-0 shadow-xl shadow-[#6C63FF]/30">
                <CardContent className="p-8 text-center">
                  <Zap className="h-12 w-12 text-[#6C63FF] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-4">Innovation</h3>
                  <p className="text-[#C5C5D2]">
                    We continuously push the boundaries of what&apos;s possible with AI and automation to stay ahead of the curve.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-[#1A103D]/50 backdrop-blur-sm border-0 shadow-xl shadow-[#6C63FF]/30">
                <CardContent className="p-8 text-center">
                  <Shield className="h-12 w-12 text-[#00F5FF] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-4">Trust & Security</h3>
                  <p className="text-[#C5C5D2]">
                    Your content and data security are our top priorities, with enterprise-grade protection and privacy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#1A103D] via-[#0A012A] to-[#1A103D]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/8 via-[#FF2E97]/8 to-[#6C63FF]/8"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Meet Our Team</h2>
            <p className="text-xl text-[#C5C5D2] max-w-2xl mx-auto">
              The passionate people behind our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300 bg-[#1A103D]/50 backdrop-blur-sm border-0 shadow-xl shadow-[#6C63FF]/30">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 group-hover:from-[#5A52E6] group-hover:to-[#E61E87] transition-colors">
                    {member.avatar}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-[#6C63FF] font-semibold mb-4">{member.role}</p>
                  <p className="text-[#C5C5D2] text-sm">{member.description}</p>
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
            Join Our Community
          </h2>
          <p className="text-xl text-[#C5C5D2] mb-12 max-w-3xl mx-auto leading-relaxed">
            Be part of the future of content creation and social media growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/auth/signup" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] hover:from-[#5A52E6] hover:to-[#E61E87] text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg shadow-[#6C63FF]/30">
              Get Started Today
            </a>
            <a href="/features" className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-[#3A2A5D] text-[#C5C5D2] hover:bg-[#1A103D] hover:text-white rounded-2xl transition-all duration-300">
              Explore Features
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}