import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MeditativeSoundToggleProps {
  className?: string;
}

const MeditativeSoundToggle = ({ className = '' }: MeditativeSoundToggleProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Create audio element programmatically to avoid browser autoplay restrictions
  useEffect(() => {
    // Create the audio element
    const audioElement = new Audio();
    audioElement.src = '/meditation-sound.mp3'; // Use the Tibetan singing bowl sound
    audioElement.loop = true;
    audioElement.volume = 0.4;
    audioElement.preload = 'auto';
    
    // Store reference
    audioRef.current = audioElement;
    
    // Clean up
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);
  
  const toggleSound = () => {
    if (!audioRef.current) {
      console.log("Audio element not available");
      return;
    }
    
    try {
      if (isPlaying) {
        audioRef.current.pause();
        console.log("Meditation sound stopped");
      } else {
        // Play with user interaction (should work in all browsers)
        try {
          // First attempt - as direct play
          const playPromise = audioRef.current.play();
          
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log("Meditation sound started");
              })
              .catch(err => {
                console.error("First play attempt failed:", err);
                
                // Second attempt - load then play
                audioRef.current?.load();
                
                setTimeout(() => {
                  try {
                    const secondAttempt = audioRef.current?.play();
                    if (secondAttempt) {
                      secondAttempt
                        .then(() => console.log("Second attempt succeeded"))
                        .catch(e => console.error("Second attempt failed:", e));
                    }
                  } catch (e) {
                    console.error("Error in second attempt:", e);
                  }
                }, 100);
              });
          }
        } catch (e) {
          console.error("General play error:", e);
        }
      }
      
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Error toggling sound:", error);
    }
  };
  
  return (
    <motion.button
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center ${expanded ? 'p-4' : 'p-3'} rounded-full ${isPlaying ? 'bg-orange-50/90' : 'bg-white/80'} backdrop-blur-md shadow-lg transition-all duration-300 ${className} ${isPlaying ? 'border-2 border-orange-300 breathing-border' : ''}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleSound}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      aria-label={isPlaying ? "Mute meditation sounds" : "Play meditation sounds"}
    >
      <div className="relative w-10 h-10 flex items-center justify-center">
        {isPlaying ? (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-orange-100/50"
              animate={{
                scale: [1, 1.5, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-orange-200/30"
              animate={{
                scale: [1.2, 1.8, 1.2],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            <i className="bx bx-volume-full text-2xl text-orange-600"></i>
          </>
        ) : (
          <i className="bx bx-volume-mute text-2xl text-gray-700"></i>
        )}
      </div>
      {expanded && (
        <motion.span 
          className={`ml-2 text-sm font-medium transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-70'}`}
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto' }}
          exit={{ opacity: 0, width: 0 }}
        >
          {isPlaying ? 'Meditation Sound Playing' : 'Enable Meditation Sound'}
        </motion.span>
      )}
    </motion.button>
  );
};

export default MeditativeSoundToggle;