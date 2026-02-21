import { useState } from "react";
import { Link } from "react-router-dom";
import { teachers } from "@/data/teachers";
import { Star, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DemoModal } from "@/components/landing/DemoModal";

export default function TeachersPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9F8F6]" data-testid="teachers-page">
      <Navbar onOpenDemo={() => setDemoOpen(true)} />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-accent text-xl text-[#DF7861] mb-3">Our Faculty</p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2C3333] tracking-tight">
              Meet Our Expert Tutors
            </h1>
            <p className="text-base md:text-lg text-[#6B7280] leading-relaxed mt-4">
              Handpicked educators with years of teaching excellence and real-world expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <Link
                to={`/teachers/${teacher.slug}`}
                key={teacher.slug}
                data-testid={`teacher-link-${teacher.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 group border border-[#E2E0D6]/50"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-[#2C3333] text-lg">{teacher.name}</h3>
                  <p className="text-sm text-[#2F5D62] font-medium mt-1">{teacher.subject}</p>
                  <p className="text-xs text-[#6B7280] mt-1">{teacher.experienceYears} years experience</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="flex items-center gap-1 text-sm text-[#2C3333]">
                      <Star className="w-4 h-4 text-[#DF7861] fill-[#DF7861]" />
                      {teacher.rating}
                    </span>
                    <span className="text-xs text-[#6B7280]">{teacher.totalStudents} students</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {teacher.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs font-normal text-[#6B7280] border-[#E2E0D6]">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 mt-4 text-[#2F5D62] text-sm font-medium group-hover:gap-2 transition-all">
                    View Profile <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
