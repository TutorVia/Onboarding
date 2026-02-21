import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const CTASection = ({ onOpenDemo }) => {
  return (
    <section data-testid="cta-section" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#2F5D62] rounded-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#23464A] rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#DF7861]/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
          <Sparkles className="w-4 h-4 text-[#ECB390]" />
          <span className="text-sm text-white/80 font-medium">Start your journey today</span>
        </div>

        <h2 className="font-heading text-4xl md:text-5xl font-bold text-white tracking-tight">
          Ready to Transform
          <br />
          Your Learning Experience?
        </h2>
        <p className="text-base md:text-lg text-white/70 leading-relaxed mt-6 max-w-2xl mx-auto">
          Join thousands of students achieving their academic goals with personalized 
          one-on-one tutoring. Your first demo is completely free.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            data-testid="cta-book-demo-btn"
            onClick={onOpenDemo}
            className="bg-[#DF7861] hover:bg-[#C6604B] text-white rounded-full px-8 h-12 text-base shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Book a Free Demo
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <Button
            data-testid="cta-explore-btn"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 h-12 text-base transition-all duration-300"
            onClick={() => document.getElementById("subjects")?.scrollIntoView({ behavior: "smooth" })}
          >
            Browse Subjects
          </Button>
        </div>
        <p className="font-accent text-lg text-[#ECB390] mt-6">
          No credit card required. No obligations.
        </p>
      </div>
    </section>
  );
};
