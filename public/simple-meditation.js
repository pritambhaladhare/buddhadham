// Very simple meditation sound script
window.MeditationSound = function() {
  this.isPlaying = false;
  
  this.start = function() {
    console.log("Meditation sound started");
    this.isPlaying = true;
  };
  
  this.stop = function() {
    console.log("Meditation sound stopped");
    this.isPlaying = false;
  };
};

console.log("Simple meditation sound script loaded");