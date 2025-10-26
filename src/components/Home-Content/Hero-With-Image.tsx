import Image from 'next/image'

export function HeroWithImage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0A012A] via-[#1A103D] to-[#0A012A] pt-20 pb-8">
      {/* Light Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5"></div>
      
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Mobile: Image First, Desktop: Text First */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <p className="text-lg sm:text-xl lg:text-2xl text-[#C5C5D2] mb-6 lg:mb-8 max-w-2xl mx-auto lg:mx-0">
              <span className="block sm:hidden">
                Grow your TikTok with AI automation. Plan, create, and schedule viral videos effortlessly.
              </span>
              <span className="hidden sm:block lg:hidden">
                Unlock TikTok growth with AI-powered automation. Plan, create, and schedule viral videos effortlessly. Boost engagement and expand your reach.
              </span>
              <span className="hidden lg:block">
                Unlock the easiest way to grow your TikTok profile with advanced, AI-powered automation. Effortlessly plan, create, and schedule viral-worthy videos—our tools help you boost engagement, analyze trends, and expand your reach without the manual grind. Whether you&apos;re a creator or a brand, let smart automation handle the tedious work, so you can focus on what matters most: building your unique presence and connecting with your audience.
              </span>
            </p>
          </div>
          
          {/* Mobile: Image First, Desktop: Image Second */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end mb-8 lg:mb-0">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/20 to-[#FF2E97]/20 rounded-lg blur-xl"></div>
              <Image
                src="/Image.png.jpg"
                alt="TikTok Automation Dashboard"
                width={600}
                height={400}
                className="relative rounded-lg shadow-2xl shadow-[#6C63FF]/30 w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
