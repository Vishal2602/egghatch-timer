/**
 * 8-bit sound effects using Web Audio API
 * Creates authentic chiptune sounds for the EggHatch Timer
 */

// Singleton AudioContext - lazy initialization to avoid autoplay issues
let audioContext = null;
let soundEnabled = true;

/**
 * Get or create the AudioContext (lazy init for browser autoplay policies)
 */
function getAudioContext() {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported:', e);
      return null;
    }
  }
  
  // Resume if suspended (browser autoplay policy)
  if (audioContext.state === 'suspended') {
    audioContext.resume().catch(() => {});
  }
  
  return audioContext;
}

/**
 * Enable or disable all sounds
 */
export function setSoundEnabled(enabled) {
  soundEnabled = enabled;
}

/**
 * Get current sound enabled state
 */
export function isSoundEnabled() {
  return soundEnabled;
}

/**
 * Play a simple square wave beep (authentic 8-bit sound)
 * @param {number} frequency - Frequency in Hz
 * @param {number} duration - Duration in seconds
 * @param {number} volume - Volume 0-1
 */
function playTone(frequency, duration, volume = 0.3) {
  if (!soundEnabled) return;
  
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Square wave for that authentic chiptune sound
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    // Envelope for cleaner sound (avoid clicks)
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn('Sound playback failed:', e);
  }
}

/**
 * Play button press beep - short, satisfying click
 */
export function playBeep() {
  playTone(880, 0.08, 0.2); // A5, short duration
}

/**
 * Play tick sound - subtle countdown pulse
 */
export function playTick() {
  playTone(440, 0.05, 0.1); // A4, very short
}

/**
 * Play urgent tick - for low time remaining
 */
export function playUrgentTick() {
  playTone(660, 0.08, 0.15); // E5
}

/**
 * Play critical tick - for very low time (last 5 seconds)
 */
export function playCriticalTick() {
  playTone(880, 0.1, 0.25); // A5, louder
}

/**
 * Play egg wobble sound - gentle warble
 */
export function playWobble() {
  if (!soundEnabled) return;
  
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(200, ctx.currentTime);
    oscillator.frequency.linearRampToValueAtTime(250, ctx.currentTime + 0.05);
    oscillator.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.15);
  } catch (e) {
    console.warn('Wobble sound failed:', e);
  }
}

/**
 * Play triumphant hatch sound - victory fanfare!
 */
export function playHatch() {
  if (!soundEnabled) return;
  
  const ctx = getAudioContext();
  if (!ctx) return;

  // Play a simple ascending arpeggio (like Pokemon level-up sound)
  const notes = [
    { freq: 523.25, start: 0 },      // C5
    { freq: 659.25, start: 0.1 },    // E5
    { freq: 783.99, start: 0.2 },    // G5
    { freq: 1046.50, start: 0.3 },   // C6
  ];

  notes.forEach(({ freq, start }) => {
    setTimeout(() => {
      playTone(freq, 0.15, 0.25);
    }, start * 1000);
  });
  
  // Final chord
  setTimeout(() => {
    playTone(1046.50, 0.4, 0.2);
  }, 450);
}

/**
 * Play pause sound - descending tone
 */
export function playPause() {
  if (!soundEnabled) return;
  
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(440, ctx.currentTime);
    oscillator.frequency.linearRampToValueAtTime(220, ctx.currentTime + 0.15);
    
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.2);
  } catch (e) {
    console.warn('Pause sound failed:', e);
  }
}

/**
 * Play start sound - ascending tone
 */
export function playStart() {
  if (!soundEnabled) return;
  
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(330, ctx.currentTime);
    oscillator.frequency.linearRampToValueAtTime(660, ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.15);
  } catch (e) {
    console.warn('Start sound failed:', e);
  }
}

/**
 * Play reset sound - distinctive reset beep
 */
export function playReset() {
  playTone(330, 0.05, 0.15);
  setTimeout(() => playTone(220, 0.1, 0.15), 60);
}

/**
 * Play preset select sound
 */
export function playSelect() {
  playTone(660, 0.05, 0.15);
}

// Initialize audio context on first user interaction (for autoplay policy)
export function initAudio() {
  getAudioContext();
}

export default {
  playBeep,
  playTick,
  playUrgentTick,
  playCriticalTick,
  playWobble,
  playHatch,
  playPause,
  playStart,
  playReset,
  playSelect,
  setSoundEnabled,
  isSoundEnabled,
  initAudio
};
