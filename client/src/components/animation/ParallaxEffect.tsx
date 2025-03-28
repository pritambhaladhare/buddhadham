import React, { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxEffectProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  speed?: number; // 0-1, where 1 is fastest
  className?: string;
}

const ParallaxEffect = ({ 
  children, 
  direction = 'up', 
  speed = 0.3,
  className = ''
}: ParallaxEffectProps) => {
  const { scrollY } = useScroll();
  
  // Adjust the speed factor (higher number = more movement)
  const speedFactor = speed * 300;
  
  // Create transform property based on direction
  let transformProp;
  switch (direction) {
    case 'up':
      transformProp = useTransform(scrollY, [0, speedFactor], [0, -speedFactor]);
      break;
    case 'down':
      transformProp = useTransform(scrollY, [0, speedFactor], [0, speedFactor]);
      break;
    case 'left':
      transformProp = useTransform(scrollY, [0, speedFactor], [0, -speedFactor]);
      break;
    case 'right':
      transformProp = useTransform(scrollY, [0, speedFactor], [0, speedFactor]);
      break;
    default:
      transformProp = useTransform(scrollY, [0, speedFactor], [0, -speedFactor]);
  }
  
  // Set style property based on direction
  const style = {
    y: direction === 'up' || direction === 'down' ? transformProp : 0,
    x: direction === 'left' || direction === 'right' ? transformProp : 0,
  };
  
  return (
    <motion.div className={className} style={style}>
      {children}
    </motion.div>
  );
};

export default ParallaxEffect;