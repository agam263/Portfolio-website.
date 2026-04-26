import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, GraduationCap, Code2, Rocket } from 'lucide-react';

const milestones = [
  {
    id: 1,
    title: "The Spark",
    date: "2024",
    icon: <Star className="w-6 h-6 text-primary" />,
    description: "Started my journey at Polaris School of Technology in Bangalore, diving deep into Computer Science and AI/ML."
  },
  {
    id: 2,
    title: "Building Foundations",
    date: "Mid 2024",
    icon: <GraduationCap className="w-6 h-6 text-primary" />,
    description: "Mastered the MERN stack and built initial projects like the Subscription Manager. Discovered a passion for scalable software."
  },
  {
    id: 3,
    title: "Open Source Contributor",
    date: "Oct 2025",
    icon: <Code2 className="w-6 h-6 text-primary" />,
    description: "Successfully completed Hacktoberfest 2025 by submitting 6+ verified PRs. Learned the power of collaborative development."
  },
  {
    id: 4,
    title: "AI Integration",
    date: "Late 2025",
    icon: <Rocket className="w-6 h-6 text-primary" />,
    description: "Developed Nexus RAG Assistant, integrating LLMs and vector databases to solve real-world document intelligence problems."
  },
  {
    id: 5,
    title: "The Present & Future",
    date: "2026",
    icon: <MapPin className="w-6 h-6 text-primary" />,
    description: "Continuously learning, participating in hackathons, and seeking opportunities to build intelligent platforms that make an impact."
  }
];

function MilestoneNode({ milestone, index }: { milestone: any, index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30%" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-center justify-center w-full mb-32 md:mb-48 group">
      {/* Node (Leaf/Star) */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }} 
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }} 
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white drop-shadow-[0_0_15px_rgba(255,255,255,0.9)] z-20 animate-pulse"
      >
        <div className="absolute inset-0 rounded-full bg-primary/50 animate-ping opacity-75"></div>
      </motion.div>

      {/* Branch */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className={`absolute top-1/2 h-[2px] bg-gradient-to-r ${isLeft ? 'from-transparent to-primary/80 right-1/2 origin-right' : 'from-primary/80 to-transparent left-1/2 origin-left'} z-10 w-[20%] md:w-[15%] drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]`}
      />

      {/* Card Content */}
      <div className={`flex w-full relative z-30 px-4 md:px-0 ${isLeft ? 'justify-start' : 'justify-end'}`}>
        <motion.div 
          initial={{ opacity: 0, x: isLeft ? -30 : 30, y: 20 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: isLeft ? -30 : 30, y: 20 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`liquid-glass p-6 md:p-8 rounded-2xl border border-white/10 w-full sm:w-[80%] md:w-[40%] ${isLeft ? 'mr-auto md:mr-[15%]' : 'ml-auto md:ml-[15%]'}`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/5 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              {milestone.icon}
            </div>
            <div>
              <span className="text-muted-foreground text-xs font-mono tracking-wider">{milestone.date}</span>
              <h3 className="text-xl md:text-2xl text-foreground font-medium mt-1">{milestone.title}</h3>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            {milestone.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export function Journey() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-transparent min-h-screen text-foreground overflow-x-hidden selection:bg-primary selection:text-black">
      
      {/* Animated Space Background */}
      <div className="fixed inset-0 z-[-2] bg-black overflow-hidden pointer-events-none">
        {/* Dotted Grid Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:40px_40px]" />
        
        {/* Floating Spaceman */}
        <motion.div
          className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center pointer-events-none z-0"
          animate={{ 
            y: ["-20vh", "80vh", "-20vh"], 
            opacity: [1, 0.8, 1], 
            rotate: [5, -5, 5] 
          }}
          transition={{ 
            duration: 45, 
            ease: "linear", 
            repeat: Infinity,
            times: [0, 0.77, 1]
          }}
        >
          <motion.img 
            src="/spaceman.png" 
            alt="Floating Spaceman" 
            className="w-[90vw] md:w-[50vw] max-w-2xl object-contain opacity-100 brightness-150 contrast-125 drop-shadow-2xl" 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          />
        </motion.div>

        {/* Upward Flowing Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: "-10px",
              }}
              animate={{
                y: ["0vh", "-120vh"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Back to Home</span>
          </Link>
          <div className="text-xl tracking-tight text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Agam<sup className="text-xs">*</sup>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="pt-40 pb-20 px-6 text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight mb-6"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          My <em className="not-italic text-muted-foreground">Journey</em>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-muted-foreground max-w-2xl mx-auto text-lg"
        >
          Every great product starts with a single line of code. Scroll down to explore the milestones, challenges, and achievements that shaped my path.
        </motion.p>
      </header>

      {/* Futuristic Glowing Tree Timeline */}
      <main className="relative py-20 max-w-7xl mx-auto w-full">
        <div ref={containerRef} className="relative w-full h-full">
          
          {/* Main Glowing Trunk */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 z-0" />
          <motion.div 
            style={{ scaleY, transformOrigin: "top" }} 
            className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/20 via-primary to-primary/20 -translate-x-1/2 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10" 
          />

          {milestones.map((milestone, index) => (
            <MilestoneNode key={milestone.id} milestone={milestone} index={index} />
          ))}
        </div>
      </main>

      {/* Footer CTA */}
      <footer className="py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-normal mb-8" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Ready to build the future?
          </h2>
          <a href="mailto:agam.p24@medhaviskillsuniversity.edu.in" className="liquid-glass rounded-full px-10 py-4 text-sm text-foreground hover:scale-[1.05] transition-transform inline-flex items-center">
            Let's Collaborate
          </a>
        </motion.div>
      </footer>
    </div>
  );
}
