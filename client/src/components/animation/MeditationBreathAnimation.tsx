import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MeditationBreathAnimationProps {
  size?: number;
  color?: string;
  activeColor?: string;
  cycleTime?: number; // in seconds
  autoPlay?: boolean;
  className?: string;
  withText?: boolean;
}

const MeditationBreathAnimation = ({
  size = 200,
  color = '#f97316',
  activeColor = '#ea580c', 
  cycleTime = 8,
  autoPlay = true,
  className = '',
  withText = false
}: MeditationBreathAnimationProps) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest' | 'inactive'>('inactive');
  const [isActive, setIsActive] = useState(autoPlay);
  const [secondsLeft, setSecondsLeft] = useState(0);
  
  const inhaleDuration = Math.floor(cycleTime * 0.4); // 40% of cycle time
  const holdDuration = Math.floor(cycleTime * 0.1); // 10% of cycle time
  const exhaleDuration = Math.floor(cycleTime * 0.4); // 40% of cycle time
  const restDuration = cycleTime - inhaleDuration - holdDuration - exhaleDuration; // Remaining time
  
  useEffect(() => {
    if (!isActive) {
      setPhase('inactive');
      return;
    }
    
    let timer: NodeJS.Timeout;
    
    const startCycle = () => {
      // Inhale
      setPhase('inhale');
      setSecondsLeft(inhaleDuration);
      
      timer = setTimeout(() => {
        // Hold
        setPhase('hold');
        setSecondsLeft(holdDuration);
        
        timer = setTimeout(() => {
          // Exhale
          setPhase('exhale');
          setSecondsLeft(exhaleDuration);
          
          timer = setTimeout(() => {
            // Rest
            setPhase('rest');
            setSecondsLeft(restDuration);
            
            timer = setTimeout(() => {
              // Start over
              startCycle();
            }, restDuration * 1000);
          }, exhaleDuration * 1000);
        }, holdDuration * 1000);
      }, inhaleDuration * 1000);
    };
    
    startCycle();
    
    return () => {
      clearTimeout(timer);
    };
  }, [isActive, inhaleDuration, holdDuration, exhaleDuration, restDuration]);
  
  useEffect(() => {
    if (isActive && secondsLeft > 0) {
      const timer = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isActive, secondsLeft]);
  
  const getVariant = () => {
    switch(phase) {
      case 'inhale':
        return {
          scale: 1.5,
          opacity: 1,
          transition: { duration: inhaleDuration, ease: "easeInOut" }
        };
      case 'hold':
        return {
          scale: 1.5,
          opacity: 1,
          transition: { duration: holdDuration, ease: "easeInOut" }
        };
      case 'exhale':
        return {
          scale: 1,
          opacity: 0.7,
          transition: { duration: exhaleDuration, ease: "easeInOut" }
        };
      case 'rest':
        return {
          scale: 1,
          opacity: 0.7,
          transition: { duration: restDuration, ease: "easeInOut" }
        };
      default:
        return {
          scale: 1,
          opacity: 0.7
        };
    }
  };
  
  const getInstructions = () => {
    switch(phase) {
      case 'inhale':
        return "Inhale";
      case 'hold':
        return "Hold";
      case 'exhale':
        return "Exhale";
      case 'rest':
        return "Rest";
      default:
        return "Start";
    }
  };
  
  const getTextColor = () => {
    if (phase === 'inactive') return color;
    return activeColor;
  };
  
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background Circle */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-orange-50"
          animate={{
            boxShadow: phase !== 'inactive' 
              ? [
                  `0px 0px ${size * 0.1}px rgba(249, 115, 22, 0.2)`,
                  `0px 0px ${size * 0.15}px rgba(249, 115, 22, 0.3)`,
                  `0px 0px ${size * 0.1}px rgba(249, 115, 22, 0.2)`
                ]
              : `0px 0px ${size * 0.05}px rgba(249, 115, 22, 0.1)`
          }}
          transition={{
            duration: cycleTime,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Breathing Circle */}
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ 
            backgroundColor: phase === 'inactive' ? color : activeColor,
            width: size * 0.5,
            height: size * 0.5
          }}
          animate={getVariant()}
          onClick={() => setIsActive(!isActive)}
        />
        
        {/* Lotus Center */}
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white flex items-center justify-center"
          style={{ width: size * 0.25, height: size * 0.25 }}
        >
          <i className='bx bxs-lotus text-2xl'></i>
        </motion.div>
      </div>
      
      {withText && (
        <div className="mt-4 text-center">
          <h3 
            className="text-xl font-medium mb-2"
            style={{ color: getTextColor() }}
          >
            {getInstructions()}
          </h3>
          {isActive && phase !== 'inactive' && (
            <p className="text-gray-600">{secondsLeft}s</p>
          )}
          <button 
            className={`mt-4 px-4 py-2 rounded-full border ${isActive ? 'border-orange-500 text-orange-500' : 'border-gray-300 text-gray-500'} transition-colors duration-300`}
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MeditationBreathAnimation;