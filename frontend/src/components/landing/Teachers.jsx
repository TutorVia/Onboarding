import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const teachers = [
  {
    name: "Dr. Priya Sharma",
    subject: "Mathematics & Statistics",
    experience: "12 years experience",
    rating: "4.9",
    students: "320+",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face",
    tags: ["Calculus", "Linear Algebra"],
  },
  {
    name: "Prof. James Mitchell",
    subject: "Physics & Engineering",
    experience: "15 years experience",
    rating: "4.8",
    students: "280+",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
    tags: ["Mechanics", "Quantum Physics"],
  },
  {
    name: "Ms. Aisha Patel",
    subject: "English & Literature",
    experience: "8 years experience",
    rating: "5.0",
    students: "195+",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face",
    tags: ["Creative Writing", "SAT Prep"],
  },
  {
    name: "Dr. Chen Wei",
    subject: "Computer Science",
    experience: "10 years experience",
    rating: "4.9",
    students: "410+",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
    tags: ["Python", "Data Science"],
  },
];

export const Teachers = () => {
  return (
    <section id="teachers" data-testid="teachers-section" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-accent text-xl text-[#DF7861] mb-3">Meet Our Experts</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-[#2C3333] tracking-tight">
            Learn From the Best
          </h2>
          <p className="text-base md:text-lg text-[#6B7280] leading-relaxed mt-4">
            Our handpicked educators bring years of teaching excellence and real-world expertise to every session.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher.name}
              data-testid={`teacher-card-${teacher.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 group border border-[#E2E0D6]/50"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading font-semibold text-[#2C3333] text-lg">{teacher.name}</h3>
                <p className="text-sm text-[#2F5D62] font-medium mt-1">{teacher.subject}</p>
                <p className="text-xs text-[#6B7280] mt-1">{teacher.experience}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="flex items-center gap-1 text-sm text-[#2C3333]">
                    <Star className="w-4 h-4 text-[#DF7861] fill-[#DF7861]" />
                    {teacher.rating}
                  </span>
                  <span className="text-xs text-[#6B7280]">{teacher.students} students</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {teacher.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs font-normal text-[#6B7280] border-[#E2E0D6]">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
