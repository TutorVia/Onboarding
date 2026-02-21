import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, GraduationCap } from "lucide-react";

export const Navbar = ({ onOpenDemo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Subjects", href: "#subjects" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Teachers", href: "#teachers" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#F9F8F6]/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="/" className="flex items-center gap-2" data-testid="navbar-logo">
            <GraduationCap className="w-8 h-8 text-[#2F5D62]" />
            <span className="font-heading text-xl font-bold text-[#2C3333]">LearnSphere</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                className="text-sm font-medium text-[#2C3333]/70 hover:text-[#2F5D62] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button
              data-testid="navbar-book-demo-btn"
              onClick={onOpenDemo}
              className="bg-[#2F5D62] hover:bg-[#23464A] text-white rounded-full px-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Book a Free Demo
            </Button>
          </div>

          <button
            data-testid="navbar-mobile-toggle"
            className="md:hidden text-[#2C3333]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-3 animate-fade-in" data-testid="navbar-mobile-menu">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-sm font-medium text-[#2C3333]/70 hover:text-[#2F5D62] py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button
              data-testid="navbar-mobile-book-demo-btn"
              onClick={() => { setMobileOpen(false); onOpenDemo(); }}
              className="w-full bg-[#2F5D62] text-white rounded-full"
            >
              Book a Free Demo
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
