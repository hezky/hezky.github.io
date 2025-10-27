// sounds.js
// Audio manager for Ngöndro Counter using Web Audio API
// Does NOT include external audio files - uses synthetic sounds

class SoundManager {
  constructor() {
    // Create audio context (lazy initialization)
    this.audioContext = null;
    this.soundEnabled = true;

    // Load sound preference from localStorage
    this.loadSoundPreference();
  }

  // Initialize audio context on first user interaction
  initAudioContext() {
    if (!this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      } catch (error) {
        console.error('Web Audio API not supported:', error);
        this.soundEnabled = false;
      }
    }
  }

  // Play click sound (short beep)
  playClick() {
    if (!this.soundEnabled) return;

    this.initAudioContext();
    if (!this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Settings for click sound
      oscillator.frequency.value = 800; // Hz
      oscillator.type = 'sine';

      // Volume envelope (quick fade out)
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);

      // Play for 50ms
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.05);
    } catch (error) {
      console.error('Error playing click sound:', error);
    }
  }

  // Play milestone sound (pleasant chime)
  playMilestone() {
    if (!this.soundEnabled) return;

    this.initAudioContext();
    if (!this.audioContext) return;

    try {
      // Create three oscillators for a chord
      const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5 (C major chord)
      const startTime = this.audioContext.currentTime;

      frequencies.forEach((freq, index) => {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = freq;
        oscillator.type = 'sine';

        // Volume envelope with slight delay for each note
        const noteStart = startTime + (index * 0.05);
        gainNode.gain.setValueAtTime(0, noteStart);
        gainNode.gain.linearRampToValueAtTime(0.15, noteStart + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, noteStart + 0.6);

        oscillator.start(noteStart);
        oscillator.stop(noteStart + 0.6);
      });
    } catch (error) {
      console.error('Error playing milestone sound:', error);
    }
  }

  // Play completion sound (triumphant)
  playCompletion() {
    if (!this.soundEnabled) return;

    this.initAudioContext();
    if (!this.audioContext) return;

    try {
      // Ascending notes
      const notes = [
        { freq: 523.25, time: 0 },     // C5
        { freq: 659.25, time: 0.15 },  // E5
        { freq: 783.99, time: 0.3 },   // G5
        { freq: 1046.50, time: 0.45 }  // C6
      ];

      notes.forEach((note) => {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = note.freq;
        oscillator.type = 'sine';

        const startTime = this.audioContext.currentTime + note.time;
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

        oscillator.start(startTime);
        oscillator.stop(startTime + 0.4);
      });
    } catch (error) {
      console.error('Error playing completion sound:', error);
    }
  }

  // Toggle sound on/off
  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    this.saveSoundPreference();
    return this.soundEnabled;
  }

  // Save preference to localStorage
  saveSoundPreference() {
    try {
      localStorage.setItem('ngondro-sound-enabled', JSON.stringify(this.soundEnabled));
    } catch (error) {
      console.error('Failed to save sound preference:', error);
    }
  }

  // Load preference from localStorage
  loadSoundPreference() {
    try {
      const saved = localStorage.getItem('ngondro-sound-enabled');
      if (saved !== null) {
        this.soundEnabled = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load sound preference:', error);
    }
  }

  // Check if sound is enabled
  isSoundEnabled() {
    return this.soundEnabled;
  }
}

// Export sound manager instance
const soundManager = new SoundManager();
