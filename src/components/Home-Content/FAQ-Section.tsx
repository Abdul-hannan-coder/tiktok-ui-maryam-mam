import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export function FAQSection() {
  return (
<section className="relative overflow-hidden bg-gradient-to-br from-[#1A103D] via-[#0A012A] to-[#1A103D] py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/8 via-[#FF2E97]/8 to-[#6C63FF]/8"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
            <p className="text-xl text-[#C5C5D2] max-w-2xl mx-auto">
              Everything you need to know about our platform
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border-0 rounded-xl px-6 py-3 bg-[#1A103D]/50 backdrop-blur-sm hover:bg-[#1A103D]/70 transition-all duration-300 shadow-lg shadow-[#6C63FF]/20">
                <AccordionTrigger className="text-left text-white font-semibold text-base hover:text-[#6C63FF] transition-colors py-2">
                  How accurate is the AI-generated content?
                </AccordionTrigger>
                <AccordionContent className="text-[#C5C5D2] text-sm leading-relaxed pt-2">
                  Our AI is trained on millions of successful TikTok videos and achieves 95% accuracy in generating
                  relevant content and captions. You can always edit and customize the generated content before
                  publishing.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-0 rounded-xl px-6 py-3 bg-[#1A103D]/50 backdrop-blur-sm hover:bg-[#1A103D]/70 transition-all duration-300 shadow-lg shadow-[#6C63FF]/20">
                <AccordionTrigger className="text-left text-white font-semibold text-base hover:text-[#6C63FF] transition-colors py-2">
                  What TikTok account types are supported?
                </AccordionTrigger>
                <AccordionContent className="text-[#C5C5D2] text-sm leading-relaxed pt-2">
                  We support all TikTok account types including personal, business, and verified accounts. 
                  Maximum video length is 3 minutes with full media support.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-0 rounded-xl px-6 py-3 bg-[#1A103D]/50 backdrop-blur-sm hover:bg-[#1A103D]/70 transition-all duration-300 shadow-lg shadow-[#6C63FF]/20">
                <AccordionTrigger className="text-left text-white font-semibold text-base hover:text-[#6C63FF] transition-colors py-2">
                  Can I schedule videos for specific times?
                </AccordionTrigger>
                <AccordionContent className="text-[#C5C5D2] text-sm leading-relaxed pt-2">
                  Yes! You can schedule videos for any date and time. Our system will automatically publish your content
                  when scheduled, even if you&apos;re offline.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-0 rounded-xl px-6 py-3 bg-[#1A103D]/50 backdrop-blur-sm hover:bg-[#1A103D]/70 transition-all duration-300 shadow-lg shadow-[#6C63FF]/20">
                <AccordionTrigger className="text-left text-white font-semibold text-base hover:text-[#6C63FF] transition-colors py-2">
                  Is there a free trial available?
                </AccordionTrigger>
                <AccordionContent className="text-[#C5C5D2] text-sm leading-relaxed pt-2">
                  Yes, we offer a 14-day free trial with full access to all features. No credit card required to get
                  started.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-0 rounded-xl px-6 py-3 bg-[#1A103D]/50 backdrop-blur-sm hover:bg-[#1A103D]/70 transition-all duration-300 shadow-lg shadow-[#6C63FF]/20">
                <AccordionTrigger className="text-left text-white font-semibold text-base hover:text-[#6C63FF] transition-colors py-2">
                  How secure is my content?
                </AccordionTrigger>
                <AccordionContent className="text-[#C5C5D2] text-sm leading-relaxed pt-2">
                  We use enterprise-grade security with end-to-end encryption. Your videos are processed securely and
                  automatically deleted from our servers after 30 days.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    )
  }
