import { Link } from "react-router-dom";
import { subjects, subjectIcons } from "@/data/subjects";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DemoModal } from "@/components/landing/DemoModal";

export default function SubjectsPage() {
  const [search, setSearch] = useState("");
  const [demoOpen, setDemoOpen] = useState(false);
  const filtered = subjects.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.topics.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#F9F8F6]" data-testid="subjects-page">
      <Navbar onOpenDemo={() => setDemoOpen(true)} />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-accent text-xl text-[#DF7861] mb-3">Our Curriculum</p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2C3333] tracking-tight">
              Explore All Subjects
            </h1>
            <p className="text-base md:text-lg text-[#6B7280] leading-relaxed mt-4">
              Choose from 8+ subjects taught by expert tutors. Click any subject to learn more and submit a query.
            </p>
            <div className="relative max-w-md mx-auto mt-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
              <Input
                data-testid="subject-search-input"
                placeholder="Search subjects or topics..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-white border-[#E2E0D6] focus-visible:ring-[#2F5D62] h-11 rounded-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((subject) => {
              const IconComp = subjectIcons[subject.icon];
              return (
                <Link
                  to={`/subjects/${subject.slug}`}
                  key={subject.slug}
                  data-testid={`subject-link-${subject.slug}`}
                  className={`group bg-white rounded-2xl p-6 border ${subject.border} shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className={`w-12 h-12 rounded-xl ${subject.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {IconComp && <IconComp className="w-6 h-6" />}
                  </div>
                  <h3 className="font-heading font-semibold text-[#2C3333] text-xl">{subject.name}</h3>
                  <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">{subject.shortDesc}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {subject.topics.slice(0, 4).map((t) => (
                      <span key={t} className="text-xs bg-[#ECEBE4] text-[#6B7280] px-2 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 mt-4 text-[#2F5D62] text-sm font-medium group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#6B7280]">No subjects found matching "{search}"</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
