import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Subjects } from "@/components/landing/Subjects";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { DemoModal } from "@/components/landing/DemoModal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function LandingPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const sessionId = sessionStorage.getItem("visitor_session") || crypto.randomUUID();
    sessionStorage.setItem("visitor_session", sessionId);
    axios.post(`${API}/visitors/track`, {
      session_id: sessionId, event_type: "visit", page: window.location.pathname,
      user_agent: navigator.userAgent, referrer: document.referrer,
    }).catch(() => {});
    const handleLeave = () => {
      const blob = new Blob([JSON.stringify({ session_id: sessionId, event_type: "leave", page: window.location.pathname })], { type: "application/json" });
      navigator.sendBeacon(`${API}/visitors/track`, blob);
    };
    window.addEventListener("beforeunload", handleLeave);
    return () => window.removeEventListener("beforeunload", handleLeave);
  }, []);

  useEffect(() => {
    const shown = sessionStorage.getItem("demo_popup_shown");
    if (!shown) {
      const timer = setTimeout(() => { setDemoOpen(true); sessionStorage.setItem("demo_popup_shown", "true"); }, 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll(".section-reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F8F6]" data-testid="landing-page">
      <Navbar onOpenDemo={() => setDemoOpen(true)} />
      <Hero onOpenDemo={() => setDemoOpen(true)} />
      <div className="section-reveal"><Subjects /></div>
      <div className="section-reveal"><HowItWorks /></div>
      <div className="section-reveal"><Testimonials /></div>
      <div className="section-reveal"><CTASection onOpenDemo={() => setDemoOpen(true)} /></div>
      <Footer />
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
