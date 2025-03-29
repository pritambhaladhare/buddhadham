import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface BuddhistMarkerProps {
  size?: number;
  color?: string;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
}

// Enhanced custom Buddhist-inspired marker SVG with animations
const BuddhistMarker = ({
  size = 32,
  color = '#D2691E',
  className = '',
  isActive = false,
  onClick
}: BuddhistMarkerProps) => {
  const [hover, setHover] = useState(false);
  const markerScale = isActive ? 1.2 : hover ? 1.1 : 1;
  const uniqueId = React.useId();
  const gradientId = `markerGradient-${uniqueId}`;
  const glowFilterId = `glowFilter-${uniqueId}`;
  
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size * 1.5}
      viewBox="0 0 32 48"
      className={`${className} drop-shadow-lg cursor-pointer`}
      fill="none"
      initial={{ scale: 1, y: 0 }}
      animate={{ 
        scale: markerScale,
        y: [0, -2, 0],
        transition: {
          y: {
            repeat: Infinity,
            duration: isActive ? 1.5 : 3,
            ease: "easeInOut"
          },
          scale: {
            duration: 0.3,
            ease: "easeOut"
          }
        }
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={`${color}99`} />
        </linearGradient>
        
        <filter id={glowFilterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={isActive ? "2.5" : hover ? "1.5" : "0"} />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      
      {/* Shadow effect */}
      <motion.ellipse 
        cx="16" 
        cy="47" 
        rx="8" 
        ry="1" 
        fill="rgba(0,0,0,0.3)"
        animate={{ 
          rx: isActive ? 9 : 8,
          opacity: isActive ? 0.4 : 0.3
        }}
      />
      
      {/* Animated glow effect */}
      <motion.circle 
        cx="16" 
        cy="16" 
        r="14" 
        fill={color} 
        opacity="0.2"
        animate={{ 
          r: isActive ? 16 : hover ? 15 : 14,
          opacity: isActive ? 0.3 : hover ? 0.25 : 0.2,
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1.5
        }}
      />
      
      {/* Marker base shape with gradient fill */}
      <motion.path
        d="M16 48C16 48 32 31.6 32 16C32 7.16 24.84 0 16 0C7.16 0 0 7.16 0 16C0 31.6 16 48 16 48Z"
        fill={`url(#${gradientId})`}
        filter={isActive || hover ? `url(#${glowFilterId})` : undefined}
        animate={{
          filter: isActive || hover ? "drop-shadow(0px 6px 8px rgba(0, 0, 0, 0.3))" : "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
        }}
      />
      
      {/* Inner circle (center) */}
      <circle cx="16" cy="16" r="12" fill="#fff" />
      
      {/* Animated Petal/Lotus Pattern */}
      <motion.path 
        d="M16 4C16.5 8 20 12 24 12C20 12.5 16 16 16 20C15.5 16 12 12 8 12C12 11.5 15.5 8 16 4Z" 
        fill={color} 
        opacity="0.9"
        animate={{ 
          rotate: isActive ? [0, 180, 360] : 0
        }}
        transition={{
          duration: 20,
          repeat: isActive ? Infinity : 0,
          ease: "linear"
        }}
      />
      
      {/* Buddhist Wheel of Dharma (enhanced) */}
      <circle cx="16" cy="16" r="8" fill={`${color}CC`} />
      <circle cx="16" cy="16" r="7" stroke="#fff" strokeWidth="0.5" fill="none" />
      <circle cx="16" cy="16" r="3" fill="#fff" />
      <circle cx="16" cy="16" r="2.5" stroke={color} strokeWidth="0.3" fill="none" />
      
      {/* Animated Wheel spokes with decorative ends */}
      <motion.g
        animate={{
          rotate: isActive ? 360 : hover ? 45 : 0
        }}
        transition={{
          duration: isActive ? 8 : 2,
          repeat: isActive ? Infinity : 0,
          ease: "linear"
        }}
      >
        {[0, 45, 90, 135].map((angle, i) => (
          <g key={i}>
            <line 
              transform={`rotate(${angle} 16 16)`}
              x1="16" 
              y1="8" 
              x2="16" 
              y2="24" 
              stroke="#fff" 
              strokeWidth="1.2" 
            />
            <circle 
              transform={`rotate(${angle} 16 16)`}
              cx="16" 
              cy="8" 
              r="0.8" 
              fill="#fff" 
            />
            <circle 
              transform={`rotate(${angle} 16 16)`}
              cx="16" 
              cy="24" 
              r="0.8" 
              fill="#fff" 
            />
          </g>
        ))}
      </motion.g>
    </motion.svg>
  );
};

export default BuddhistMarker;