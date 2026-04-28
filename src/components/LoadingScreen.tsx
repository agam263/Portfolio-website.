import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const words = ["Creative Coder", "Software Engineer", "AI Enthusiast", "System Designer", "Agam Kundu"];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [wordIndex, setWordIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle words cycling
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => {
        if (prev < words.length - 1) return prev + 1;
        clearInterval(wordInterval);
        return prev;
      });
    }, 1200);

    return () => clearInterval(wordInterval);
  }, []);

  // Attempt Autoplay
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.log("Autoplay blocked, waiting for user click", e);
      });
    }
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black cursor-pointer"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      onClick={() => {
        if (!isPlaying && videoRef.current) {
          videoRef.current.play();
          setIsPlaying(true);
        } else {
          // Allow skipping the intro by clicking
          onComplete();
        }
      }}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        src="/screenshots/space.mp4"
        playsInline
        onEnded={onComplete}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Click to Play Overlay (if browser blocks audio autoplay) */}
      {!isPlaying && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-md text-white/70 tracking-[0.3em] uppercase text-sm animate-pulse">
          Click anywhere to start
        </div>
      )}

      {/* Element 2: Rotating Words in the middle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] text-center px-4"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            {words[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
