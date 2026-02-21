import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const faqData = [
  { keywords: ["hello", "hi", "hey", "start"], answer: "Hello! Welcome to LearnSphere. How can I help you today? You can ask about our subjects, tutors, pricing, scheduling, or anything else!" },
  { keywords: ["subject", "course", "teach", "offer", "what do you"], answer: "We offer 25+ subjects including Mathematics, Physics, Chemistry, Biology, English, Computer Science, History, and Music. Visit our Subjects page to explore all options and find detailed descriptions." },
  { keywords: ["tutor", "teacher", "instructor", "faculty"], answer: "Our tutors are handpicked experts with advanced degrees and minimum 5 years of teaching experience. Only the top 5% of applicants are selected. Visit the Teachers page to browse profiles and find your perfect match." },
  { keywords: ["price", "cost", "fee", "payment", "pay", "how much"], answer: "We offer flexible pricing plans. Your first demo session is completely FREE! Contact us at +91-7009201851 for detailed pricing based on your subject and grade level." },
  { keywords: ["book", "demo", "trial", "free", "start", "sign up", "register"], answer: "Booking a free demo is easy! Click the 'Book a Free Demo' button on any page, fill in your details, and we'll schedule a personalized session for you. No credit card required!" },
  { keywords: ["schedule", "time", "when", "available", "reschedule", "cancel"], answer: "Sessions are flexible! Browse your tutor's real-time availability and pick a slot that works for you. You can reschedule or cancel up to 4 hours before your session at no extra cost." },
  { keywords: ["material", "notes", "resource", "download", "study"], answer: "After every session, your tutor uploads personalized notes, practice worksheets, and supplementary materials to your dashboard. You can access and download them anytime!" },
  { keywords: ["refund", "money back", "not satisfied", "guarantee"], answer: "If you're not satisfied with your first paid session, we offer a full refund or a free replacement session with a different tutor. Your satisfaction is our top priority." },
  { keywords: ["contact", "phone", "call", "reach", "email", "whatsapp"], answer: "Reach us at:\nPhone: +91-7009201851 / +91-9878035355\nEmail: tutorviaa@gmail.com\nOr chat on WhatsApp for quick responses!" },
  { keywords: ["how", "work", "process", "steps"], answer: "It's simple: 1) Browse tutors & subjects, 2) Book a session, 3) Attend your live 1-on-1 lesson, 4) Access study materials, 5) Track your progress. Visit the How It Works page for details!" },
  { keywords: ["age", "grade", "level", "class", "kid", "child", "parent"], answer: "We cater to all levels: Grade 1-12, college, and competitive exam prep (JEE, NEET, SAT, GRE). Parents can book sessions for their children and track their progress." },
];

const getResponse = (input) => {
  const lower = input.toLowerCase();
  for (const faq of faqData) {
    if (faq.keywords.some((kw) => lower.includes(kw))) {
      return faq.answer;
    }
  }
  return "I'm not sure about that, but I'd love to help! You can reach our team directly at +91-7009201851 or +91-9878035355 for personalized assistance. You can also ask me about subjects, tutors, pricing, scheduling, or bookings.";
};

export const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi there! I'm the LearnSphere assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getResponse(userMsg) }]);
    }, 500);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        data-testid="chatbot-toggle"
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
          open ? "bg-[#2C3333]" : "bg-[#2F5D62]"
        }`}
      >
        {open ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      {/* Chat Window */}
      {open && (
        <div data-testid="chatbot-window" className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-[0_20px_60px_rgb(0,0,0,0.15)] border border-[#E2E0D6] overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="bg-[#2F5D62] px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-heading font-semibold text-sm">LearnSphere Help</p>
              <p className="text-white/60 text-xs">Ask me anything</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="h-[320px] overflow-y-auto p-4 space-y-3 bg-[#F9F8F6]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "bot" ? "bg-[#2F5D62]" : "bg-[#DF7861]"
                }`}>
                  {msg.role === "bot" ? <Bot className="w-3.5 h-3.5 text-white" /> : <User className="w-3.5 h-3.5 text-white" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === "bot" ? "bg-white text-[#2C3333] border border-[#E2E0D6]/50" : "bg-[#2F5D62] text-white"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-[#E2E0D6]">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <Input
                data-testid="chatbot-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 bg-[#F9F8F6] border-[#E2E0D6] text-sm h-9"
              />
              <Button data-testid="chatbot-send-btn" type="submit" size="icon" className="bg-[#2F5D62] hover:bg-[#23464A] h-9 w-9 shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
