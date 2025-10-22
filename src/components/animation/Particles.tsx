import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

interface ParticlesProps {
  count?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  speed?: number;
  spread?: number;
  className?: string;
  shape?: 'circle' | 'square' | 'triangle' | 'leaf';
}

const Particles = ({
  count = 15,
  colors = ['#FFA500', '#FFD700', '#FF8C00', '#FF4500', '#FFDAB9'],
  minSize = 5,
  maxSize = 15,
  speed = 20,
  spread = 200,
  className = '',
  shape = 'circle'
}: ParticlesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Get container dimensions
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
    // Generate particles
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < count; i++) {
      const size = Math.random() * (maxSize - minSize) + minSize;
      newParticles.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 5
      });
    }
    
    setParticles(newParticles);
  }, [dimensions, count, colors, minSize, maxSize]);
  
  // Style for each shape
  const getShapeStyle = (shape: string, size: number) => {
    switch (shape) {
      case 'square':
        return {
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '2px'
        };
      case 'triangle':
        return {
          width: '0',
          height: '0',
          borderLeft: `${size/2}px solid transparent`,
          borderRight: `${size/2}px solid transparent`,
          borderBottom: `${size}px solid currentColor`
        };
      case 'leaf':
        return {
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '0 50% 50% 50%',
          transform: 'rotate(45deg)'
        };
      case 'circle':
      default:
        return {
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%'
        };
    }
  };
  
  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: particle.x,
            top: particle.y,
            color: particle.color,
            backgroundColor: shape !== 'triangle' ? particle.color : 'transparent',
            ...getShapeStyle(shape, particle.size)
          }}
          animate={{
            y: [particle.y, particle.y - spread],
            opacity: [0, 0.7, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default Particles;