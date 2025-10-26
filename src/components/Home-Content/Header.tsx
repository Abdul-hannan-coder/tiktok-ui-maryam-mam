"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A012A] border-b border-[#2A1A4D]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="w-12 h-12 bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] rounded-full flex items-center justify-center group-hover:from-[#5A52E6] group-hover:to-[#E61E87] transition-all duration-300">
              <svg className="h-7 w-7 text-white fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </div>
            <span className="text-2xl font-bold text-white">Postiva</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-5">
            <Link
              href="#how-it-works"
              className="relative text-[#C5C5D2] hover:text-white transition-colors text-lg font-medium group"
            >
              How It Works
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
            </Link>
            <Link
              href="/features"
              className="relative text-[#C5C5D2] hover:text-white transition-colors text-lg font-medium group"
            >
              Features
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
            </Link>
            <Link
              href="/About"
              className="relative text-[#C5C5D2] hover:text-white transition-colors text-lg font-medium group"
            >
              About Us
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="px-4 py-2 text-sm font-medium bg-transparent border-[#3A2A5D] text-[#C5C5D2] hover:bg-[#1A103D] hover:text-white rounded-2xl" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button variant="default" className="px-6 py-2 text-sm font-medium bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] hover:from-[#5A52E6] hover:to-[#E61E87] text-white rounded-2xl" asChild>
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-white hover:text-[#C5C5D2] transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-[#2A1A4D]">
            <nav className="flex flex-col space-y-6">
              <Link
                href="#how-it-works"
                className="text-[#C5C5D2] hover:text-white transition-colors text-lg font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/features"
                className="text-[#C5C5D2] hover:text-white transition-colors text-lg font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/About"
                className="text-[#C5C5D2] hover:text-white transition-colors text-lg font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <div className="flex flex-col space-y-4 pt-6 border-t border-[#2A1A4D]">
                <Button variant="outline" className="px-4 py-2 text-sm font-medium bg-transparent border-[#3A2A5D] text-[#C5C5D2] hover:bg-[#1A103D] hover:text-white rounded-2xl" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button variant="default" className="px-6 py-2 text-sm font-medium bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] hover:from-[#5A52E6] hover:to-[#E61E87] text-white rounded-2xl" asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
