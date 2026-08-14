// Web Audio API Sound Engine & Speech Synthesizer for 6-year-olds

let audioCtx: AudioContext | null = null;
let bgmInterval: number | null = null;
let isSoundMuted = false;
let isBgmMuted = false;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const soundEngine = {
  setSoundMuted(muted: boolean) {
    isSoundMuted = muted;
  },

  setBgmMuted(muted: boolean) {
    isBgmMuted = muted;
    if (muted) {
      this.stopBgm();
    }
  },

  isMuted() {
    return isSoundMuted;
  },

  isBgmActive() {
    return !isBgmMuted && bgmInterval !== null;
  },

  // 1. Correct Hit: Rich, vibrant cheerful marimba/xylophone with sparkle chime (C5, E5, G5, C6, E6)
  playCorrect() {
    if (isSoundMuted) return;
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6

      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.05);

        gain.gain.setValueAtTime(0.001, now + index * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.35, now + index * 0.05 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.05 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + index * 0.05);
        osc.stop(now + index * 0.05 + 0.4);
      });

      // Extra bright sparkle shimmer
      const shimmer = ctx.createOscillator();
      const shimmerGain = ctx.createGain();
      shimmer.type = 'sine';
      shimmer.frequency.setValueAtTime(1567.98, now + 0.15); // G6
      shimmer.frequency.exponentialRampToValueAtTime(2093.00, now + 0.35); // C7
      shimmerGain.gain.setValueAtTime(0.001, now + 0.15);
      shimmerGain.gain.exponentialRampToValueAtTime(0.18, now + 0.2);
      shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      shimmer.connect(shimmerGain);
      shimmerGain.connect(ctx.destination);
      shimmer.start(now + 0.15);
      shimmer.stop(now + 0.45);
    } catch {
      // Audio context may be restricted before user interaction
    }
  },

  playHit() {
    this.playCorrect();
  },

  // 2. Wrong Hit: Soft comic "Boing / Ddiyong~" pitch dive
  playWrong() {
    if (isSoundMuted) return;
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';

      // Pitch glide downward for comical cartoon boing
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.32);
    } catch {
      // ignore
    }
  },

  playMiss() {
    this.playWrong();
  },

  // 3. Animal Pop Up (Gentle bubble pop / spring)
  playPop() {
    if (isSoundMuted) return;
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(560, now + 0.08);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch {
      // ignore
    }
  },

  // 4. Fever Time Fanfare!
  playFever() {
    if (isSoundMuted) return;
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      const freqs = [440, 554.37, 659.25, 880, 1108.73, 1318.51];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.25, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.45);
      });
    } catch {
      // ignore
    }
  },

  // 5. Button Tap Click
  playClick() {
    if (isSoundMuted) return;
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // ignore
    }
  },

  // 6. Level Up Fanfare
  playLevelUp() {
    if (isSoundMuted) return;
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      const scale = [523.25, 659.25, 783.99, 1046.5, 1318.51];

      scale.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.1);

        gain.gain.setValueAtTime(0.2, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.4);
      });
    } catch {
      // ignore
    }
  },

  // 7. Cheerful BGM loop using soft music synthesizer
  startBgm() {
    if (isBgmMuted || bgmInterval) return;
    try {
      const ctx = getAudioContext();
      const melody = [
        261.63, 329.63, 392.00, 523.25, 392.00, 329.63,
        293.66, 369.99, 440.00, 587.33, 440.00, 369.99,
        329.63, 392.00, 493.88, 659.25, 493.88, 392.00,
        392.00, 523.25, 659.25, 783.99, 523.25, 392.00
      ];
      let step = 0;

      bgmInterval = window.setInterval(() => {
        if (isBgmMuted) return;
        const now = ctx.currentTime;
        const freq = melody[step % melody.length];
        step++;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.3);
      }, 320);
    } catch {
      // ignore
    }
  },

  stopBgm() {
    if (bgmInterval !== null) {
      clearInterval(bgmInterval);
      bgmInterval = null;
    }
  },

  // 8. Korean Web Speech TTS voice output
  speak(text: string) {
    if (isSoundMuted || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.95; // slightly gentle pace for 6yo kids
      utterance.pitch = 1.25; // bright, cheerful tone
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore
    }
  }
};
