/**
 * Simple Meditation Sound Player
 * This script creates a simple audio player that plays meditation sounds
 */

window.MeditationSound = function() {
  // Private variables
  let audioElement = null;
  let isPlaying = false;
  
  // Initialize the audio element
  const init = () => {
    try {
      // Create an audio element if it doesn't exist
      if (!audioElement) {
        audioElement = new Audio('/meditation-sounds.mp3');
        audioElement.loop = true;
        
        // Set volume to be gentle
        audioElement.volume = 0.5;
        
        console.log('Meditation sound audio element created');
      }
    } catch (error) {
      console.error('Error initializing meditation sound:', error);
    }
  };
  
  // Initialize on creation
  init();
  
  // Public API
  return {
    start: function() {
      try {
        if (audioElement && !isPlaying) {
          audioElement.play()
            .then(() => {
              isPlaying = true;
              console.log('Meditation sound started');
            })
            .catch(error => {
              console.error('Error playing meditation sound:', error);
            });
        }
      } catch (error) {
        console.error('Error in start():', error);
      }
    },
    
    stop: function() {
      try {
        if (audioElement && isPlaying) {
          audioElement.pause();
          isPlaying = false;
          console.log('Meditation sound stopped');
        }
      } catch (error) {
        console.error('Error in stop():', error);
      }
    },
    
    isPlaying: function() {
      return isPlaying;
    }
  };
};

console.log('Meditation sound script loaded');