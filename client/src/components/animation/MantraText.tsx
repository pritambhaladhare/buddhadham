import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
  
  // Character variants
  const characterVariants = {
    highlighted: { 
      scale: 1.3, 
      opacity: 1,
      borderRadius: '50%',
      padding: '0.5rem',
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    normal: { 
      scale: 1, 
      opacity: 0.8,
      padding: '0.5rem',
      transition: { 
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };
  
  // Split text into characters
  const characters = text.split('');
  
  return (
    <div className={`flex items-center justify-center space-x-1 overflow-hidden ${className}`}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ 
            scale: currentIndex === index ? 1.3 : 1,
            opacity: currentIndex === index ? 1 : 0.8,
          }}
          transition={{ 
            duration: currentIndex === index ? 0.5 : 0.3,
            ease: currentIndex === index ? "easeOut" : "easeIn"
          }}
          className="inline-block rounded-full p-2"
          style={{ 
            fontSize,
            color: currentIndex === index ? color : 'inherit',
            backgroundColor: currentIndex === index ? backgroundColor : 'transparent'
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

export default MantraText;