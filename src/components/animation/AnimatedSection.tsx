import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface AnimatedSectionProps extends MotionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

// Fade-in animation for sections that come into view
export const FadeInSection = ({ 
  children, 
  delay = 0, 
  className = "", 
  ...props 
}: AnimatedSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay, 
        ease: "easeOut" 
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Slide-in animation from the side
export const SlideInSection = ({ 
  children,  
  delay = 0,
  className = "",
  ...props
}: AnimatedSectionProps & { direction?: 'left' | 'right' }) => {
  const direction = props.direction || 'left';
  const initialX = direction === 'left' ? -50 : 50;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: initialX }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scale-up animation for elements that need to grow into view
export const ScaleUpSection = ({ 
  children, 
  delay = 0,
  className = "",
  ...props 
}: AnimatedSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Animation for staggered children
export const StaggerContainer = ({ 
  children, 
  delay = 0,
  staggerDelay = 0.1,
  className = "",
  ...props 
}: AnimatedSectionProps & { staggerDelay?: number }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delay,
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Child component for StaggerContainer
export const StaggerItem = ({ 
  children, 
  className = "",
  ...props 
}: AnimatedSectionProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 10
          }
        }
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Pulse animation for attention-grabbing elements
export const PulseElement = ({ 
  children, 
  className = "",
  ...props 
}: AnimatedSectionProps) => {
  return (
    <motion.div
      animate={{ 
        scale: [1, 1.05, 1],
      }}
      transition={{ 
        repeat: Infinity,
        repeatDelay: 3,
        duration: 0.5
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Floating animation for decorative elements
export const FloatingElement = ({ 
  children, 
  className = "",
  ...props 
}: AnimatedSectionProps) => {
  return (
    <motion.div
      animate={{ 
        y: [0, -10, 0],
      }}
      transition={{ 
        repeat: Infinity,
        repeatType: "reverse",
        duration: 2,
        ease: "easeInOut"
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};