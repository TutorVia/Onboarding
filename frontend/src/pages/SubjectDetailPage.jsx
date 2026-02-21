import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { subjects, subjectIcons } from "@/data/subjects";
import { teachers } from "@/data/teachers";
import { ArrowLeft, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DemoModal } from "@/components/landing/DemoModal";
import { SubjectQueryModal } from "@/components/landing/SubjectQueryModal";

export default function SubjectDetailPage() {
  const { slug } = useParams();
  const subject = subjects.find((s) => s.slug === slug);
  const [demoOpen, setDemoOpen] = useState(false);
  const [queryOpen, setQueryOpen] = useState(false);
  const relatedTeachers = teachers.filter((t) => t.subjectSlugs?.includes(slug));

  if (!subject) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl text-[#2C3333]">Subject not found</h2>
          <Link to="/subjects" className="text-[#2F5D62] mt-4 inline-block">Back to Subjects</Link>
        </div>
      </div>
    );
  }

  const IconComp = subjectIcons[subject.icon];

  return (
    <div className="min-h-screen bg-[#F9F8F6]" data-testid="subject-detail-page">
      <Navbar onOpenDemo={() => setDemoOpen(true)} />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
          <Link to="/subjects" className="inline-flex items-center gap-2 text-[#2F5D62] text-sm font-medium mb-8 hover:gap-3 transition-all" data-testid="back-to-subjects">
            <ArrowLeft className="w-4 h-4" /> All Subjects
          </Link>

          {/* Header */}
          <div className="bg-white rounded-2xl p-8 border border-[#E2E0D6]/50 shadow-[0_4px_20px_rgb(0,0,0,0.03)] mb-8">
            <div className="flex items-start gap-5">
              <div className={`w-16 h-16 rounded-2xl ${subject.color} flex items-center justify-center shrink-0`}>
                {IconComp && <IconComp className="w-8 h-8" />}
              </div>
              <div className="flex-1">
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#2C3333]">{subject.name}</h1>
                <p className="text-[#6B7280] mt-2">{subject.shortDesc}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {subject.levels.map((l) => (
                    <Badge key={l} variant="outline" className="border-[#E2E0D6] text-[#6B7280] text-xs">{l}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button
                data-testid="subject-book-demo-btn"
                onClick={() => setDemoOpen(true)}
                className="bg-[#2F5D62] hover:bg-[#23464A] text-white rounded-full px-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                Book a Free Demo
              </Button>
              <Button
                data-testid="subject-ask-query-btn"
                onClick={() => setQueryOpen(true)}
                variant="outline"
                className="border-[#DF7861] text-[#DF7861] hover:bg-[#DF7861]/5 rounded-full px-6"
              >
                Ask a Query
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl p-6 border border-[#E2E0D6]/50">
                <h2 className="font-heading text-xl font-semibold text-[#2C3333] mb-4">About This Subject</h2>
                <p className="text-[#6B7280] leading-relaxed">{subject.fullDesc}</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#E2E0D6]/50">
                <h2 className="font-heading text-xl font-semibold text-[#2C3333] mb-4">Topics Covered</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {subject.topics.map((topic) => (
                    <div key={topic} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2F5D62]" />
                      <span className="text-[#2C3333] text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Teachers */}
              {relatedTeachers.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-[#E2E0D6]/50">
                  <h2 className="font-heading text-xl font-semibold text-[#2C3333] mb-4">Our {subject.name} Tutors</h2>
                  <div className="space-y-4">
                    {relatedTeachers.map((t) => (
                      <Link
                        key={t.slug}
                        to={`/teachers/${t.slug}`}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#F9F8F6] transition-colors"
                        data-testid={`related-teacher-${t.slug}`}
                      >
                        <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                        <div className="flex-1">
                          <p className="font-heading font-medium text-[#2C3333]">{t.name}</p>
                          <p className="text-xs text-[#6B7280]">{t.experienceYears} years experience</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-[#DF7861] fill-[#DF7861]" />
                          <span className="text-sm text-[#2C3333]">{t.rating}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-[#E2E0D6]/50">
                <h3 className="font-heading font-semibold text-[#2C3333] mb-3">Why Learn {subject.name}?</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{subject.whyLearn}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-[#E2E0D6]/50">
                <h3 className="font-heading font-semibold text-[#2C3333] mb-3">Career Paths</h3>
                <div className="space-y-2">
                  {subject.careerPaths.map((c) => (
                    <div key={c} className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2F5D62]" />
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} defaultSubject={subject.name} />
      <SubjectQueryModal open={queryOpen} onOpenChange={setQueryOpen} subject={subject.name} />
    </div>
  );
}
