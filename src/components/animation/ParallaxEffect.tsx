import React, { useEffect, useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxEffectProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  speed?: number;
  className?: string;
}

const ParallaxEffect: React.FC<ParallaxEffectProps> = ({
  children,
  direction = 'up',
  speed = 0.5,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Determine the transform property based on direction
  let x = useTransform(scrollYProgress, [0, 1], [0, 0]);
  let y = useTransform(scrollYProgress, [0, 1], [0, 0]);

  if (direction === 'up') {
    y = useTransform(scrollYProgress, [0, 1], [50 * speed, -50 * speed]);
  } else if (direction === 'down') {
    y = useTransform(scrollYProgress, [0, 1], [-50 * speed, 50 * speed]);
  } else if (direction === 'left') {
    x = useTransform(scrollYProgress, [0, 1], [50 * speed, -50 * speed]);
  } else if (direction === 'right') {
    x = useTransform(scrollYProgress, [0, 1], [-50 * speed, 50 * speed]);
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ x, y }}
        transition={{ ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxEffect;