import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { WordsPullUpMultiStyle } from '../components/WordsPullUpMultiStyle';
import { AnimatedLetter } from '../components/AnimatedLetter';
import { Canvas } from '@react-three/fiber';
import { useState, Suspense, useRef } from 'react';
import { ProjectModel } from '../components/ProjectModel';
import { Center, Bounds } from '@react-three/drei';

import confetti from 'canvas-confetti';

export function Home() {
  const navigate = useNavigate();
  const [isDriving, setIsDriving] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Card 1 (Projects)
  const y1 = useTransform(smoothProgress, [0, 0.15, 0.33], ["0vh", "0vh", "-100vh"]);
  const opacity1 = useTransform(smoothProgress, [0, 0.25, 0.33], [1, 1, 0]);

  // Card 2 (Experience)
  const y2 = useTransform(smoothProgress, [0, 0.15, 0.33, 0.48, 0.66], ["10vh", "10vh", "0vh", "0vh", "-100vh"]);
  const scale2 = useTransform(smoothProgress, [0, 0.15, 0.33, 0.48, 0.66], [0.96, 0.96, 1, 1, 1]);
  const opacity2 = useTransform(smoothProgress, [0, 0.1, 0.15, 0.33, 0.66], [0, 1, 1, 1, 1]);

  // Card 3 (Skills)
  const y3 = useTransform(smoothProgress, [0.33, 0.48, 0.66, 1], ["10vh", "10vh", "0vh", "0vh"]);
  const scale3 = useTransform(smoothProgress, [0.33, 0.48, 0.66, 1], [0.96, 0.96, 1, 1]);
  const opacity3 = useTransform(smoothProgress, [0, 0.33, 0.43, 0.48], [0, 0, 1, 1]);

  const handleProjectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDriving(true);
    
    // Shoot massive realistic fireworks
    const duration = 12500;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 150 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    // Navigate when animation finishes
    setTimeout(() => {
      navigate('/projects');
    }, 13500);
  };

  return (
    <div className="bg-background text-primary min-h-screen selection:bg-primary selection:text-black ">
      
      {/* DRIVE TRANSITION OVERLAY */}
      <AnimatePresence>
        {isDriving && (
          <motion.div 
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* The Road */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 mt-12 md:mt-24 w-full z-0">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/50 to-transparent blur-sm" />
               <motion.div 
                 className="absolute inset-0 bg-[linear-gradient(to_right,transparent_50%,#fff_50%)] bg-[length:200px_100%]"
                 animate={{ backgroundPosition: ['0px 0px', '-200px 0px'] }}
                 transition={{ duration: 1.0, ease: "linear", repeat: Infinity }}
               />
            </div>

            <motion.div 
              className="w-[200vw] h-[100vh] flex items-center justify-center absolute z-10"
              initial={{ x: '-100vw' }}
              animate={{ x: '100vw' }}
              transition={{ duration: 13, ease: "easeInOut", delay: 0.2 }}
            >
              <div className="w-[100vw] h-[100vh]">
                <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
                  <ambientLight intensity={2} />
                  <directionalLight position={[10, 10, 5]} intensity={3} />
                  <Suspense fallback={null}>
                    <Bounds fit clip observe margin={1.2}>
                      <Center>
                        <ProjectModel isDrivingMode={true} />
                      </Center>
                    </Bounds>
                  </Suspense>
                </Canvas>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: HERO */}
      <section className="relative h-screen w-full overflow-hidden bg-black z-20">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
        </video>
        
        {/* Navigation Bar */}
        <nav className="relative z-10 flex flex-row justify-between items-center px-6 md:px-8 py-6 max-w-7xl mx-auto">
          <div className="text-2xl md:text-3xl tracking-tight text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Agam<sup className="text-xs">*</sup>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <Link to="#" className="text-xs md:text-sm transition-colors text-foreground">
              About
            </Link>
            <Link to="/connect" className="text-xs md:text-sm transition-colors text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
          <Link to="/journey" className="liquid-glass rounded-full px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm text-foreground hover:scale-[1.03] transition-transform hidden sm:inline-flex items-center">
            My Journey
          </Link>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-center items-start w-full px-6 md:px-12 lg:px-24 h-[calc(100vh-100px)]">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-[-1.5px] max-w-5xl font-normal text-foreground flex flex-col gap-2" 
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            <div>
              Hi, I'm{" "}
              <motion.span
                className="inline-block relative text-white"
                initial={{ clipPath: "inset(-50% 100% -50% -10%)" }}
                animate={{ 
                  clipPath: "inset(-50% -50% -50% -10%)",
                  textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 0px rgba(255,255,255,0)", "0px 0px 25px rgba(255,255,255,0.8)", "0px 0px 0px rgba(255,255,255,0)"]
                }}
                transition={{
                  clipPath: { duration: 0.8, ease: "easeInOut" },
                  textShadow: { duration: 2, times: [0, 0.4, 0.7, 1], ease: "easeInOut" }
                }}
              >
                Agam
              </motion.span>
            </div>
          </h1>
          
          {/* Aligned left, slightly below text */}
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
          >
            <Link 
              to="/journey" 
              className="liquid-glass rounded-full px-12 py-4 text-base text-foreground inline-flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
            >
              My Journey
            </Link>
          </motion.div>
        </div>
      </section>

      {/* GLOBAL FIXED SPACEMAN BACKGROUND (Includes pure black base for bottom sections) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-black" />
        <motion.div 
          className="absolute top-[20%] right-[5%] w-72 md:w-96 lg:w-[500px] drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] opacity-40"
          animate={{ y: [0, -40, 0], x: [0, 10, -10, 0], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
        >
          <img src="/spaceman_rope.png" alt="Floating Astronaut in Background" className="w-full h-auto object-contain" />
        </motion.div>
      </div>

      {/* SECTION 2: ABOUT */}
      <section className="bg-transparent relative z-10 py-20 md:py-32 px-4 md:px-6 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto bg-[#101010] rounded-2xl md:rounded-[2rem] p-8 md:p-16 lg:p-24 flex flex-col items-center text-center"
        >
          <span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-8 md:mb-12">Summary</span>
          
          <WordsPullUpMultiStyle
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[0.95] sm:leading-[0.9] mb-12"
            segments={[
              { text: "I am Agam Kundu,", className: "font-normal" },
              { text: " an aspiring software engineer.", className: "font-serif italic" },
              { text: " I build full-stack applications and data-driven systems.", className: "font-normal" }
            ]}
          />

          <div className="text-[#DEDBC8] text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            <AnimatedLetter text="Currently pursuing my B.Tech in Computer Science & AI/ML at Polaris School of Technology in Bangalore. I am passionate about how technology, system design, and user experience combine to create impactful digital products. I am constantly eager to learn how modern tech companies build and scale intelligent platforms." />
          </div>

        </motion.div>
      </section>

      {/* SECTION 3: MASSIVE PROJECT CTA */}
      <section ref={sectionRef} className="bg-transparent relative z-10 w-full h-[300vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-6">
          {/* Subtle background glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-white/5 rounded-full blur-[120px]" />
          </div>

          {/* 15 Floating Github Bubbles */}
          {[
            { left: '10%', top: '20%', delay: 0, duration: 5, scale: 1 },
            { left: '15%', top: '55%', delay: 1, duration: 6, scale: 0.8 },
            { left: '5%', top: '80%', delay: 2, duration: 4.5, scale: 1.2 },
            { left: '25%', top: '15%', delay: 0.5, duration: 7, scale: 0.9 },
            { left: '22%', top: '85%', delay: 1.5, duration: 5.5, scale: 0.7 },
            { left: '85%', top: '25%', delay: 0.8, duration: 6.5, scale: 1.1 },
            { left: '78%', top: '60%', delay: 2.5, duration: 5, scale: 0.9 },
            { left: '92%', top: '80%', delay: 0.3, duration: 4, scale: 1 },
            { left: '72%', top: '15%', delay: 1.8, duration: 5.8, scale: 0.8 },
            { left: '88%', top: '45%', delay: 1.2, duration: 6.2, scale: 1.15 },
            { left: '12%', top: '35%', delay: 1.3, duration: 6.8, scale: 0.85 },
            { left: '8%', top: '65%', delay: 0.7, duration: 5.2, scale: 1.05 },
            { left: '82%', top: '10%', delay: 2.1, duration: 4.8, scale: 0.75 },
            { left: '95%', top: '55%', delay: 0.4, duration: 7.2, scale: 0.95 },
            { left: '75%', top: '85%', delay: 1.9, duration: 6.1, scale: 1.1 }
          ].map((bubble, i) => (
            <motion.div
              key={i}
              className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center z-0 hidden sm:flex pointer-events-none drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              style={{
                left: bubble.left,
                top: bubble.top,
                scale: bubble.scale,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, (i % 2 === 0 ? 15 : -15), 0],
                rotate: [0, 15, -15, 0]
              }}
              transition={{
                duration: bubble.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bubble.delay
              }}
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5 md:w-7 md:h-7 text-white/40"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.3 6-1.5 6-6.76a5.2 5.2 0 0 0-1.5-3.8 5.3 5.3 0 0 0-.15-3.8s-1.2-.38-3.9 1.4a13.3 13.3 0 0 0-7 0C4.8 2.38 3.6 2.76 3.6 2.76a5.3 5.3 0 0 0-.15 3.8A5.2 5.2 0 0 0 2 12c0 5.26 3 6.46 6 6.76a4.8 4.8 0 0 0-1 3.24v4"></path>
                <path d="M9 19c-4.3 1.4-5.3-2-8-3"></path>
              </svg>
            </motion.div>
          ))}

          {/* Stacking Cards Container */}
          <div className="relative z-10 w-full max-w-5xl mx-auto h-[250px] sm:h-[350px] md:h-[450px] flex items-center justify-center perspective-1000">
            {/* Card 1: Projects */}
            <motion.button 
              style={{ y: y1, opacity: opacity1 }}
              onClick={handleProjectClick}
              className="absolute inset-x-0 group flex w-full items-center justify-between overflow-hidden rounded-[2rem] md:rounded-[4rem] border border-white/10 bg-[#111] p-8 md:p-16 lg:p-20 transition-all duration-300 hover:scale-[1.02] hover:border-white/30 hover:bg-[#1a1a1a] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] text-left shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-30"
            >
              <div className="flex flex-col items-start gap-4">
                <span className="text-white/40 text-sm md:text-base tracking-widest uppercase font-medium">Explore My Work</span>
                <h2 
                  className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-normal text-white tracking-tight"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Projects<span className="text-white/30">*</span>
                </h2>
              </div>
              
              <div className="hidden md:flex items-center justify-center w-24 h-24 lg:w-32 lg:h-32 rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                <ArrowRight className="w-10 h-10 lg:w-12 lg:h-12 text-white transition-all duration-300 group-hover:translate-x-[6px]" />
              </div>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-shimmer" />
            </motion.button>

            {/* Card 2: Experience */}
            <motion.button 
              style={{ y: y2, scale: scale2, opacity: opacity2 }}
              onClick={() => navigate('/experience')}
              className="absolute inset-x-0 group flex w-full items-center justify-between overflow-hidden rounded-[2rem] md:rounded-[4rem] border border-white/10 bg-[#111] p-8 md:p-16 lg:p-20 transition-all duration-300 hover:scale-[1.02] hover:border-white/30 hover:bg-[#1a1a1a] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] text-left shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20"
            >
              <div className="flex flex-col items-start gap-4">
                <span className="text-white/40 text-sm md:text-base tracking-widest uppercase font-medium">View My Background</span>
                <h2 
                  className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-normal text-white tracking-tight"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Experience<span className="text-white/30">*</span>
                </h2>
              </div>
              
              <div className="hidden md:flex items-center justify-center w-24 h-24 lg:w-32 lg:h-32 rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                <ArrowRight className="w-10 h-10 lg:w-12 lg:h-12 text-white transition-all duration-300 group-hover:translate-x-[6px]" />
              </div>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-shimmer" />
            </motion.button>

            {/* Card 3: Skills */}
            <motion.button 
              style={{ y: y3, scale: scale3, opacity: opacity3 }}
              onClick={() => navigate('/skills')}
              className="absolute inset-x-0 group flex w-full items-center justify-between overflow-hidden rounded-[2rem] md:rounded-[4rem] border border-white/10 bg-[#111] p-8 md:p-16 lg:p-20 transition-all duration-300 hover:scale-[1.02] hover:border-white/30 hover:bg-[#1a1a1a] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] text-left shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10"
            >
              <div className="flex flex-col items-start gap-4">
                <span className="text-white/40 text-sm md:text-base tracking-widest uppercase font-medium">My Technical Stack</span>
                <h2 
                  className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-normal text-white tracking-tight"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Skills<span className="text-white/30">*</span>
                </h2>
              </div>
              
              <div className="hidden md:flex items-center justify-center w-24 h-24 lg:w-32 lg:h-32 rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                <ArrowRight className="w-10 h-10 lg:w-12 lg:h-12 text-white transition-all duration-300 group-hover:translate-x-[6px]" />
              </div>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-shimmer" />
            </motion.button>
          </div>
        </div>
      </section>


    </div>
  );
}
