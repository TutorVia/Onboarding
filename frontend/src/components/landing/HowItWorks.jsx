import { Search, CalendarDays, Video, TrendingUp } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Browse & Choose",
    desc: "Explore our curated list of expert tutors. Filter by subject, grade level, and availability to find your perfect match.",
    accent: "bg-[#2F5D62]",
  },
  {
    num: "02",
    icon: CalendarDays,
    title: "Book a Session",
    desc: "Pick a time that works for you. Our flexible scheduling adapts to your routine, with instant booking confirmations.",
    accent: "bg-[#DF7861]",
  },
  {
    num: "03",
    icon: Video,
    title: "Learn One-on-One",
    desc: "Join your personalized live session with screen sharing, interactive whiteboards, and real-time problem solving.",
    accent: "bg-[#ECB390]",
  },
  {
    num: "04",
    icon: TrendingUp,
    title: "Track Progress",
    desc: "Access lesson notes, practice materials, and progress reports. Watch your skills grow session after session.",
    accent: "bg-[#2F5D62]",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" data-testid="how-it-works-section" className="py-24 md:py-32 bg-[#ECEBE4]/40">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-accent text-xl text-[#DF7861] mb-3">Simple Process</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-[#2C3333] tracking-tight">
            How It Works
          </h2>
          <p className="text-base md:text-lg text-[#6B7280] leading-relaxed mt-4">
            Getting started is easy. Four simple steps to transform your learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.num}
              data-testid={`step-${step.num}`}
              className="relative group"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-40px)] border-t-2 border-dashed border-[#2F5D62]/20" />
              )}

              <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 ${step.accent} rounded-xl flex items-center justify-center`}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-heading text-3xl font-bold text-[#ECEBE4] group-hover:text-[#ECB390] transition-colors duration-300">{step.num}</span>
                </div>
                <h3 className="font-heading font-semibold text-[#2C3333] text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
