// This script creates a meditation sound using the Web Audio API
// It can be used as a fallback when the MP3 file isn't available

class MeditationSound {
  constructor() {
    this.isPlaying = false;
    this.audioContext = null;
    this.oscillators = [];
    this.masterGain = null;
  }

  initialize() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = 0.3;
      this.masterGain.connect(this.audioContext.destination);
    }
  }

  start() {
    if (this.isPlaying) return;
    
    this.initialize();
    this.isPlaying = true;
    
    // Base frequency (meditation resonance - 136.1 Hz)
    const baseFreq = 136.1;
    
    // Create a beautiful chord with harmonics
    this.createOscillator(baseFreq, 'sine', 0.5);
    this.createOscillator(baseFreq * 1.5, 'sine', 0.2);
    this.createOscillator(baseFreq * 2, 'sine', 0.1);
    
    // Add gentle pulsing effect
    const pulsingOsc = this.audioContext.createOscillator();
    pulsingOsc.type = 'sine';
    pulsingOsc.frequency.value = 0.1; // Very slow pulsing
    
    const pulsingGain = this.audioContext.createGain();
    pulsingGain.gain.value = 0.1;
    
    pulsingOsc.connect(pulsingGain);
    pulsingGain.connect(this.masterGain.gain);
    
    pulsingOsc.start();
    this.oscillators.push(pulsingOsc);
    
    // Create gentle noise background
    this.createNoiseLayer(0.05);
    
    // Schedule occasional bell sounds
    this.bellInterval = setInterval(() => {
      if (this.isPlaying) {
        this.createBellSound();
      }
    }, 8000);
  }
  
  createOscillator(freq, type, gain) {
    const osc = this.audioContext.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    
    const oscGain = this.audioContext.createGain();
    oscGain.gain.value = 0;
    
    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    
    // Gentle fade in
    oscGain.gain.setValueAtTime(0, this.audioContext.currentTime);
    oscGain.gain.linearRampToValueAtTime(gain, this.audioContext.currentTime + 2);
    
    osc.start();
    this.oscillators.push(osc);
    return osc;
  }
  
  createNoiseLayer(gain) {
    const bufferSize = 2 * this.audioContext.sampleRate;
    const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.audioContext.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    
    // Create filters for white noise to make it sound like gentle wind/water
    const lowpass = this.audioContext.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 400;
    lowpass.Q.value = 0.7;
    
    const highpass = this.audioContext.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 100;
    
    const noiseGain = this.audioContext.createGain();
    noiseGain.gain.value = gain;
    
    noise.connect(highpass);
    highpass.connect(lowpass);
    lowpass.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    
    noise.start();
    this.oscillators.push(noise);
  }
  
  createBellSound() {
    // Random bell frequency based on pentatonic scale
    const pentatonic = [1, 1.2, 1.5, 1.8, 2];
    const baseFreq = 136.1;
    const randomNote = pentatonic[Math.floor(Math.random() * pentatonic.length)];
    const bellFreq = baseFreq * randomNote * 2; // Higher octave for bell
    
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
  }
  
  stop() {
    if (!this.isPlaying) return;
    
    this.isPlaying = false;
    
    // Clear bell interval
    if (this.bellInterval) {
      clearInterval(this.bellInterval);
      this.bellInterval = null;
    }
    
    // Fade out all oscillators
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
        // Ignore any errors during stop
      }
    });
    
    this.oscillators = [];
    
    // Fade out master gain
    this.masterGain.gain.exponentialRampToValueAtTime(0.001, fadeOutTime);
  }
}

// Export the class for use
window.MeditationSound = MeditationSound;