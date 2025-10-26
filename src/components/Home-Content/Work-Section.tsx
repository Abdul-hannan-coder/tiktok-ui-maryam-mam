import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../ui/card";
import { Upload, Sparkles, Calendar } from "lucide-react";

export function WorkSection() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-gradient-to-br from-[#1A103D] via-[#0A012A] to-[#1A103D] py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/8 via-[#FF2E97]/8 to-[#6C63FF]/8"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">How It Works</h2>
          <p className="text-xl text-[#C5C5D2] max-w-2xl mx-auto">
            Three simple steps to transform your TikTok workflow
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-[#1A103D]/50 backdrop-blur-sm border-0 shadow-xl shadow-[#6C63FF]/30">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-[#5A52E6] group-hover:to-[#E61E87] transition-colors">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">1. Connect TikTok</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-[#C5C5D2]">
                Connect your TikTok account securely. Our system supports all TikTok account types and permissions.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-[#1A103D]/50 backdrop-blur-sm border-0 shadow-xl shadow-[#6C63FF]/30">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-[#5A52E6] group-hover:to-[#E61E87] transition-colors">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">2. AI Content Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-[#C5C5D2]">
                Our AI analyzes trending topics and generates engaging videos, captions, and content optimized for your audience.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-[#1A103D]/50 backdrop-blur-sm border-0 shadow-xl shadow-[#6C63FF]/30">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-[#6C63FF] to-[#FF2E97] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-[#5A52E6] group-hover:to-[#E61E87] transition-colors">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">3. Schedule & Engage</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-[#C5C5D2]">
                Schedule videos for optimal engagement times and automate interactions to grow your TikTok presence.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}