import { Header } from "@/components/Home-Content/Header"
import { Footer } from "@/components/Home-Content/Footer"
import { HeroSection } from "@/components/Home-Content/Hero-Section"
import { HeroWithImage } from "@/components/Home-Content/Hero-With-Image"
import { WorkSection } from "@/components/Home-Content/Work-Section"
import { HomeFeatureSection } from "@/components/Home-Content/Home-Feature-Section"
import { TestimonialsSection } from "@/components/Testimonials-Section"
import { FAQSection } from "@/components/Home-Content/FAQ-Section"
import { CTASection } from "@/components/Home-Content/CTA-Section"
import TikTokConnect from './auth/tiktok/connect';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A012A]">
      {/* Header */}
      <Header />
      {/* Original Hero Section */}
      <HeroSection />
      {/* New Hero Section with Image */}
      <HeroWithImage />
      {/* Work Section */}
      <WorkSection />
      {/* Features Section */}
      <HomeFeatureSection />
      {/* Testimonials Section */}
      <TestimonialsSection />
      {/* FAQ Section */}
      <FAQSection />
      {/* CTA Section */}
      <CTASection />
      {/* Footer */}
      <Footer />
      <TikTokConnect />
    </div>
  )
}
