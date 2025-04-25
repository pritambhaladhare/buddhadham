// Simple meditation sound generator
(function() {
  // Create the MeditationSound constructor in the global scope
  window.MeditationSound = function() {
    this.isPlaying = false;
    this.audioContext = null;
    this.oscillators = [];
    this.masterGain = null;
    this.bellInterval = null;
    
    // Initialize audio context
    this.initialize = function() {
      if (!this.audioContext) {
        try {
          this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
          this.masterGain = this.audioContext.createGain();
          this.masterGain.gain.value = 0.3;
          this.masterGain.connect(this.audioContext.destination);
          console.log("Audio context initialized successfully");
        } catch (e) {
          console.error("Failed to initialize audio context:", e);
        }
      }
    };
    
    // Start sound
    this.start = function() {
      if (this.isPlaying) return;
      
      try {
        this.initialize();
        
        if (!this.audioContext) {
          console.error("Cannot start meditation sound - no audio context");
          return;
        }
        
        this.isPlaying = true;
        console.log("Starting meditation sound");
        
        // Base frequency
        const baseFreq = 136.1;
        
        // Create base tones
        this._createOscillator(baseFreq, 'sine', 0.5);
        this._createOscillator(baseFreq * 1.5, 'sine', 0.2);
        this._createOscillator(baseFreq * 2, 'sine', 0.1);
        
        // Schedule bell sounds
        this.bellInterval = setInterval(() => {
          if (this.isPlaying) {
            this._createBellSound();
          }
        }, 8000);
        
        console.log("Meditation sound started successfully");
      } catch (e) {
        console.error("Error starting meditation sound:", e);
      }
    };
    
    // Create an oscillator
    this._createOscillator = function(freq, type, gain) {
      try {
        const osc = this.audioContext.createOscillator();
        osc.type = type;
        osc.frequency.value = freq;
        
        const oscGain = this.audioContext.createGain();
        oscGain.gain.value = 0;
        
        osc.connect(oscGain);
        oscGain.connect(this.masterGain);
        
        // Fade in
        oscGain.gain.setValueAtTime(0, this.audioContext.currentTime);
        oscGain.gain.linearRampToValueAtTime(gain, this.audioContext.currentTime + 2);
        
        osc.start();
        
        // Store reference and gain node for later cleanup
        osc.gainNode = oscGain;
        this.oscillators.push(osc);
        
        return osc;
      } catch (e) {
        console.error("Error creating oscillator:", e);
        return null;
      }
    };
    
    // Create bell sound
    this._createBellSound = function() {
      try {
        // Random bell frequencies
        const pentatonic = [1, 1.2, 1.5, 1.8, 2];
        const baseFreq = 136.1;
        const randomNote = pentatonic[Math.floor(Math.random() * pentatonic.length)];
        const bellFreq = baseFreq * randomNote * 2;
        
        const bell = this.audioContext.createOscillator();
        bell.type = 'sine';
        bell.frequency.value = bellFreq;
        
        const bellGain = this.audioContext.createGain();
        bellGain.gain.value = 0;
        
        // Bell envelope
        bellGain.gain.setValueAtTime(0, this.audioContext.currentTime);
        bellGain.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
        bellGain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 5);
        
        bell.connect(bellGain);
        bellGain.connect(this.masterGain);
        
        bell.start();
        bell.stop(this.audioContext.currentTime + 5);
      } catch (e) {
        console.error("Error creating bell sound:", e);
      }
    };
    
    // Stop all sounds
    this.stop = function() {
      if (!this.isPlaying) return;
      
      try {
        console.log("Stopping meditation sound");
        this.isPlaying = false;
        
        // Clear bell interval
        if (this.bellInterval) {
          clearInterval(this.bellInterval);
          this.bellInterval = null;
        }
        
        // Fade out and stop oscillators
        const fadeOutTime = this.audioContext.currentTime + 1;
        
        this.oscillators.forEach(osc => {
          try {
            if (osc.gainNode) {
              osc.gainNode.gain.exponentialRampToValueAtTime(0.001, fadeOutTime);
            }
            
            setTimeout(() => {
              try {
                osc.stop();
              } catch (e) {
                // Ignore stop errors
              }
            }, 1000);
          } catch (e) {
            // Ignore errors
          }
        });
        
        this.oscillators = [];
        
        // Fade master gain
        this.masterGain.gain.exponentialRampToValueAtTime(0.001, fadeOutTime);
        
        console.log("Meditation sound stopped successfully");
      } catch (e) {
        console.error("Error stopping meditation sound:", e);
      }
    };
  };
  
  console.log("MeditationSound is ready");
})();