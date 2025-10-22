import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const buttonVariants = {
  idle: { scale: 1 },
  hover: { 
    scale: 1.05,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
  tap: { scale: 0.98 }
};

const AnimatedButton = ({ 
  children, 
  className,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false
}: AnimatedButtonProps) => {
  // Button variants
  const variantStyles = {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white shadow-md',
    secondary: 'bg-gray-800 hover:bg-gray-900 text-white shadow-md', 
    outline: 'bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-50',
    ghost: 'bg-transparent hover:bg-orange-50 text-orange-500'
  };
  
  // Button sizes
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      className={cn(
        'font-bold rounded-lg transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        className
      )}
      variants={buttonVariants}
      initial="idle"
      whileHover={disabled ? undefined : "hover"}
      whileTap={disabled ? undefined : "tap"}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;