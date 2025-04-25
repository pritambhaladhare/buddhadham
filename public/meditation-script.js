// Meditation Sound Player Script
document.addEventListener('DOMContentLoaded', function() {
  // Create audio element
  const meditationAudio = new Audio('/meditation-sound.mp3');
  meditationAudio.loop = true;
  meditationAudio.volume = 0.4;
  meditationAudio.preload = 'auto';
  
  // Global variable to track if sound is playing
  window.isMeditationPlaying = false;
  
  // Function to toggle sound
  window.toggleMeditationSound = function() {
    if (window.isMeditationPlaying) {
      meditationAudio.pause();
      window.isMeditationPlaying = false;
      console.log('Meditation sound stopped');
      return false;
    } else {
      // Try to play with promise support
      try {
        const playPromise = meditationAudio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              window.isMeditationPlaying = true;
              console.log('Meditation sound started');
            })
            .catch(err => {
              console.error('Error playing sound:', err);
              window.isMeditationPlaying = false;
              
              // Try once more after a delay
              setTimeout(() => {
                meditationAudio.play()
                  .then(() => {
                    window.isMeditationPlaying = true;
                    console.log('Delayed play succeeded');
                  })
                  .catch(e => {
                    console.error('Second attempt failed:', e);
                    window.isMeditationPlaying = false;
                  });
              }, 200);
            });
        }
        return true;
      } catch(e) {
        console.error('General sound error:', e);
        return false;
      }
    }
  };
});