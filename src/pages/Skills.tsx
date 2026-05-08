import { motion } from 'framer-motion';
import { ArrowLeft, Code2, Database, BrainCircuit, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaJava, FaPython, FaReact, FaNodeJs, FaHtml5, FaChartBar, FaCogs, FaBrain, FaGoogle, FaGithub, FaServer } from 'react-icons/fa';
import { FaGolang } from 'react-icons/fa6';
import { SiJavascript, SiExpress, SiTailwindcss, SiNumpy, SiPandas, SiFirebase, SiMongodb, SiVisualstudiocode } from 'react-icons/si';

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    icon: <Code2 className="w-6 h-6" />,
    skills: [
      { name: "Java", level: "Advanced", techIcon: <FaJava /> },
      { name: "JavaScript", level: "Advanced", techIcon: <SiJavascript /> },
      { name: "Python", level: "Intermediate", techIcon: <FaPython /> },
      { name: "Go", level: "Basic", techIcon: <FaGolang /> }
    ]
  },
  {
    title: "Web Stack",
    icon: <Database className="w-6 h-6" />,
    skills: [
      { name: "HTML & CSS", level: "Advanced", techIcon: <FaHtml5 /> },
      { name: "React.js", level: "Advanced", techIcon: <FaReact /> },
      { name: "Node.js", level: "Intermediate", techIcon: <FaNodeJs /> },
      { name: "Express.js", level: "Intermediate", techIcon: <SiExpress /> },
      { name: "Tailwind CSS", level: "Advanced", techIcon: <SiTailwindcss /> }
    ]
  },
  {
    title: "Data & ML",
    icon: <BrainCircuit className="w-6 h-6" />,
    skills: [
      { name: "NumPy", level: "Intermediate", techIcon: <SiNumpy /> },
      { name: "Pandas", level: "Intermediate", techIcon: <SiPandas /> },
      { name: "Data Analysis", level: "Advanced", techIcon: <FaChartBar /> },
      { name: "Feature Engineering", level: "Intermediate", techIcon: <FaCogs /> },
      { name: "Model Evaluation", level: "Intermediate", techIcon: <FaBrain /> }
    ]
  },
  {
    title: "Tools & Technologies",
    icon: <Wrench className="w-6 h-6" />,
    skills: [
      { name: "Firebase", level: "Intermediate", techIcon: <SiFirebase /> },
      { name: "MongoDB", level: "Intermediate", techIcon: <SiMongodb /> },
      { name: "Google OAuth", level: "Basic", techIcon: <FaGoogle /> },
      { name: "Git & GitHub", level: "Advanced", techIcon: <FaGithub /> },
      { name: "REST APIs", level: "Advanced", techIcon: <FaServer /> },
      { name: "VS Code", level: "Advanced", techIcon: <SiVisualstudiocode /> }
    ]
  }
];

export function Skills() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-amber-500 selection:text-black font-sans pb-32 relative overflow-hidden">
      
      {/* Cinematic Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-amber-500/5 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-white/5 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      {/* Cinematic HUD Elements (Static) */}
      <div className="fixed top-24 left-8 md:left-12 flex flex-col gap-2 z-0 hidden sm:block pointer-events-none opacity-50">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 border-t border-l border-amber-500/50" />
          <span className="text-[10px] tracking-[0.4em] text-white/40 font-mono uppercase">Telemetry Link - Live</span>
        </div>
      </div>
      <div className="fixed top-24 right-8 md:right-12 flex flex-col items-end gap-2 z-0 hidden sm:block pointer-events-none opacity-50">
        <div className="flex items-center gap-3">
          <span className="text-[10px] tracking-[0.4em] text-white/40 font-mono uppercase">Core Status 93.0%</span>
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <div className="w-3 h-3 border-t border-r border-amber-500/50" />
        </div>
      </div>
      <div className="fixed bottom-12 left-8 md:left-12 flex items-end gap-3 z-0 hidden sm:flex pointer-events-none opacity-50">
        <div className="w-3 h-3 border-b border-l border-amber-500/50" />
        <span className="text-[10px] tracking-[0.4em] text-white/20 font-mono uppercase">SEQ 003 / 169</span>
      </div>
      <div className="fixed bottom-12 right-8 md:right-12 flex items-end justify-end gap-3 z-0 hidden sm:flex pointer-events-none opacity-50">
        <span className="text-[10px] tracking-[0.4em] text-white/20 font-mono uppercase">System // Diagnostic</span>
        <div className="w-3 h-3 border-b border-r border-amber-500/50" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 md:px-12 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
        <Link to="/" className="group flex items-center gap-4 text-white hover:text-amber-500 transition-colors">
          <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transition-all group-hover:bg-amber-500/10 group-hover:border-amber-500/30 group-hover:-translate-x-2">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-xs tracking-[0.2em] uppercase font-mono text-white/60 group-hover:text-amber-500">Back</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <div className="text-xs tracking-[0.3em] text-white/80 uppercase font-mono hidden sm:block">
            Agam <span className="text-white/40">/ Skills</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-40 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 relative"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-amber-500/50" />
            <span className="text-amber-500 tracking-[0.3em] font-mono text-xs uppercase">Protocol - Stack Reveal</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-normal text-white mb-6 tracking-tighter leading-[0.9]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Technical<br/>Arsenal<span className="text-amber-500">*</span>
          </h1>
          <p className="text-white/40 text-sm md:text-base font-mono tracking-widest max-w-2xl border-l border-amber-500/30 pl-6 uppercase mt-8">
            A comprehensive overview of the tools, languages, and technologies deployed to build scalable intelligent applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.02, 
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
              className="group relative p-8 md:p-12 border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden hover:bg-white/[0.04] hover:border-amber-500/30 transition-all duration-500"
            >
              {/* Tech Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 group-hover:border-amber-500/50 transition-colors" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 group-hover:border-amber-500/50 transition-colors" />
              
              {/* Subtle glass shimmer hover */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-amber-500/5 to-transparent group-hover:animate-shimmer pointer-events-none" />

              <div className="flex items-center gap-6 mb-12">
                <div className="w-14 h-14 rounded-none border border-white/20 bg-black flex items-center justify-center text-white/50 group-hover:text-amber-500 group-hover:border-amber-500/50 transition-all duration-500 relative">
                  <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {category.icon}
                </div>
                <h3 className="text-4xl md:text-5xl font-normal text-white tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-col gap-8">
                {category.skills.map((skill, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3">
                        <span className="text-white/30 group-hover:text-amber-500 transition-colors text-lg">
                          {skill.techIcon}
                        </span>
                        <span className="text-white/80 font-mono text-sm tracking-widest uppercase group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-amber-500/60 text-[10px] tracking-[0.3em] uppercase font-mono">{skill.level}</span>
                    </div>
                    {/* Tech Progress Line */}
                    <div className="h-[1px] w-full bg-white/10 relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: skill.level === "Advanced" ? "90%" : skill.level === "Intermediate" ? "65%" : "30%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-0 left-0 bottom-0 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                      />
                      {/* Tech blip at the end of progress bar */}
                      <motion.div
                        initial={{ left: 0, opacity: 0 }}
                        whileInView={{ left: skill.level === "Advanced" ? "90%" : skill.level === "Intermediate" ? "65%" : "30%", opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-1/2 -translate-y-1/2 w-1 h-3 bg-white"
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

