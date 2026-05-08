import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Experience() {

  const experiences = [
    {
      title: "Hackathons & Buildathons",
      role: "Technical Volunteer & Participant",
      location: "Bangalore, India",
      date: "2024 – 2025",
      points: [
        { name: "Technical Coordination", text: "Assisted participants with debugging, environment setup, and solution presentations to mentors and judges." }
      ]
    },
    {
      title: "Cultural Fest & Tech Fest",
      role: "Operations & Coordination Volunteer",
      location: "Bangalore, India",
      date: "2025",
      points: [
        { name: "Large-Scale Event Operations", text: "Supported planning, scheduling, and execution of multi-track events, working with cross-functional teams." },
        { name: "Communication", text: "Handled participant queries, speaker coordination, and information flow across organizing teams." }
      ]
    }
  ];

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
        <span className="text-[10px] tracking-[0.4em] text-white/20 font-mono uppercase">SEQ 004 / 169</span>
      </div>
      <div className="fixed bottom-12 right-8 md:right-12 flex items-end justify-end gap-3 z-0 hidden sm:flex pointer-events-none opacity-50">
        <span className="text-[10px] tracking-[0.4em] text-white/20 font-mono uppercase">System // Timeline</span>
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
            Agam <span className="text-white/40">/ Experience</span>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-40 pb-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 relative"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-amber-500/50" />
            <span className="text-amber-500 tracking-[0.3em] font-mono text-xs uppercase">Protocol - Timeline</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-normal text-white mb-6 tracking-tighter leading-[0.9]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Experience<span className="text-amber-500">*</span>
          </h1>
          <p className="text-white/40 text-sm md:text-base font-mono tracking-widest max-w-2xl border-l border-amber-500/30 pl-6 uppercase mt-8">
            Operations, technical coordination, and volunteering.
          </p>
        </motion.div>

        <div className="flex flex-col gap-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.02, 
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="group relative p-8 md:p-12 border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] hover:border-amber-500/30 transition-all duration-500 overflow-hidden"
            >
              {/* Tech Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 group-hover:border-amber-500/50 transition-colors" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 group-hover:border-amber-500/50 transition-colors" />
              
              {/* Glass Shimmer */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-amber-500/5 to-transparent group-hover:animate-shimmer pointer-events-none" />
              
              <div className="flex flex-col md:flex-row gap-8 md:gap-16 relative z-10">
                {/* Meta details */}
                <div className="md:w-1/3 flex flex-col gap-4">
                  <h3 className="text-3xl md:text-4xl text-white font-normal leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {exp.title}
                  </h3>
                  
                  <div className="flex flex-col gap-3 mt-4 text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/40 font-mono">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-4 h-4 text-amber-500/70" />
                      {exp.role}
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-amber-500/70" />
                      {exp.location}
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-amber-500/70" />
                      {exp.date}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="md:w-2/3 flex flex-col gap-6 justify-center">
                  {exp.points.map((point, i) => (
                    <div key={i} className="flex flex-col gap-2 border-l border-white/10 pl-6 group-hover:border-amber-500/30 transition-colors">
                      <h4 className="text-white/80 font-mono text-sm tracking-widest uppercase">
                        {point.name}
                      </h4>
                      <p className="text-white/40 leading-relaxed font-light text-sm md:text-base">
                        {point.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
