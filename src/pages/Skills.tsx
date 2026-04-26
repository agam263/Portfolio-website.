import { motion } from 'framer-motion';
import { ArrowLeft, Code2, Database, BrainCircuit, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    icon: <Code2 className="w-6 h-6" />,
    skills: [
      { name: "Java", level: "Advanced" },
      { name: "JavaScript", level: "Advanced" },
      { name: "Python", level: "Intermediate" },
      { name: "Go", level: "Basic" }
    ]
  },
  {
    title: "Web Stack",
    icon: <Database className="w-6 h-6" />,
    skills: [
      { name: "HTML & CSS", level: "Advanced" },
      { name: "React.js", level: "Advanced" },
      { name: "Node.js", level: "Intermediate" },
      { name: "Express.js", level: "Intermediate" },
      { name: "Tailwind CSS", level: "Advanced" }
    ]
  },
  {
    title: "Data & ML",
    icon: <BrainCircuit className="w-6 h-6" />,
    skills: [
      { name: "NumPy", level: "Intermediate" },
      { name: "Pandas", level: "Intermediate" },
      { name: "Data Analysis", level: "Advanced" },
      { name: "Feature Engineering", level: "Intermediate" },
      { name: "Model Evaluation", level: "Intermediate" }
    ]
  },
  {
    title: "Tools & Technologies",
    icon: <Wrench className="w-6 h-6" />,
    skills: [
      { name: "Firebase", level: "Intermediate" },
      { name: "MongoDB", level: "Intermediate" },
      { name: "Google OAuth", level: "Basic" },
      { name: "Git & GitHub", level: "Advanced" },
      { name: "REST APIs", level: "Advanced" },
      { name: "VS Code", level: "Advanced" }
    ]
  }
];

export function Skills() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black font-sans pb-32">
      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference">
        <Link to="/" className="group flex items-center gap-3 text-white">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-transform group-hover:-translate-x-1">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-xs tracking-widest uppercase font-medium">Back to Home</span>
        </Link>
        <div className="text-xl font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Agam<span className="text-white/50">*</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-normal text-white mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Technical Arsenal
          </h1>
          <p className="text-white/50 text-lg md:text-xl font-light tracking-wide max-w-2xl">
            A comprehensive overview of the tools, languages, and technologies I use to build scalable and intelligent applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.03, 
                y: -15,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
              className="group relative p-8 md:p-12 rounded-[2rem] border border-white/10 bg-[#111] overflow-hidden hover:bg-[#151515] hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-500"
            >
              {/* Subtle glass shimmer hover */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-shimmer pointer-events-none" />

              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/50 group-hover:text-white transition-colors duration-500">
                  {category.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-normal text-white tracking-wide" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-col gap-6">
                {category.skills.map((skill, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex justify-between items-end">
                      <span className="text-white/90 font-medium text-lg tracking-wide">{skill.name}</span>
                      <span className="text-white/30 text-xs tracking-widest uppercase">{skill.level}</span>
                    </div>
                    {/* Animated Progress Line */}
                    <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: skill.level === "Advanced" ? "90%" : skill.level === "Intermediate" ? "65%" : "30%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-gradient-to-r from-white/20 to-white/60 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
