import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does the one-on-one tutoring work?",
    a: "Each session is a live, interactive meeting between you and your tutor. You'll connect via our video platform where you can share screens, use whiteboards, and work through problems together in real-time. Sessions are typically 50-60 minutes long.",
  },
  {
    q: "How are the tutors selected?",
    a: "Every tutor goes through a rigorous selection process including qualification verification, teaching demonstration, and background checks. Only the top 5% of applicants make it through our selection, ensuring you learn from the very best.",
  },
  {
    q: "Can I reschedule or cancel a session?",
    a: "Yes! You can reschedule or cancel a session up to 4 hours before the scheduled time at no extra cost. This gives both you and the tutor flexibility to manage unexpected changes.",
  },
  {
    q: "What subjects and grade levels do you cover?",
    a: "We cover 25+ subjects from Grade 1 through college level, including Mathematics, Sciences, Languages, Computer Science, and test prep for competitive exams like SAT, GRE, and more.",
  },
  {
    q: "Do I get study materials after each session?",
    a: "Absolutely! After every session, your tutor uploads personalized notes, practice worksheets, and any supplementary materials directly to your dashboard. You can access and download them anytime.",
  },
  {
    q: "Is there a free trial available?",
    a: "Yes! We offer a completely free demo session so you can experience our platform and teaching quality firsthand. No credit card required. Just book a demo and start learning.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" data-testid="faq-section" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-16">
          <p className="font-accent text-xl text-[#DF7861] mb-3">Got Questions?</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-[#2C3333] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              data-testid={`faq-item-${i}`}
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
    </section>
  );
};
