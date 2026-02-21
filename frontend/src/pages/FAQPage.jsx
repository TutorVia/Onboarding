import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DemoModal } from "@/components/landing/DemoModal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";

const faqCategories = [
  {
    title: "Getting Started",
    faqs: [
      { q: "How does the one-on-one tutoring work?", a: "Each session is a live, interactive meeting between you and your tutor. You'll connect via our video platform where you can share screens, use whiteboards, and work through problems together in real-time. Sessions are typically 50-60 minutes long." },
      { q: "How do I sign up?", a: "Simply click 'Book a Free Demo' on our website. Fill in your details including name, email, grade level, and preferred subject. Our team will contact you to schedule your first free session." },
      { q: "Is there a free trial available?", a: "Yes! We offer a completely free demo session so you can experience our platform and teaching quality firsthand. No credit card required. Just book a demo and start learning." },
    ],
  },
  {
    title: "Tutors & Quality",
    faqs: [
      { q: "How are the tutors selected?", a: "Every tutor goes through a rigorous selection process including qualification verification, teaching demonstration, and background checks. Only the top 5% of applicants make it through our selection, ensuring you learn from the very best." },
      { q: "Can I choose my own tutor?", a: "Absolutely! Browse our tutor profiles, read reviews, and select the one that best matches your learning style and goals. You can also switch tutors at any time if you'd like a different teaching approach." },
      { q: "What qualifications do tutors have?", a: "Our tutors hold advanced degrees (Masters/PhD) from top universities, have extensive teaching experience (minimum 5 years), and specialize in their subjects. Many are published researchers or industry professionals." },
    ],
  },
  {
    title: "Scheduling & Sessions",
    faqs: [
      { q: "Can I reschedule or cancel a session?", a: "Yes! You can reschedule or cancel a session up to 4 hours before the scheduled time at no extra cost. This gives both you and the tutor flexibility to manage unexpected changes." },
      { q: "What subjects and grade levels do you cover?", a: "We cover 25+ subjects from Grade 1 through college level, including Mathematics, Sciences, Languages, Computer Science, and test prep for competitive exams like SAT, GRE, JEE, NEET and more." },
      { q: "What technology do I need?", a: "All you need is a computer or tablet with a stable internet connection, a webcam, and a microphone. Our platform works on all major browsers. No special software installation required." },
    ],
  },
  {
    title: "Materials & Support",
    faqs: [
      { q: "Do I get study materials after each session?", a: "Absolutely! After every session, your tutor uploads personalized notes, practice worksheets, and any supplementary materials directly to your dashboard. You can access and download them anytime." },
      { q: "How can I contact support?", a: "You can reach us via phone at +91-7009201851 or +91-9878035355. You can also use our website chatbot for quick answers to common questions, or fill out the contact form on our Contact Us page." },
      { q: "What is your refund policy?", a: "If you're not satisfied with your first paid session, we offer a full refund or a free replacement session with a different tutor. Your satisfaction is our top priority." },
    ],
  },
];

export default function FAQPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9F8F6]" data-testid="faq-page">
      <Navbar onOpenDemo={() => setDemoOpen(true)} />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-accent text-xl text-[#DF7861] mb-3">Got Questions?</p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2C3333] tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-base md:text-lg text-[#6B7280] leading-relaxed mt-4">
              Everything you need to know about LearnSphere. Can't find your answer? Contact us directly.
            </p>
          </div>

          <div className="space-y-8">
            {faqCategories.map((cat) => (
              <div key={cat.title}>
                <h2 className="font-heading text-xl font-semibold text-[#2C3333] mb-4">{cat.title}</h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {cat.faqs.map((faq, i) => (
                    <AccordionItem
                      key={i}
                      value={`${cat.title}-${i}`}
                      data-testid={`faq-item-${cat.title.toLowerCase().replace(/\s/g, "-")}-${i}`}
                      className="bg-white rounded-xl border border-[#E2E0D6]/50 px-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-shadow duration-300"
                    >
                      <AccordionTrigger className="font-heading font-medium text-[#2C3333] text-base py-5 hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-[#6B7280] text-sm leading-relaxed pb-5">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
