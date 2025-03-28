import React from 'react';

interface BuddhistMarkerProps {
  size?: number;
  color?: string;
  className?: string;
}

// This is a custom Buddhist-inspired marker SVG
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
      className={className}
      fill="none"
    >
      {/* Marker base shape */}
      <path
        d="M16 48C16 48 32 31.6 32 16C32 7.16 24.84 0 16 0C7.16 0 0 7.16 0 16C0 31.6 16 48 16 48Z"
        fill={color}
      />
      
      {/* Inner circle (center) */}
      <circle cx="16" cy="16" r="12" fill="#fff" />
      
      {/* Buddhist Wheel of Dharma (simplified) */}
      <circle cx="16" cy="16" r="8" fill={color} opacity="0.8" />
      <circle cx="16" cy="16" r="3" fill="#fff" />
      
      {/* Wheel spokes */}
      <line x1="16" y1="8" x2="16" y2="24" stroke="#fff" strokeWidth="1.5" />
      <line x1="8" y1="16" x2="24" y2="16" stroke="#fff" strokeWidth="1.5" />
      <line x1="10.343" y1="10.343" x2="21.657" y2="21.657" stroke="#fff" strokeWidth="1.5" />
      <line x1="21.657" y1="10.343" x2="10.343" y2="21.657" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
};

export default BuddhistMarker;