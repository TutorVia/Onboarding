import { Calculator, Atom, FlaskConical, Leaf, BookOpen, Code, Landmark, Music } from "lucide-react";

const subjects = [
  { name: "Mathematics", desc: "Algebra, Calculus, Statistics & more", icon: Calculator, color: "bg-blue-50 text-blue-600", border: "border-blue-100" },
  { name: "Physics", desc: "Mechanics, Thermodynamics, Optics", icon: Atom, color: "bg-violet-50 text-violet-600", border: "border-violet-100" },
  { name: "Chemistry", desc: "Organic, Inorganic & Physical Chemistry", icon: FlaskConical, color: "bg-emerald-50 text-emerald-600", border: "border-emerald-100" },
  { name: "Biology", desc: "Botany, Zoology, Genetics & Ecology", icon: Leaf, color: "bg-green-50 text-green-600", border: "border-green-100" },
  { name: "English", desc: "Literature, Grammar & Creative Writing", icon: BookOpen, color: "bg-amber-50 text-amber-600", border: "border-amber-100" },
  { name: "Computer Science", desc: "Programming, Data Structures, AI", icon: Code, color: "bg-cyan-50 text-cyan-600", border: "border-cyan-100" },
  { name: "History", desc: "World History, Civics & Geography", icon: Landmark, color: "bg-rose-50 text-rose-600", border: "border-rose-100" },
  { name: "Music", desc: "Theory, Instruments & Composition", icon: Music, color: "bg-orange-50 text-orange-600", border: "border-orange-100" },
];

export const Subjects = () => {
  return (
    <section id="subjects" data-testid="subjects-section" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-accent text-xl text-[#DF7861] mb-3">What We Teach</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-[#2C3333] tracking-tight">
            Explore Our Subjects
          </h2>
          <p className="text-base md:text-lg text-[#6B7280] leading-relaxed mt-4">
            From foundational topics to advanced specializations, our expert tutors cover a wide range of subjects tailored to your learning goals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-stagger">
          {subjects.map((subject) => (
            <div
              key={subject.name}
              data-testid={`subject-card-${subject.name.toLowerCase().replace(/\s/g, "-")}`}
              className={`group bg-white rounded-2xl p-6 border ${subject.border} shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
            >
              <div className={`w-12 h-12 rounded-xl ${subject.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <subject.icon className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-[#2C3333] text-lg">{subject.name}</h3>
              <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">{subject.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
