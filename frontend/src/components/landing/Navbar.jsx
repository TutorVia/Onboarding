import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, GraduationCap } from "lucide-react";

export const Navbar = ({ onOpenDemo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const navLinks = [
    { label: "Subjects", to: "/subjects" },
    { label: "Teachers", to: "/teachers" },
    { label: "How It Works", to: "/how-it-works" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen ? "bg-[#F9F8F6]/95 backdrop-blur-md shadow-sm" : "bg-[#F9F8F6]/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2" data-testid="navbar-logo">
            <GraduationCap className="w-8 h-8 text-[#2F5D62]" />
            <span className="font-heading text-xl font-bold text-[#2C3333]">LearnSphere</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.to || location.pathname.startsWith(link.to + "/")
                    ? "text-[#2F5D62]"
                    : "text-[#2C3333]/70 hover:text-[#2F5D62]"
                }`}
              >
                {link.label}
              </Link>
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
            className="md:hidden text-[#2C3333] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-1 bg-[#F9F8F6] border-t border-[#E2E0D6]/50" data-testid="navbar-mobile-menu">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`block text-sm font-medium py-3 px-2 rounded-lg transition-colors ${
                  location.pathname === link.to
                    ? "text-[#2F5D62] bg-[#2F5D62]/5"
                    : "text-[#2C3333]/70 hover:text-[#2F5D62] hover:bg-[#2F5D62]/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button
                data-testid="navbar-mobile-book-demo-btn"
                onClick={onOpenDemo}
                className="w-full bg-[#2F5D62] text-white rounded-full"
              >
                Book a Free Demo
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
