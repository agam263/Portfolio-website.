import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}

export function WordsPullUp({ text, className, showAsterisk }: WordsPullUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const words = text.split(' ');

  return (
    <div ref={ref} className={twMerge("flex flex-wrap", className)}>
      {words.map((word, i) => {
        const isLastWord = i === words.length - 1;
        return (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mr-[0.25em] relative inline-flex"
          >
            {word}
            {showAsterisk && isLastWord && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">
                *
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
