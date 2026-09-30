// Web Audio API Synthesizer for UI sound effects

class SoundManager {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop(frequency = 440, type: OscillatorType = 'sine') {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.8, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Ignore audio errors on non-supported browsers
    }
  }

  playSend() {
    this.playPop(520, 'sine');
  }

  playReceive() {
    this.playPop(380, 'triangle');
  }

  playError() {
    this.playPop(200, 'sawtooth');
  }
}

export const soundManager = new SoundManager();

export const speakText = (text: string) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  
  window.speechSynthesis.cancel(); // Stop any active speech
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = 1.05;
  
  // Pick an English voice if available
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find(v => v.lang.startsWith('en'));
  if (englishVoice) {
    utterance.voice = englishVoice;
  }
  
  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
