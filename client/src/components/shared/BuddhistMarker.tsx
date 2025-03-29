import React from 'react';

interface BuddhistMarkerProps {
  size?: number;
  color?: string;
  className?: string;
}

// Enhanced custom Buddhist-inspired marker SVG
const BuddhistMarker = ({
  size = 32,
  color = '#D2691E',
  className = '',
}: BuddhistMarkerProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size * 1.5}
      viewBox="0 0 32 48"
      className={`${className} drop-shadow-lg`}
      fill="none"
    >
      {/* Shadow effect */}
      <ellipse cx="16" cy="47" rx="8" ry="1" fill="rgba(0,0,0,0.3)" />
      
      {/* Marker base shape with gradient fill */}
      <defs>
        <linearGradient id="markerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={`${color}99`} />
        </linearGradient>
      </defs>
      
      <path
        d="M16 48C16 48 32 31.6 32 16C32 7.16 24.84 0 16 0C7.16 0 0 7.16 0 16C0 31.6 16 48 16 48Z"
        fill="url(#markerGradient)"
        filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
      />
      
      {/* Glow effect */}
      <circle cx="16" cy="16" r="14" fill={color} opacity="0.1" />
      
      {/* Inner circle (center) */}
      <circle cx="16" cy="16" r="12" fill="#fff" />
      
      {/* Petal/Lotus Pattern (simplified) */}
      <path 
        d="M16 4C16.5 8 20 12 24 12C20 12.5 16 16 16 20C15.5 16 12 12 8 12C12 11.5 15.5 8 16 4Z" 
        fill={color} 
        opacity="0.9" 
      />
      
      {/* Buddhist Wheel of Dharma (enhanced) */}
      <circle cx="16" cy="16" r="8" fill={`${color}CC`} />
      <circle cx="16" cy="16" r="7" stroke="#fff" strokeWidth="0.5" fill="none" />
      <circle cx="16" cy="16" r="3" fill="#fff" />
      <circle cx="16" cy="16" r="2.5" stroke={color} strokeWidth="0.3" fill="none" />
      
      {/* Wheel spokes with decorative ends */}
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
    </svg>
  );
};

export default BuddhistMarker;