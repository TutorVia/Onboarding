import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  Subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science"],
  Company: ["About Us", "How It Works", "Testimonials", "FAQ", "Careers"],
  Support: ["Help Center", "Terms of Service", "Privacy Policy", "Contact Us"],
};

export const Footer = () => {
  return (
    <footer data-testid="footer" className="bg-[#2C3333] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-8 h-8 text-[#ECB390]" />
              <span className="font-heading text-xl font-bold text-white">LearnSphere</span>
            </a>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm mb-6">
              Connecting students with world-class tutors for personalized one-on-one learning experiences that unlock potential.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Mail className="w-4 h-4 text-[#ECB390]" />
                <span>hello@learnsphere.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Phone className="w-4 h-4 text-[#ECB390]" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-[#ECB390]" />
                <span>Global, 100% Online</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/50 hover:text-[#ECB390] transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} LearnSphere. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">Terms</a>
            <a href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">Privacy</a>
            <a href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
