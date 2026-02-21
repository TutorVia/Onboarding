import { useState } from "react";
import { Search, CalendarDays, Video, TrendingUp, FileText, MessageSquare } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DemoModal } from "@/components/landing/DemoModal";
import { Button } from "@/components/ui/button";

const steps = [
  { num: "01", icon: Search, title: "Browse & Choose Your Tutor", desc: "Explore our curated directory of expert tutors. Filter by subject, grade level, rating, and availability. Read detailed profiles, check qualifications, and find the perfect match for your learning goals.", color: "bg-[#2F5D62]" },
  { num: "02", icon: CalendarDays, title: "Book Your Session", desc: "Pick a convenient date and time from your tutor's real-time availability calendar. Get instant confirmation with a meeting link. Reschedule anytime up to 4 hours before the session.", color: "bg-[#DF7861]" },
  { num: "03", icon: Video, title: "Attend Your Live Session", desc: "Join the one-on-one video session from any device. Your tutor uses screen sharing, interactive whiteboards, and real-time problem solving to make learning engaging and effective.", color: "bg-[#ECB390]" },
  { num: "04", icon: FileText, title: "Access Study Materials", desc: "After each session, your tutor uploads personalized notes, practice worksheets, and supplementary resources directly to your dashboard. Download and study at your own pace.", color: "bg-[#2F5D62]" },
  { num: "05", icon: TrendingUp, title: "Track Your Progress", desc: "Monitor your learning journey with detailed progress reports. See session history, completed topics, performance trends, and upcoming milestones all in one place.", color: "bg-[#DF7861]" },
  { num: "06", icon: MessageSquare, title: "Get Ongoing Support", desc: "Have a doubt between sessions? Use our messaging system to reach your tutor. Get quick clarifications, additional resources, and continuous guidance throughout your learning journey.", color: "bg-[#ECB390]" },
];

export default function HowItWorksPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9F8F6]" data-testid="how-it-works-page">
      <Navbar onOpenDemo={() => setDemoOpen(true)} />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="font-accent text-xl text-[#DF7861] mb-3">Our Process</p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2C3333] tracking-tight">
              How It Works
            </h1>
            <p className="text-base md:text-lg text-[#6B7280] leading-relaxed mt-4">
              From signing up to tracking progress, here's your complete learning journey with LearnSphere.
            </p>
          </div>

          {/* Workflow Steps */}
          <div className="relative">
            {/* Vertical connector line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#E2E0D6] -translate-x-1/2" />

            <div className="space-y-8 md:space-y-0">
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  data-testid={`workflow-step-${step.num}`}
                  className={`md:flex items-center gap-8 ${i % 2 === 0 ? "" : "md:flex-row-reverse"} relative md:py-8`}
                >
                  {/* Content */}
                  <div className={`md:w-[calc(50%-32px)] ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className={`bg-white rounded-2xl p-6 border border-[#E2E0D6]/50 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300 ${i % 2 === 0 ? "md:mr-0" : "md:ml-0"}`}>
                      <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                        <div className={`w-10 h-10 ${step.color} rounded-xl flex items-center justify-center shrink-0`}>
                          <step.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-heading text-4xl font-bold text-[#ECEBE4]">{step.num}</span>
                      </div>
                      <h3 className="font-heading font-semibold text-[#2C3333] text-lg mb-2">{step.title}</h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex w-16 h-16 shrink-0 items-center justify-center relative z-10">
                    <div className={`w-10 h-10 ${step.color} rounded-full flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-heading font-bold text-sm">{step.num}</span>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="md:w-[calc(50%-32px)]" />
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <h2 className="font-heading text-2xl font-semibold text-[#2C3333] mb-4">Ready to Begin?</h2>
            <p className="text-[#6B7280] mb-6">Start with a completely free demo session. No credit card required.</p>
            <Button
              data-testid="how-it-works-book-demo-btn"
              onClick={() => setDemoOpen(true)}
              className="bg-[#2F5D62] hover:bg-[#23464A] text-white rounded-full px-8 h-12 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Book a Free Demo
            </Button>
          </div>
        </div>
      </div>
      <Footer />
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
