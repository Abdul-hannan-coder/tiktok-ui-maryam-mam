import Link from "next/link"
import { Twitter, Linkedin, Mail, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#1A103D] via-[#0A012A] to-[#1A103D] border-t border-[#2A1A4D]">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] rounded-full flex items-center justify-center group-hover:from-[#5A52E6] group-hover:to-[#E61E87] transition-colors">
                <svg className="h-7 w-7 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">Postiva</span>
            </Link>
            <p className="text-[#C5C5D2] max-w-xs leading-relaxed">
              Automate your TikTok success with AI-powered content generation and smart scheduling. 
              Transform your social media strategy with one click.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 bg-[#1A103D] rounded-full text-[#C5C5D2] hover:text-white hover:bg-gradient-to-r hover:from-[#6C63FF] hover:to-[#FF2E97] transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 bg-[#1A103D] rounded-full text-[#C5C5D2] hover:text-white hover:bg-gradient-to-r hover:from-[#6C63FF] hover:to-[#FF2E97] transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 bg-[#1A103D] rounded-full text-[#C5C5D2] hover:text-white hover:bg-gradient-to-r hover:from-[#6C63FF] hover:to-[#FF2E97] transition-all duration-300">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 bg-[#1A103D] rounded-full text-[#C5C5D2] hover:text-white hover:bg-gradient-to-r hover:from-[#6C63FF] hover:to-[#FF2E97] transition-all duration-300">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-6">
            <h3 className="font-bold text-white text-lg">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-[#C5C5D2] hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#C5C5D2] hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#C5C5D2] hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">
                  API
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#C5C5D2] hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h3 className="font-bold text-white text-lg">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-[#C5C5D2] hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#C5C5D2] hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#C5C5D2] hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#C5C5D2] hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h3 className="font-bold text-white text-lg">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-[#C5C5D2] hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#C5C5D2] hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#C5C5D2] hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#C5C5D2] hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">
                  GDPR
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2A1A4D] mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#C5C5D2] text-sm">© 2025 Postiva. All rights reserved.</p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <span className="text-[#C5C5D2] text-sm">Made with</span>
            <span className="text-[#FF2E97] text-lg">❤️</span>
            <span className="text-[#C5C5D2] text-sm">for TikTok creators</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
