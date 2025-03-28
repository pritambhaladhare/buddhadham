import { ReactNode, useRef, useEffect, useState } from 'react';
import { motion, useInView, MotionProps } from 'framer-motion';

interface ScrollRevealContainerProps extends MotionProps {
  children: ReactNode;
  effect?: 
    | 'fade-up' 
    | 'fade-down' 
    | 'fade-left' 
    | 'fade-right' 
    | 'zoom-in' 
    | 'zoom-out' 
    | 'flip-up'
    | 'flip-down'
    | 'rotate-in'
    | 'slide-in';
  delay?: number;
  duration?: number;
  threshold?: number; // 0-1, percentage of element that must be visible
  once?: boolean;
  className?: string;
}

interface CustomTransition {
  duration: number;
  delay: number;
  ease: string;
  type?: string;
  stiffness?: number;
  damping?: number;
}

const ScrollRevealContainer = ({ 
  children, 
  effect = 'fade-up', 
  delay = 0,
  duration = 0.6,
  threshold = 0.2,
  once = true,
  className = '',
  ...props
}: ScrollRevealContainerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);
  
  // Define initial and animate properties based on effect
  let initial = {};
  let animate = {};
  
  // Create transition object
  let transition: CustomTransition = { 
    duration, 
    delay, 
    ease: "easeOut"
  };
  
  switch(effect) {
    case 'fade-up':
      initial = { y: 50, opacity: 0 };
      animate = { y: 0, opacity: 1 };
      break;
    case 'fade-down':
      initial = { y: -50, opacity: 0 };
      animate = { y: 0, opacity: 1 };
      break;
    case 'fade-left':
      initial = { x: -50, opacity: 0 };
      animate = { x: 0, opacity: 1 };
      break;
    case 'fade-right':
      initial = { x: 50, opacity: 0 };
      animate = { x: 0, opacity: 1 };
      break;
    case 'zoom-in':
      initial = { scale: 0.8, opacity: 0 };
      animate = { scale: 1, opacity: 1 };
      break;
    case 'zoom-out':
      initial = { scale: 1.2, opacity: 0 };
      animate = { scale: 1, opacity: 1 };
      break;
    case 'flip-up':
      initial = { rotateX: 90, opacity: 0, perspective: 1000 };
      animate = { rotateX: 0, opacity: 1, perspective: 1000 };
      transition = {
        ...transition,
        type: "spring",
        stiffness: 300,
        damping: 20
      };
      break;
    case 'flip-down':
      initial = { rotateX: -90, opacity: 0, perspective: 1000 };
      animate = { rotateX: 0, opacity: 1, perspective: 1000 };
      transition = {
        ...transition,
        type: "spring",
        stiffness: 300,
        damping: 20
      };
      break;
    case 'rotate-in':
      initial = { rotate: -15, opacity: 0, scale: 0.9 };
      animate = { rotate: 0, opacity: 1, scale: 1 };
      transition = {
        ...transition,
        type: "spring",
        stiffness: 300,
        damping: 20
      };
      break;
    case 'slide-in':
      initial = { y: 100, opacity: 0 };
      animate = { y: 0, opacity: 1 };
      transition = {
        ...transition,
        type: "spring",
        stiffness: 300,
        damping: 30
      };
      break;
    default:
      initial = { opacity: 0 };
      animate = { opacity: 1 };
  }
  
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={transition}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollRevealContainer;