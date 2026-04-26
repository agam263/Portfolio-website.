import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedLetterProps {
  text: string;
  className?: string;
}

export function AnimatedLetter({ text, className }: AnimatedLetterProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2']
  });

  const chars = text.split('');
  const totalChars = chars.length;

  return (
    <span ref={ref} className={className}>
      {chars.map((char, index) => {
        const charProgress = index / totalChars;
        const start = Math.max(0, charProgress - 0.1);
        const end = Math.min(1, charProgress + 0.05);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

        return (
          <motion.span key={index} style={{ opacity }}>
            {char}
          </motion.span>
        );
      })}
    </span>
  );
}
