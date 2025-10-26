import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
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
            AI-Powered TikTok Automation
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Automate Your TikTok Success
          </h1>
          <p className="text-xl md:text-2xl text-[#C5C5D2] mb-8 max-w-3xl mx-auto">
            Schedule videos, generate engaging content, and grow your TikTok presence with AI. 
            Automate your social media strategy with one click.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="default" className="text-lg px-8 py-6 group bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] hover:from-[#5A52E6] hover:to-[#E61E87] text-white" asChild>
              <Link href="/auth/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent border-[#3A2A5D] text-[#C5C5D2] hover:bg-[#1A103D] hover:text-white" asChild>
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}