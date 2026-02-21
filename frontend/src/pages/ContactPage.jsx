import { useState } from "react";
import { Phone, Mail, MapPin, Send, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DemoModal } from "@/components/landing/DemoModal";
import { toast } from "sonner";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ContactPage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact-messages`, form);
      toast.success("Message sent! We'll get back to you shortly.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6]" data-testid="contact-page">
      <Navbar onOpenDemo={() => setDemoOpen(true)} />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-accent text-xl text-[#DF7861] mb-3">Get In Touch</p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2C3333] tracking-tight">
              Contact Us
            </h1>
            <p className="text-base md:text-lg text-[#6B7280] leading-relaxed mt-4">
              Have a question or need help? Reach out to us directly or fill in the form below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#2F5D62] rounded-2xl p-6 text-white">
                <h2 className="font-heading text-xl font-semibold mb-6">Reach Us Directly</h2>
                <div className="space-y-5">
                  <a href="tel:+917009201851" className="flex items-center gap-3 group" data-testid="contact-phone-1">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Phone</p>
                      <p className="font-medium">+91-7009201851</p>
                    </div>
                  </a>
                  <a href="tel:+919878035355" className="flex items-center gap-3 group" data-testid="contact-phone-2">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Phone</p>
                      <p className="font-medium">+91-9878035355</p>
                    </div>
                  </a>
                  <a href="mailto:tutorviaa@gmail.com" className="flex items-center gap-3 group" data-testid="contact-email">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Email</p>
                      <p className="font-medium">tutorviaa@gmail.com</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Location</p>
                      <p className="font-medium">Global, 100% Online</p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/917009201851?text=Hi%2C%20I%20have%20a%20question%20about%20LearnSphere%20tutoring%20services."
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-whatsapp-btn"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-2xl p-4 font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-[#E2E0D6]/50 shadow-[0_4px_20px_rgb(0,0,0,0.03)] space-y-5" data-testid="contact-form">
                <h2 className="font-heading text-xl font-semibold text-[#2C3333]">Send Us a Message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-[#2C3333] text-sm">Full Name *</Label>
                    <Input data-testid="contact-name-input" placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-[#F9F8F6] border-[#E2E0D6]" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[#2C3333] text-sm">Email *</Label>
                    <Input data-testid="contact-email-input" type="email" placeholder="john@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-[#F9F8F6] border-[#E2E0D6]" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[#2C3333] text-sm">Phone</Label>
                  <Input data-testid="contact-phone-input" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-[#F9F8F6] border-[#E2E0D6]" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[#2C3333] text-sm">Message *</Label>
                  <textarea data-testid="contact-message-input" placeholder="How can we help you?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="flex min-h-[120px] w-full rounded-md border border-[#E2E0D6] bg-[#F9F8F6] px-3 py-2 text-sm placeholder:text-[#6B7280] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2F5D62] resize-none" />
                </div>
                <Button data-testid="contact-submit-btn" type="submit" disabled={loading} className="w-full bg-[#2F5D62] hover:bg-[#23464A] text-white rounded-full h-11 shadow-md hover:shadow-lg transition-all duration-300">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
