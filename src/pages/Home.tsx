import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { WordsPullUpMultiStyle } from '../components/WordsPullUpMultiStyle';
import { AnimatedLetter } from '../components/AnimatedLetter';
import { useState, useRef, useEffect } from 'react';

export function Home() {
  const navigate = useNavigate();
  const [isDriving, setIsDriving] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [framesLoaded, setFramesLoaded] = useState(false);
  const currentFrameIndex = useRef(0);

  const FRAME_COUNT = 106;

  // Preload frames
  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/frames/frame_${String(i).padStart(4, "0")}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setFramesLoaded(true);
        }
      };
      imgs.push(img);
    }
    framesRef.current = imgs;
  }, []);

  // Canvas drawing logic
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const img = framesRef.current[index];
    if (!img || !img.complete) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    
    canvas.width = cw * dpr;
    canvas.height = ch * dpr;
    canvas.style.width = `${cw}px`;
    canvas.style.height = `${ch}px`;
    ctx.scale(dpr, dpr);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;

    let drawW, drawH, drawX, drawY;

    if (canvasRatio > imgRatio) {
      drawW = cw; drawH = cw / imgRatio;
    } else {
      drawH = ch; drawW = ch * imgRatio;
    }

    // Cover-fit
    drawX = (cw - drawW) / 2;
    drawY = (ch - drawH) / 2;
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  };

  // Initial draw and resize handler
  useEffect(() => {
    if (framesLoaded) {
      drawFrame(currentFrameIndex.current);
    }
    const handleResize = () => {
      if (framesLoaded) drawFrame(currentFrameIndex.current);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [framesLoaded]);

  const { scrollYProgress, scrollY } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const smoothHeroProgress = useSpring(heroProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001
  });

  // Smooth canvas scrub based on hero progress
  useMotionValueEvent(smoothHeroProgress, "change", (latest) => {
    if (framesLoaded && framesRef.current.length > 0) {
      const frameIndex = Math.min(
        FRAME_COUNT - 1, 
        Math.floor(latest * FRAME_COUNT)
      );
      
      if (frameIndex !== currentFrameIndex.current) {
        currentFrameIndex.current = frameIndex;
        drawFrame(frameIndex);
      }
    }
  });

  // Hero Text Overlays based on hero scroll
  const titleOpacity = useTransform(smoothHeroProgress, [0, 0.15], [1, 0]);
  const titleY = useTransform(smoothHeroProgress, [0, 0.15], [0, -50]);

  const quoteOpacity = useTransform(smoothHeroProgress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]);
  const quoteY = useTransform(smoothHeroProgress, [0.2, 0.3, 0.5, 0.6], [50, 0, 0, -50]);

  const buildOpacity = useTransform(smoothHeroProgress, [0.55, 0.65, 0.85, 0.95], [0, 1, 1, 0]);
  const buildY = useTransform(smoothHeroProgress, [0.55, 0.65], [50, 0]);

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
    
    // Navigate when full 7-second video animation finishes
    setTimeout(() => {
      navigate('/projects');
    }, 7000);
  };

  return (
    <div className="bg-background text-primary min-h-screen selection:bg-primary selection:text-black ">
      
      {/* DRIVE TRANSITION OVERLAY */}
      <AnimatePresence>
        {isDriving && (
          <motion.div 
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Cinematic Circle Reveal Video */}
            <motion.div
              className="absolute inset-0 z-0 w-full h-full flex items-center justify-center"
              initial={{ clipPath: "circle(0% at 50% 50%)" }}
              animate={{ clipPath: "circle(150% at 50% 50%)" }}
              transition={{ duration: 2.5, ease: [0.76, 0, 0.24, 1] }}
            >
              <motion.video
                src="/frames/kling_20260421_作品_Cinematic__4368_0.mp4"
                autoPlay
                muted
                playsInline
                initial={{ scale: 1.5, filter: "blur(20px)" }}
                animate={{ scale: 1.05, filter: "blur(0px)" }}
                transition={{ duration: 7, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Vignette & Gradient Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80 z-10" />
            </motion.div>
            
            {/* Sleek Masked Typography */}
            <motion.div 
              className="relative z-10 flex flex-col items-center justify-center w-full"
            >
              <div className="overflow-hidden pb-4">
                <motion.h2 
                  className="text-7xl sm:text-8xl md:text-[10rem] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/30 tracking-tighter font-normal drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]" 
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                  initial={{ y: "120%", rotate: 2 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  PROJECTS
                </motion.h2>
              </div>
              
              <motion.div 
                className="flex items-center gap-4 text-white/60 text-xs md:text-sm tracking-[0.4em] uppercase font-mono mt-4"
                initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
              >
                <span>Initialization</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                <span>Sequence Active</span>
              </motion.div>
            </motion.div>
            
            {/* Cinematic top/bottom bars with Progress Line */}
            <motion.div 
              className="absolute top-0 left-0 right-0 h-[12vh] bg-black z-20"
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 0.2, duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-[12vh] bg-black z-20 flex flex-col justify-center px-8 md:px-16"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 0.2, duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="flex justify-between text-[10px] text-white/40 font-mono tracking-widest uppercase mb-3">
                <span>Loading Core</span>
                <span>7.04s</span>
              </div>
              <div className="w-full h-[2px] bg-white/10 relative overflow-hidden rounded-full">
                <motion.div 
                  className="absolute top-0 left-0 bottom-0 bg-white shadow-[0_0_15px_rgba(255,255,255,1)]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 7, ease: "linear" }}
                />
              </div>
            </motion.div>

            {/* Seamless Flash Transition to Next Page */}
            <motion.div
              className="absolute inset-0 bg-white z-[200]"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1] }}
              transition={{ duration: 7, times: [0, 0.95, 1], ease: "easeIn" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: HERO (Scroll-Linked sticky section) */}
      <section ref={heroRef} className="relative h-[300vh] w-full bg-black z-20">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Background Canvas - perfect 0-lag scroll */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
          />
          
          {/* Cinematic Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-0" />
          
          {/* Top Navbar */}
          <nav className="relative z-10 flex flex-row justify-between items-center px-6 md:px-12 py-8 max-w-[1400px] mx-auto w-full">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <div className="text-xs md:text-sm tracking-[0.3em] text-white/80 uppercase font-mono">
                Agam <span className="text-white/40">/ Portfolio</span>
              </div>
            </div>
            
            <div className="flex items-center gap-8 text-xs tracking-[0.2em] text-white/50 uppercase font-mono">
              <Link to="#" className="hover:text-white transition-colors">Systems</Link>
              <Link to="/connect" className="hover:text-white transition-colors">Archive</Link>
            </div>
            
            <Link to="/journey" className="border border-white/20 rounded-full px-6 py-2 text-xs text-white/80 hover:bg-white/10 transition-colors uppercase tracking-widest font-mono hidden sm:flex items-center gap-2">
              Engage <ArrowRight className="w-3 h-3" />
            </Link>
          </nav>

          {/* Cinematic HUD Elements (Static) */}
          <div className="absolute top-32 left-8 md:left-12 flex flex-col gap-2 z-10 hidden sm:block">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 border-t border-l border-amber-500/50" />
              <span className="text-[10px] tracking-[0.4em] text-white/40 font-mono uppercase">Telemetry Link - Live</span>
            </div>
          </div>
          <div className="absolute top-32 right-8 md:right-12 flex flex-col items-end gap-2 z-10 hidden sm:block">
            <div className="flex items-center gap-3">
              <span className="text-[10px] tracking-[0.4em] text-white/40 font-mono uppercase">Core Status 93.0%</span>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <div className="w-3 h-3 border-t border-r border-amber-500/50" />
            </div>
          </div>
          <div className="absolute bottom-12 left-8 md:left-12 flex items-end gap-3 z-10 hidden sm:flex">
            <div className="w-3 h-3 border-b border-l border-amber-500/50" />
            <span className="text-[10px] tracking-[0.4em] text-white/20 font-mono uppercase">SEQ 001 / 169</span>
          </div>
          <div className="absolute bottom-12 right-8 md:right-12 flex items-end justify-end gap-3 z-10 hidden sm:flex">
            <span className="text-[10px] tracking-[0.4em] text-white/20 font-mono uppercase">System // Diagnostic</span>
            <div className="w-3 h-3 border-b border-r border-amber-500/50" />
          </div>

          {/* SCROLL-LINKED TEXT OVERLAYS */}
          
          {/* Phase 1: Initial Greeting */}
          <motion.div 
            className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-32 z-10 pointer-events-none"
            style={{ opacity: titleOpacity, y: titleY }}
          >
            <h1 
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[1] tracking-[-2px] font-normal text-white drop-shadow-2xl mix-blend-overlay" 
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Hi, I'm <br/>
              <span className="italic">Agam.</span>
            </h1>
            <p className="text-sm md:text-base text-white/60 tracking-[0.4em] font-mono mt-8 uppercase max-w-md border-l border-white/20 pl-6">
              Engineering Interfaces & Products.
            </p>
          </motion.div>

          {/* Phase 2: Floating Cinematic Quote */}
          <motion.div 
            className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 z-10 max-w-sm"
            style={{ opacity: quoteOpacity, y: quoteY }}
          >
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <p className="text-xl md:text-2xl text-white font-light leading-snug">
                "Sometimes you gotta run before you can walk."
              </p>
              <div className="flex justify-between items-center mt-8">
                <span className="text-white/60 text-sm">Tony Stark</span>
                <span className="text-amber-500/80 text-[10px] tracking-widest font-mono uppercase">Iron Man - 2008</span>
              </div>
            </div>
          </motion.div>

          {/* Phase 3: Massive Action Text */}
          <motion.div 
            className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-32 z-10 pointer-events-none"
            style={{ opacity: buildOpacity, y: buildY }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-[10px] tracking-[0.4em] text-white/60 font-mono uppercase">Protocol - MK LXXXV</span>
            </div>
            <h2 className="text-6xl sm:text-8xl md:text-[8rem] leading-[0.9] tracking-tighter text-white font-bold drop-shadow-2xl">
              Build<br/>
              <span className="text-amber-500">with Agam</span>
            </h2>
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
