"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { 
  Home, 
  Upload, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User,
  Twitter
} from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    
    // Redirect to login page
    router.push('/auth/login')
  }

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: Home },
    { name: "Upload Post", href: "/dashboard/upload", icon: Upload },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-[#0A012A]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1A103D] border-r border-[#2A1A4D] transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-[#2A1A4D]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] rounded-full flex items-center justify-center">
              <svg className="h-5 w-5 text-white fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-white">Postiva</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-[#C5C5D2] hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 text-[#C5C5D2] hover:text-white hover:bg-[#2A1A4D] rounded-xl transition-all duration-200"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#2A1A4D]">
          <div className="flex items-center space-x-3 p-3 bg-[#2A1A4D]/50 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">test@gmail.com</p>
              <p className="text-xs text-[#C5C5D2] truncate">Connected to TikTok</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#C5C5D2] hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

       {/* Main content */}
       <div className="lg:pl-64">
         {/* Fixed Header */}
         <header className="fixed top-0 right-0 left-0 lg:left-64 bg-[#1A103D] border-b border-[#2A1A4D] px-4 py-4 z-30">
           <div className="flex items-center justify-between">
             <div className="flex items-center space-x-4">
               <button
                 onClick={() => setSidebarOpen(true)}
                 className="lg:hidden p-2 text-[#C5C5D2] hover:text-white transition-colors"
               >
                 <Menu className="h-5 w-5" />
               </button>
               <h1 className="text-xl font-semibold text-white">Dashboard</h1>
             </div>
             
             <div className="flex items-center space-x-4">
               <div className="flex items-center space-x-2 text-sm text-[#C5C5D2]">
                 <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                 </svg>
                 <span className="hidden sm:inline">@MuhammadUz1654</span>
                 <span className="sm:hidden">@MuhammadUz1654</span>
               </div>
             </div>
           </div>
         </header>

         {/* Page content with top padding for fixed header */}
         <main className="pt-20 p-6">
           {children}
         </main>
       </div>
    </div>
  )
}
