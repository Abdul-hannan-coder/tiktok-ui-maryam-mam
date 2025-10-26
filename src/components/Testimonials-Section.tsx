import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      avatar: "SJ",
      content: "This tool has revolutionized my TikTok workflow. I can now focus on strategy while AI handles the content generation and scheduling.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Tech Reviewer",
      avatar: "MC",
      content: "The AI-generated videos and captions are spot-on. My engagement rates have increased by 40% since using this platform.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Educational Creator",
      avatar: "ER",
      content: "Scheduling and publishing videos has never been easier. The automation features save me hours every week.",
      rating: 5
    }
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1A103D] via-[#0A012A] to-[#1A103D] py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/8 via-[#FF2E97]/8 to-[#6C63FF]/8"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-[#C5C5D2] max-w-2xl mx-auto">
            Join thousands of content creators who have transformed their TikTok workflow with our AI-powered automation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-[#1A103D]/50 backdrop-blur-sm border-0 shadow-xl shadow-[#6C63FF]/30">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 group-hover:from-[#5A52E6] group-hover:to-[#E61E87] transition-colors">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-[#C5C5D2]">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-[#C5C5D2] italic text-lg leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
