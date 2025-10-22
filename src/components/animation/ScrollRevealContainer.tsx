import React, { useEffect, useRef, ReactNode } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ScrollRevealContainerProps {
  children: ReactNode;
  effect?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out';
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export const ScrollRevealContainer: React.FC<ScrollRevealContainerProps> = ({
  children,
  effect = 'fade-up',
  delay = 0,
  duration = 0.5,
  threshold = 0.2,
  once = true,
  className = '',
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: threshold,
  });

  const variants: { [key: string]: Variants } = {
    'fade-up': {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    'fade-down': {
      hidden: { opacity: 0, y: -30 },
      visible: { opacity: 1, y: 0 },
    },
    'fade-left': {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 },
    },
    'fade-right': {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0 },
    },
    'zoom-in': {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
    'zoom-out': {
      hidden: { opacity: 0, scale: 1.1 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants[effect]}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollRevealContainer;