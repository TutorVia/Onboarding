import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Star, BookOpen, Award } from "lucide-react";

const stats = [
  { icon: Users, value: "1,200+", label: "Students Enrolled" },
  { icon: Star, value: "4.9/5", label: "Average Rating" },
  { icon: BookOpen, value: "25+", label: "Subjects Offered" },
  { icon: Award, value: "98%", label: "Success Rate" },
];

export const Hero = ({ onOpenDemo }) => {
  return (
    <section data-testid="hero-section" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#2F5D62]/5 rounded-full blur-3xl blob-animate pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#DF7861]/5 rounded-full blur-3xl blob-animate pointer-events-none" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-[#ECB390]/8 rounded-full blur-3xl blob-animate pointer-events-none" style={{ animationDelay: "4s" }} />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8">
            <div className="animate-stagger">
              <Badge className="bg-[#ECB390]/20 text-[#2C3333] border-[#ECB390]/30 hover:bg-[#ECB390]/30 font-body text-xs px-3 py-1">
                Personalized 1-on-1 Tutoring
              </Badge>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2C3333] tracking-tight leading-[1.1] mt-4">
                Unlock Your
                <span className="text-[#2F5D62] relative inline-block ml-3">
                  Potential
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8C50 2 150 2 198 8" stroke="#DF7861" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
                <br />
                With Expert Tutors
              </h1>

              <p className="text-base md:text-lg leading-relaxed text-[#6B7280] max-w-lg mt-4">
                Connect with world-class educators for personalized one-on-one sessions. 
                From K-12 to competitive exams, we make learning deeply effective and enjoyable.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button
                  data-testid="hero-book-demo-btn"
                  onClick={onOpenDemo}
                  className="bg-[#2F5D62] hover:bg-[#23464A] text-white rounded-full px-8 h-12 text-base shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  Book a Free Demo
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button
                  data-testid="hero-explore-btn"
                  variant="outline"
                  className="border-[#2F5D62]/20 text-[#2F5D62] hover:bg-[#2F5D62]/5 rounded-full px-8 h-12 text-base transition-all duration-300"
                  onClick={() => document.getElementById("subjects")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Explore Subjects
                </Button>
              </div>

              <p className="font-accent text-xl text-[#DF7861] mt-4">
                Join 1,200+ students already learning with us
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative animate-slide-left">
              <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgb(47,93,98,0.15)] border border-white/50">
                <img
                  src="https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="Student learning online with tutor"
                  className="w-full h-[350px] md:h-[450px] object-cover"
                  data-testid="hero-image"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 glass-surface rounded-2xl p-4 shadow-lg animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2F5D62] rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-[#2C3333] text-sm">4.9 Rating</p>
                    <p className="text-xs text-[#6B7280]">From 800+ reviews</p>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 glass-surface rounded-xl p-3 shadow-lg animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#DF7861] rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-heading font-semibold text-sm text-[#2C3333]">Live Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div data-testid="stats-bar" className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group" data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#2F5D62]/10 rounded-xl mb-3 group-hover:bg-[#2F5D62]/15 transition-colors duration-300">
                <stat.icon className="w-5 h-5 text-[#2F5D62]" />
              </div>
              <p className="font-heading text-2xl md:text-3xl font-bold text-[#2C3333]">{stat.value}</p>
              <p className="text-sm text-[#6B7280] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
