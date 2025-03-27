import React from 'react';

interface PeepalLeafProps {
  className?: string;
  color?: string;
  size?: number;
}

const PeepalLeaf: React.FC<PeepalLeafProps> = ({ 
  className = "", 
  color = "currentColor", 
  size = 24 
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      width={size} 
      height={size} 
      className={className}
    >
      {/* Main leaf shape with heart shape and pointed tip */}
      <path 
        d="M50,5 
           C50,5 20,15 20,50 
           C20,75 35,90 50,95 
           C65,90 80,75 80,50 
           C80,15 50,5 50,5 Z" 
        fill={color}
      />
      
      {/* Main central vein */}
      <path 
        d="M50,5 L50,95" 
        stroke="#ffffff" 
        strokeWidth="1.5" 
        fill="none" 
        opacity="0.7"
      />
      
      {/* Side veins - left side */}
      <path 
        d="M50,20 L30,30
           M50,35 L25,45
           M50,50 L25,60
           M50,65 L30,75
           M50,80 L35,85" 
        stroke="#ffffff" 
        strokeWidth="0.8" 
        strokeLinecap="round"
        fill="none" 
        opacity="0.7"
      />
      
      {/* Side veins - right side */}
      <path 
        d="M50,20 L70,30
           M50,35 L75,45
           M50,50 L75,60
           M50,65 L70,75
           M50,80 L65,85" 
        stroke="#ffffff" 
        strokeWidth="0.8" 
        strokeLinecap="round"
        fill="none" 
        opacity="0.7"
      />
      
      {/* Leaf stem */}
      <path 
        d="M50,95 L50,98" 
        stroke={color} 
        strokeWidth="2" 
        fill="none"
      />
      
      {/* Pointed tip at top */}
      <path 
        d="M50,5 Q50,2 53,1 T50,5" 
        fill={color}
      />
    </svg>
  );
};

export default PeepalLeaf;