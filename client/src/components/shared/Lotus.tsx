import { motion } from 'framer-motion';

interface LotusProps {
  size?: number;
  color?: string;
  className?: string;
  animate?: boolean;
}

const Lotus = ({ size = 60, color = '#f97316', className = '', animate = true }: LotusProps) => {
  // Animation variants for petals
  const petalVariants = {
    initial: { rotate: 0, scale: 0.95 },
    animate: { 
      rotate: [-2, 2, -2],
      scale: [0.95, 1, 0.95],
      transition: {
        rotate: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        },
        scale: {
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }
      }
    }
  };
  
  // Animation for center
  const centerVariants = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.05, 1],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
      }
    }
  };
  
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Lotus petals */}
      <svg viewBox="0 0 100 100" width={size} height={size}>
        {/* Back row petals */}
        {[-45, -20, 0, 20, 45].map((angle, index) => (
          <motion.path
            key={`back-${index}`}
            d="M50,50 C60,35 70,20 50,10 C30,20 40,35 50,50"
            fill={color}
            fillOpacity={0.7}
            transform={`rotate(${angle}, 50, 50)`}
            variants={petalVariants}
            initial="initial"
            animate={animate ? "animate" : "initial"}
            transition={{
              delay: index * 0.1
            }}
          />
        ))}
        
        {/* Middle row petals */}
        {[-30, -10, 10, 30].map((angle, index) => (
          <motion.path
            key={`middle-${index}`}
            d="M50,50 C62,30 65,15 50,5 C35,15 38,30 50,50"
            fill={color}
            fillOpacity={0.8}
            transform={`rotate(${angle}, 50, 50)`}
            variants={petalVariants}
            initial="initial"
            animate={animate ? "animate" : "initial"}
            transition={{
              delay: 0.2 + index * 0.1
            }}
          />
        ))}
        
        {/* Front row petals */}
        {[-15, 0, 15].map((angle, index) => (
          <motion.path
            key={`front-${index}`}
            d="M50,50 C65,25 60,10 50,0 C40,10 35,25 50,50"
            fill={color}
            transform={`rotate(${angle}, 50, 50)`}
            variants={petalVariants}
            initial="initial"
            animate={animate ? "animate" : "initial"}
            transition={{
              delay: 0.4 + index * 0.1
            }}
          />
        ))}
        
        {/* Center of the lotus */}
        <motion.circle 
          cx="50" 
          cy="50" 
          r="8" 
          fill="#FFD700"
          variants={centerVariants}
          initial="initial"
          animate={animate ? "animate" : "initial"}
        />
      </svg>
    </div>
  );
};

export default Lotus;