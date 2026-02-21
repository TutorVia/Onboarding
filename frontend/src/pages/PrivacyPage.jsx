import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DemoModal } from "@/components/landing/DemoModal";
import { useState } from "react";

export default function PrivacyPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9F8F6]" data-testid="privacy-page">
      <Navbar onOpenDemo={() => setDemoOpen(true)} />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-3xl">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#2C3333] tracking-tight mb-8">Privacy Policy</h1>
          <p className="text-sm text-[#6B7280] mb-8">Last updated: February 12, 2026</p>

          <div className="space-y-8 text-[#2C3333]">
            <section><h2 className="font-heading text-xl font-semibold mb-3">1. Information We Collect</h2><p className="text-sm text-[#6B7280] leading-relaxed">We collect information you provide directly: name, email address, phone number, grade level, subject preferences, and session booking details. We also automatically collect device information, IP addresses, browser type, and usage patterns through cookies and analytics tools to improve our services.</p></section>

            <section><h2 className="font-heading text-xl font-semibold mb-3">2. How We Use Your Information</h2><p className="text-sm text-[#6B7280] leading-relaxed">Your information is used to: match you with appropriate tutors, schedule and manage sessions, send booking confirmations and reminders, provide study materials, improve our platform and services, communicate important updates, and process payments. We may use anonymized data for analytics and service improvement.</p></section>

            <section><h2 className="font-heading text-xl font-semibold mb-3">3. Information Sharing</h2><p className="text-sm text-[#6B7280] leading-relaxed">We share your information only with: your assigned tutor (name, grade level, and subject interest), payment processors (for transaction processing), and service providers who help us operate the platform. We never sell your personal information to third parties for marketing purposes.</p></section>

            <section><h2 className="font-heading text-xl font-semibold mb-3">4. Data Security</h2><p className="text-sm text-[#6B7280] leading-relaxed">We implement industry-standard security measures including encryption (SSL/TLS), secure data storage, access controls, and regular security audits. Video sessions are conducted through encrypted connections. However, no method of transmission over the internet is 100% secure.</p></section>

            <section><h2 className="font-heading text-xl font-semibold mb-3">5. Data Retention</h2><p className="text-sm text-[#6B7280] leading-relaxed">We retain your personal information for as long as your account is active or as needed to provide services. Session recordings (if applicable) are retained for 30 days. You may request deletion of your data at any time by contacting our support team.</p></section>

            <section><h2 className="font-heading text-xl font-semibold mb-3">6. Your Rights</h2><p className="text-sm text-[#6B7280] leading-relaxed">You have the right to: access your personal data, correct inaccurate information, request deletion of your data, opt-out of marketing communications, and export your data in a portable format. To exercise these rights, contact us using the information below.</p></section>

            <section><h2 className="font-heading text-xl font-semibold mb-3">7. Children's Privacy</h2><p className="text-sm text-[#6B7280] leading-relaxed">For users under 18, we require parental consent for account creation. Parents can review, modify, or delete their child's information at any time. We do not knowingly collect information from children under 13 without verifiable parental consent.</p></section>

            <section><h2 className="font-heading text-xl font-semibold mb-3">8. Cookies</h2><p className="text-sm text-[#6B7280] leading-relaxed">We use essential cookies to operate the platform, analytics cookies to understand usage patterns, and preference cookies to remember your settings. You can manage cookie preferences through your browser settings.</p></section>

            <section><h2 className="font-heading text-xl font-semibold mb-3">9. Contact Us</h2><p className="text-sm text-[#6B7280] leading-relaxed">For privacy-related inquiries, contact us at:<br />Phone: +91-7009201851 / +91-9878035355<br />Email: tutorviaa@gmail.com</p></section>
          </div>
        </div>
      </div>
      <Footer />
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
