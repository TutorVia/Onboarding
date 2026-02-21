import { useState } from "react";
import { GraduationCap, Target, Heart, Users, Globe, Shield } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DemoModal } from "@/components/landing/DemoModal";
import { Button } from "@/components/ui/button";

const values = [
  { icon: Target, title: "Personalized Learning", desc: "Every student gets a tailored curriculum designed around their unique goals, pace, and learning style." },
  { icon: Heart, title: "Passionate Educators", desc: "Our tutors are handpicked for their expertise and genuine love for teaching. Only top 5% applicants make the cut." },
  { icon: Users, title: "One-on-One Focus", desc: "No group classes. Every session is dedicated entirely to one student, ensuring maximum attention and progress." },
  { icon: Globe, title: "Global Access", desc: "Connect with tutors from anywhere in the world. All you need is an internet connection and a desire to learn." },
  { icon: Shield, title: "Quality Guaranteed", desc: "If you're not satisfied with your first session, we'll match you with another tutor or provide a full refund." },
  { icon: GraduationCap, title: "Proven Results", desc: "98% of our students report improved grades. Our tutors have helped 1,200+ students achieve their academic goals." },
];

export default function AboutPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9F8F6]" data-testid="about-page">
      <Navbar onOpenDemo={() => setDemoOpen(true)} />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="font-accent text-xl text-[#DF7861] mb-3">Our Story</p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2C3333] tracking-tight">
              About LearnSphere
            </h1>
            <p className="text-base md:text-lg text-[#6B7280] leading-relaxed mt-6">
              LearnSphere was born from a simple belief: every student deserves access to world-class, personalized education regardless of where they live. We connect passionate educators with eager learners for transformative one-on-one tutoring experiences.
            </p>
          </div>

          {/* Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-[#2F5D62] rounded-2xl p-8 text-white">
              <h2 className="font-heading text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-white/80 leading-relaxed">
                To democratize quality education by making personalized one-on-one tutoring accessible, affordable, and effective for every student worldwide. We believe in the power of individual attention to unlock every student's potential.
              </p>
            </div>
            <div className="bg-[#DF7861] rounded-2xl p-8 text-white">
              <h2 className="font-heading text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="text-white/80 leading-relaxed">
                To become the world's most trusted online tutoring platform, where every student finds the perfect tutor and every educator can make a meaningful impact. We envision a future where geography is no barrier to learning.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl p-8 border border-[#E2E0D6]/50 mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div><p className="font-heading text-3xl font-bold text-[#2F5D62]">1,200+</p><p className="text-sm text-[#6B7280] mt-1">Students Enrolled</p></div>
              <div><p className="font-heading text-3xl font-bold text-[#2F5D62]">50+</p><p className="text-sm text-[#6B7280] mt-1">Expert Tutors</p></div>
              <div><p className="font-heading text-3xl font-bold text-[#2F5D62]">25+</p><p className="text-sm text-[#6B7280] mt-1">Subjects</p></div>
              <div><p className="font-heading text-3xl font-bold text-[#2F5D62]">98%</p><p className="text-sm text-[#6B7280] mt-1">Satisfaction Rate</p></div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="font-heading text-3xl font-semibold text-[#2C3333] text-center mb-10">What Sets Us Apart</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v) => (
                <div key={v.title} className="bg-white rounded-2xl p-6 border border-[#E2E0D6]/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
                  <div className="w-12 h-12 bg-[#2F5D62]/10 rounded-xl flex items-center justify-center mb-4">
                    <v.icon className="w-6 h-6 text-[#2F5D62]" />
                  </div>
                  <h3 className="font-heading font-semibold text-[#2C3333]">{v.title}</h3>
                  <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="font-heading text-2xl font-semibold text-[#2C3333] mb-4">Ready to Start Learning?</h2>
            <Button
              data-testid="about-book-demo-btn"
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
