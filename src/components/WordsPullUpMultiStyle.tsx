import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
}

export function WordsPullUpMultiStyle({ segments, className }: WordsPullUpMultiStyleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Flatten all words while keeping track of their segment's className
  const allWords = segments.flatMap((segment) =>
    segment.text.split(' ').map((word) => ({ word, className: segment.className }))
  );

  return (
    <div ref={ref} className={twMerge("inline-flex flex-wrap justify-center", className)}>
      {allWords.map((item, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={twMerge("mr-[0.25em] inline-block", item.className)}
        >
          {item.word}
        </motion.span>
      ))}
    </div>
  );
}
