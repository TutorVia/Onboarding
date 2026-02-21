import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DemoModal } from "@/components/landing/DemoModal";
import { useState } from "react";

export default function TermsPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9F8F6]" data-testid="terms-page">
      <Navbar onOpenDemo={() => setDemoOpen(true)} />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-3xl">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#2C3333] tracking-tight mb-8">Terms of Service</h1>
          <p className="text-sm text-[#6B7280] mb-8">Last updated: February 12, 2026</p>

          <div className="space-y-8 text-[#2C3333]">
            <section><h2 className="font-heading text-xl font-semibold mb-3">1. Acceptance of Terms</h2><p className="text-sm text-[#6B7280] leading-relaxed">By accessing and using LearnSphere ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms apply to all users including students, parents, and tutors.</p></section>

            <section><h2 className="font-heading text-xl font-semibold mb-3">2. Services Description</h2><p className="text-sm text-[#6B7280] leading-relaxed">LearnSphere provides an online platform connecting students with qualified tutors for one-on-one educational sessions. Our services include session booking, live video tutoring, study material delivery, and progress tracking. We act as an intermediary between students and tutors.</p></section>

            <section><h2 className="font-heading text-xl font-semibold mb-3">3. User Accounts</h2><p className="text-sm text-[#6B7280] leading-relaxed">Users must provide accurate and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials. You must be at least 13 years old to create an account, or have parental consent if under 18. We reserve the right to suspend or terminate accounts that violate these terms.</p></section>

            <section><h2 className="font-heading text-xl font-semibold mb-3">4. Booking & Cancellation Policy</h2><p className="text-sm text-[#6B7280] leading-relaxed">Sessions can be booked through our platform based on tutor availability. Cancellations made at least 4 hours before the scheduled session will receive a full refund or credit. Late cancellations or no-shows may result in forfeiture of the session fee. Tutors may reschedule sessions with at least 24 hours' notice.</p></section>

            <section><h2 className="font-heading text-xl font-semibold mb-3">5. Payment Terms</h2><p className="text-sm text-[#6B7280] leading-relaxed">All payments are processed securely through our approved payment gateways. Prices are listed in the applicable currency and include all applicable taxes. Refunds are processed within 5-7 business days. We reserve the right to modify pricing with prior notice to users.</p></section>

            <section><h2 className="font-heading text-xl font-semibold mb-3">6. Intellectual Property</h2><p className="text-sm text-[#6B7280] leading-relaxed">All content on the platform, including study materials, videos, and resources, is owned by LearnSphere or our tutors. Users may not reproduce, distribute, or create derivative works from our content without explicit written permission. Materials provided during sessions are for personal educational use only.</p></section>

            <section><h2 className="font-heading text-xl font-semibold mb-3">7. Code of Conduct</h2><p className="text-sm text-[#6B7280] leading-relaxed">Users must maintain respectful and professional behavior during all interactions on the platform. Harassment, discrimination, or inappropriate behavior of any kind will result in immediate account termination. Both students and tutors are expected to be punctual for scheduled sessions.</p></section>

            <section><h2 className="font-heading text-xl font-semibold mb-3">8. Limitation of Liability</h2><p className="text-sm text-[#6B7280] leading-relaxed">LearnSphere is not liable for any indirect, incidental, or consequential damages arising from the use of our platform. We do not guarantee specific academic outcomes. Our liability is limited to the amount paid for the specific service in question.</p></section>

            <section><h2 className="font-heading text-xl font-semibold mb-3">9. Contact</h2><p className="text-sm text-[#6B7280] leading-relaxed">For questions about these terms, contact us at:<br />Phone: +91-7009201851 / +91-9878035355<br />Email: tutorviaa@gmail.com</p></section>
          </div>
        </div>
      </div>
      <Footer />
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
