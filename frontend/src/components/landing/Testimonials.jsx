import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ananya Mehta",
    role: "Class 12 Student",
    text: "LearnSphere transformed my approach to Mathematics. My tutor explained complex calculus concepts in ways that finally clicked. I went from struggling to scoring 95% in my board exams.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Rajiv Kumar",
    role: "Parent of 2 Students",
    text: "Both my children use LearnSphere and the improvement has been remarkable. The personalized attention they receive is something no classroom can provide. Worth every penny.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Sophie Anderson",
    role: "College Freshman",
    text: "I was nervous about university-level Physics. My tutor on LearnSphere made the transition seamless. The session recordings and study materials are incredibly helpful for revision.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" data-testid="testimonials-section" className="py-24 md:py-32 bg-[#ECEBE4]/40">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-accent text-xl text-[#DF7861] mb-3">What They Say</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-[#2C3333] tracking-tight">
            Student Success Stories
          </h2>
          <p className="text-base md:text-lg text-[#6B7280] leading-relaxed mt-4">
            Hear from students and parents who have experienced the LearnSphere difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              data-testid={`testimonial-${t.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300 relative border border-[#E2E0D6]/50"
            >
              <Quote className="w-8 h-8 text-[#ECB390] mb-4" />
              <p className="text-[#2C3333] leading-relaxed text-sm mb-6">{t.text}</p>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#DF7861] fill-[#DF7861]" />
                ))}
              </div>
              <div className="flex items-center gap-3 border-t border-[#E2E0D6]/50 pt-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-heading font-semibold text-[#2C3333] text-sm">{t.name}</p>
                  <p className="text-xs text-[#6B7280]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
