import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Howl } from 'howler';

interface MeditativeSoundToggleProps {
  className?: string;
}

const MeditativeSoundToggle = ({ className = '' }: MeditativeSoundToggleProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [howl, setHowl] = useState<Howl | null>(null);
  
  // Initialize the Howl instance on component mount
  useEffect(() => {
    // Use a simple meditation sound - direct URL to an mp3
    const sound = new Howl({
      src: ['https://assets.mixkit.co/active_storage/sfx/2533/2533.wav'],
      html5: true, // Use HTML5 Audio for best compatibility
      preload: true, // Preload the sound
      loop: true, // Loop the sound
      volume: 0.5, // Lower volume for better experience
      onplay: () => {
        console.log('Meditation sound started');
      },
      onstop: () => {
        console.log('Meditation sound stopped');
      },
      onloaderror: (id, error) => {
        console.error('Error loading sound:', error);
      },
      onplayerror: (id, error) => {
        console.error('Error playing sound:', error);
      }
    });

    setHowl(sound);

    // Cleanup function
    return () => {
      if (sound) {
        sound.stop();
        sound.unload();
      }
    };
  }, []);
  
  const toggleSound = () => {
    if (!howl) {
      console.log("Sound not available yet");
      return;
    }
    
    if (isPlaying) {
      howl.stop();
    } else {
      howl.play();
    }
    
    setIsPlaying(!isPlaying);
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