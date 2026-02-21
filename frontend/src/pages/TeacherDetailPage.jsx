import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { teachers } from "@/data/teachers";
import { ArrowLeft, Star, Clock, Users, BookOpen, Globe, Award, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DemoModal } from "@/components/landing/DemoModal";

export default function TeacherDetailPage() {
  const { slug } = useParams();
  const teacher = teachers.find((t) => t.slug === slug);
  const [demoOpen, setDemoOpen] = useState(false);

  if (!teacher) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl text-[#2C3333]">Teacher not found</h2>
          <Link to="/teachers" className="text-[#2F5D62] mt-4 inline-block">Back to Teachers</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6]" data-testid="teacher-detail-page">
      <Navbar onOpenDemo={() => setDemoOpen(true)} />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
          <Link to="/teachers" className="inline-flex items-center gap-2 text-[#2F5D62] text-sm font-medium mb-8 hover:gap-3 transition-all" data-testid="back-to-teachers">
            <ArrowLeft className="w-4 h-4" /> All Teachers
          </Link>

          {/* Profile Header */}
          <div className="bg-white rounded-2xl overflow-hidden border border-[#E2E0D6]/50 shadow-[0_4px_20px_rgb(0,0,0,0.03)] mb-8">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img src={teacher.image} alt={teacher.name} className="w-full h-64 md:h-full object-cover" />
              </div>
              <div className="p-6 md:p-8 md:w-2/3">
                <h1 className="font-heading text-3xl font-bold text-[#2C3333]">{teacher.name}</h1>
                <p className="text-[#2F5D62] font-medium mt-1">{teacher.subject}</p>
                <p className="text-sm text-[#6B7280] mt-1">{teacher.specialization}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#2F5D62]" />
                    <div><p className="font-heading font-bold text-[#2C3333]">{teacher.experienceYears} Yrs</p><p className="text-xs text-[#6B7280]">Experience</p></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#DF7861] fill-[#DF7861]" />
                    <div><p className="font-heading font-bold text-[#2C3333]">{teacher.rating}/5</p><p className="text-xs text-[#6B7280]">Rating</p></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#2F5D62]" />
                    <div><p className="font-heading font-bold text-[#2C3333]">{teacher.totalStudents}</p><p className="text-xs text-[#6B7280]">Students</p></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#2F5D62]" />
                    <div><p className="font-heading font-bold text-[#2C3333]">{teacher.totalSessions}</p><p className="text-xs text-[#6B7280]">Sessions</p></div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-5">
                  {teacher.tags.map((tag) => (
                    <Badge key={tag} className="bg-[#ECB390]/20 text-[#2C3333] border-[#ECB390]/30">{tag}</Badge>
                  ))}
                </div>

                <Button
                  data-testid="teacher-book-demo-btn"
                  onClick={() => setDemoOpen(true)}
                  className="mt-6 bg-[#2F5D62] hover:bg-[#23464A] text-white rounded-full px-8 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  Book a Session with {teacher.name.split(" ")[0]}
                </Button>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-[#E2E0D6]/50">
                <h2 className="font-heading text-xl font-semibold text-[#2C3333] mb-4">About</h2>
                <p className="text-[#6B7280] leading-relaxed">{teacher.bio}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-[#E2E0D6]/50">
                <h2 className="font-heading text-xl font-semibold text-[#2C3333] mb-4">Teaching Style</h2>
                <p className="text-[#6B7280] leading-relaxed">{teacher.teachingStyle}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-[#E2E0D6]/50">
                <h2 className="font-heading text-xl font-semibold text-[#2C3333] mb-4">Achievements</h2>
                <div className="space-y-3">
                  {teacher.achievements.map((a) => (
                    <div key={a} className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-[#DF7861]" />
                      <span className="text-[#2C3333] text-sm">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-[#E2E0D6]/50">
                <h3 className="font-heading font-semibold text-[#2C3333] mb-3">Qualifications</h3>
                <div className="space-y-2">
                  {teacher.qualifications.map((q) => (
                    <div key={q} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2F5D62] mt-0.5 shrink-0" />
                      <span className="text-sm text-[#6B7280]">{q}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-[#E2E0D6]/50">
                <h3 className="font-heading font-semibold text-[#2C3333] mb-3">Languages</h3>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#2F5D62]" />
                  <span className="text-sm text-[#6B7280]">{teacher.languages.join(", ")}</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-[#E2E0D6]/50">
                <h3 className="font-heading font-semibold text-[#2C3333] mb-3">Availability</h3>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#2F5D62]" />
                  <span className="text-sm text-[#6B7280]">{teacher.availability}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} defaultSubject={teacher.subject} />
    </div>
  );
}
