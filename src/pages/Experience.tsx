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
    <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black font-sans">
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

      <div className="max-w-5xl mx-auto px-6 pt-40 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-normal text-white mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Experience
          </h1>
          <p className="text-white/50 text-lg md:text-xl font-light tracking-wide">
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
                y: -10,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="group relative p-8 md:p-12 rounded-[2rem] border border-white/10 bg-[#111] hover:bg-[#151515] hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-500 overflow-hidden"
            >
              {/* Glass Shimmer */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-shimmer pointer-events-none" />
              
              <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                {/* Meta details */}
                <div className="md:w-1/3 flex flex-col gap-4">
                  <h3 className="text-2xl md:text-3xl text-white font-normal leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    {exp.title}
                  </h3>
                  
                  <div className="flex flex-col gap-3 mt-4 text-xs md:text-sm tracking-widest uppercase text-white/40 font-medium">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-4 h-4 text-white/30" />
                      {exp.role}
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-white/30" />
                      {exp.location}
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-white/30" />
                      {exp.date}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="md:w-2/3 flex flex-col gap-6 justify-center">
                  {exp.points.map((point, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <h4 className="text-white/80 font-medium tracking-wide text-lg">
                        {point.name}
                      </h4>
                      <p className="text-white/50 leading-relaxed font-light text-base md:text-lg">
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
