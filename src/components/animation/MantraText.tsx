import { useState, useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface MantraTextProps {
  text: string;
  speed?: 'slow' | 'medium' | 'fast';
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  className?: string;
}

const MantraText = ({ 
  text = 'ॐ मणि पद्मे हूँ', 
  speed = 'medium',
  color = '#f97316',
  backgroundColor = 'rgba(249, 115, 22, 0.1)',
  fontSize = '1.5rem',
  className = ''
}: MantraTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollControls = useAnimationControls();
  
  // Define intervals based on speed
  const getIntervalSpeed = () => {
    switch(speed) {
      case 'slow':
        return 2000; // 2 seconds
      case 'medium':
        return 1000; // 1 second
      case 'fast':
        return 500; // 0.5 seconds
      default:
        return 1000;
    }
  };
  
  const intervalSpeed = getIntervalSpeed();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        if (prevIndex >= text.length - 1) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    }, intervalSpeed);
    
    return () => clearInterval(interval);
  }, [text, intervalSpeed]);
  
  // Set up horizontal scroll animation
  useEffect(() => {
    if (containerRef.current && containerRef.current.scrollWidth > containerRef.current.clientWidth) {
      const scrollAnimation = async () => {
        // Start from the left
        await scrollControls.start({
          x: -(containerRef.current?.scrollWidth || 0) + (containerRef.current?.clientWidth || 0),
          transition: {
            duration: 30,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }
        });
      };
      
      scrollAnimation();
    }
  }, [text, scrollControls]);
  
  // Split text into characters
  const characters = text.split('');
  
  return (
    <div className="relative overflow-hidden w-full" ref={containerRef}>
      <motion.div 
        className={`inline-flex items-center space-x-1 px-4 ${className}`}
        animate={scrollControls}
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ 
              scale: currentIndex === index ? 1.2 : 1,
              opacity: currentIndex === index ? 1 : 0.8,
            }}
            transition={{ 
              duration: currentIndex === index ? 0.5 : 0.3,
              ease: currentIndex === index ? "easeOut" : "easeIn"
            }}
            className="inline-block rounded-full p-1"
            style={{ 
              fontSize,
              color: currentIndex === index ? color : 'inherit',
              backgroundColor: currentIndex === index ? backgroundColor : 'transparent'
            }}
          >
            {char}
          </motion.span>
        ))}
        
        {/* Duplicate the text for smooth infinite scrolling */}
        {characters.map((char, index) => (
          <motion.span
            key={`dup-${index}`}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ 
              scale: currentIndex === index ? 1.2 : 1,
              opacity: currentIndex === index ? 1 : 0.8,
            }}
            transition={{ 
              duration: currentIndex === index ? 0.5 : 0.3,
              ease: currentIndex === index ? "easeOut" : "easeIn"
            }}
            className="inline-block rounded-full p-1"
            style={{ 
              fontSize,
              color: currentIndex === index ? color : 'inherit',
              backgroundColor: currentIndex === index ? backgroundColor : 'transparent'
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default MantraText;