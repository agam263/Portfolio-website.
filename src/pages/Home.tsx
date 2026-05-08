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
  
  // Hero Canvas Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [framesLoaded, setFramesLoaded] = useState(false);
  const currentFrameIndex = useRef(0);

  // Footer Canvas Refs
  const footerCanvasRef = useRef<HTMLCanvasElement>(null);
  const footerFramesRef = useRef<HTMLImageElement[]>([]);
  const [footerFramesLoaded, setFooterFramesLoaded] = useState(false);
  const currentFooterFrameIndex = useRef(0);

  const FRAME_COUNT = 106;

  // Preload hero frames
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

  // Preload footer frames
  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/frames_footer/frame_${String(i).padStart(4, "0")}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setFooterFramesLoaded(true);
        }
      };
      imgs.push(img);
    }
    footerFramesRef.current = imgs;
  }, []);

  // Canvas drawing logic for Hero
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const img = framesRef.current[index];
    if (!img || !img.complete) return;

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

    drawX = (cw - drawW) / 2;
    drawY = (ch - drawH) / 2;
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  };

  // Canvas drawing logic for Footer
  const drawFooterFrame = (index: number) => {
    const canvas = footerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const img = footerFramesRef.current[index];
    if (!img || !img.complete) return;

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

    drawX = (cw - drawW) / 2;
    drawY = (ch - drawH) / 2;
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  };

  // Initial draw and resize handler
  useEffect(() => {
    if (framesLoaded) drawFrame(currentFrameIndex.current);
    if (footerFramesLoaded) drawFooterFrame(currentFooterFrameIndex.current);
    
    const handleResize = () => {
      if (framesLoaded) drawFrame(currentFrameIndex.current);
      if (footerFramesLoaded) drawFooterFrame(currentFooterFrameIndex.current);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [framesLoaded, footerFramesLoaded]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const smoothHeroProgress = useSpring(heroProgress, {
    stiffness: 60,
    damping: 20,
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
    stiffness: 60,
    damping: 20,
    restDelta: 0.001
  });

  // Smooth canvas scrub based on footer progress
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (footerFramesLoaded && footerFramesRef.current.length > 0) {
      const frameIndex = Math.min(
        FRAME_COUNT - 1, 
        Math.floor(latest * FRAME_COUNT)
      );
      
      if (frameIndex !== currentFooterFrameIndex.current) {
        currentFooterFrameIndex.current = frameIndex;
        drawFooterFrame(frameIndex);
      }
    }
  });

  // Footer Creative Text Overlays
  const projOpacity = useTransform(smoothProgress, [0, 0.1, 0.25, 0.33], [0, 1, 1, 0]);
  const projY = useTransform(smoothProgress, [0, 0.1, 0.25, 0.33], [50, 0, 0, -50]);

  const expOpacity = useTransform(smoothProgress, [0.33, 0.43, 0.58, 0.66], [0, 1, 1, 0]);
  const expY = useTransform(smoothProgress, [0.33, 0.43, 0.58, 0.66], [50, 0, 0, -50]);

  const skillsOpacity = useTransform(smoothProgress, [0.66, 0.76, 0.9, 1], [0, 1, 1, 1]);
  const skillsY = useTransform(smoothProgress, [0.66, 0.76, 0.9, 1], [50, 0, 0, 0]);

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
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
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
          
          {/* Navigation Bar */}
          <nav className="relative z-10 flex flex-row justify-between items-center px-6 md:px-8 py-6 max-w-7xl mx-auto w-full pointer-events-auto">
            <div className="text-2xl md:text-3xl tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Agam<sup className="text-xs text-white/60">*</sup>
            </div>
            <div className="flex items-center gap-4 md:gap-8">
              <Link to="#" className="text-xs md:text-sm transition-colors text-white hover:text-white/80">
                About
              </Link>
              <Link to="/connect" className="text-xs md:text-sm transition-colors text-white/60 hover:text-white">
                Contact
              </Link>
            </div>
            <Link to="/journey" className="liquid-glass rounded-full px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm text-white hover:scale-[1.03] transition-transform hidden sm:inline-flex items-center">
              My Journey
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
            className="absolute inset-0 flex flex-col justify-center items-start w-full px-6 md:px-12 lg:px-24 z-10 pointer-events-none"
            style={{ opacity: titleOpacity, y: titleY }}
          >
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-[-1.5px] max-w-5xl font-normal text-white flex flex-col gap-2" 
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
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
            
            <motion.div 
              className="mt-12 pointer-events-auto"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <Link 
                to="/journey" 
                className="liquid-glass rounded-full px-12 py-4 text-base text-white inline-flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
              >
                My Journey
              </Link>
            </motion.div>
          </motion.div>

          {/* Phase 2: Creative Developer Text */}
          <motion.div 
            className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 z-10 pointer-events-none flex flex-col items-end"
            style={{ opacity: quoteOpacity, y: quoteY }}
          >
            <h2 className="text-6xl sm:text-8xl md:text-[10rem] text-white tracking-tighter font-normal drop-shadow-2xl mix-blend-overlay text-right" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Creative
            </h2>
            <p className="text-xl md:text-3xl text-white/80 tracking-[0.3em] font-light mt-2 uppercase mix-blend-overlay text-right">
              Developer & Designer
            </p>
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

      {/* SECTION 3: FOOTER SCROLL SEQUENCE */}
      <section ref={sectionRef} className="relative w-full h-[300vh] bg-black z-20">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Background Canvas for Footer Video */}
          <canvas
            ref={footerCanvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
          />
          
          {/* Subtle gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80 z-0 pointer-events-none" />

          {/* Phase 1: Projects */}
          <motion.div 
            className="absolute inset-0 flex flex-col justify-center items-center px-6 z-10 pointer-events-none"
            style={{ opacity: projOpacity, y: projY }}
          >
            <h2 
              className="text-6xl sm:text-8xl md:text-[10rem] font-normal text-white tracking-tighter drop-shadow-2xl mb-8"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Projects<span className="text-amber-500">*</span>
            </h2>
            <div className="pointer-events-auto">
              <button 
                onClick={handleProjectClick}
                className="liquid-glass rounded-full px-10 py-4 text-sm tracking-[0.2em] uppercase font-mono text-white flex items-center gap-4 hover:scale-105 transition-all group"
              >
                Explore Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Phase 2: Experience */}
          <motion.div 
            className="absolute inset-0 flex flex-col justify-center items-center px-6 z-10 pointer-events-none"
            style={{ opacity: expOpacity, y: expY }}
          >
            <h2 
              className="text-6xl sm:text-8xl md:text-[10rem] font-normal text-white tracking-tighter drop-shadow-2xl mb-8"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Experience<span className="text-amber-500">*</span>
            </h2>
            <div className="pointer-events-auto">
              <button 
                onClick={() => navigate('/experience')}
                className="liquid-glass rounded-full px-10 py-4 text-sm tracking-[0.2em] uppercase font-mono text-white flex items-center gap-4 hover:scale-105 transition-all group"
              >
                View Background <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Phase 3: Skills */}
          <motion.div 
            className="absolute inset-0 flex flex-col justify-center items-center px-6 z-10 pointer-events-none"
            style={{ opacity: skillsOpacity, y: skillsY }}
          >
            <h2 
              className="text-6xl sm:text-8xl md:text-[10rem] font-normal text-white tracking-tighter drop-shadow-2xl mb-8"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Skills<span className="text-amber-500">*</span>
            </h2>
            <div className="pointer-events-auto">
              <button 
                onClick={() => navigate('/skills')}
                className="liquid-glass rounded-full px-10 py-4 text-sm tracking-[0.2em] uppercase font-mono text-white flex items-center gap-4 hover:scale-105 transition-all group"
              >
                Discover Stack <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

        </div>
      </section>


    </div>
  );
}
