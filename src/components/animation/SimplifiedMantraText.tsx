import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SimplifiedMantraTextProps {
  text: string;
  color?: string;
  className?: string;
}

const SimplifiedMantraText = ({ 
  text = 'Buddham saranam gacchami, dhammam saranam gacchami, sangham saranam gacchami', 
  color = '#ea580c',
  className = ''
}: SimplifiedMantraTextProps) => {
  return (
    <div className={`flex justify-center items-center py-2 ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="text-center"
      >
        <span 
          className="font-medium text-center"
          style={{ color }}
        >
          {text}
        </span>
      </motion.div>
    </div>
  );
};

export default SimplifiedMantraText;