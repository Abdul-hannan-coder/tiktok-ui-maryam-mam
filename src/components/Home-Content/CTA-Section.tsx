import Link from "next/link";

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1A103D] via-[#0A012A] to-[#1A103D] py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/8 via-[#FF2E97]/8 to-[#6C63FF]/8"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Ready to Transform Your TikTok Presence?
        </h2>
        <p className="text-xl text-[#C5C5D2] mb-12 max-w-3xl mx-auto leading-relaxed">
          Join thousands of creators who have already automated their TikTok success with AI-powered content generation and smart scheduling.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button size="lg" variant="default" className="text-lg px-10 py-6 group bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] hover:from-[#5A52E6] hover:to-[#E61E87] text-white rounded-2xl" asChild>
            <Link href="/auth/signup">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-10 py-6 bg-transparent border-[#3A2A5D] text-[#C5C5D2] hover:bg-[#1A103D] hover:text-white rounded-2xl" asChild>
            <Link href="#how-it-works">Learn More</Link>
          </Button>
        </div>
        <div className="mt-12 text-center">
          <p className="text-[#C5C5D2] text-sm">
            ✨ No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}
