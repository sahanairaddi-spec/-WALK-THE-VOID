/**
 * Atmospheric Horror Audio Engine using Web Audio API
 * Generates continuous procedural soundscapes and interactive horror audio cues.
 */

class HorrorAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private isDronePlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime, 0.05);
    }
    if (!this.isMuted && !this.isDronePlaying) {
      this.startAmbientSoundscape();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx && !this.isMuted) {
      const clamped = Math.max(0, Math.min(1, vol));
      this.masterGain.gain.setTargetAtTime(clamped, this.ctx.currentTime, 0.05);
    }
  }

  public startAmbientSoundscape() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isDronePlaying) return;

      const t = this.ctx.currentTime;

      // 1. Low sub-drone (binaural dark frequency: 54Hz and 58Hz)
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.001, t);
      this.droneGain.gain.linearRampToValueAtTime(0.2, t + 4);

      // Low pass filter for dark, muddy rumble
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, t);

      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = 'sawtooth';
      this.droneOsc1.frequency.setValueAtTime(54, t);

      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'sine';
      this.droneOsc2.frequency.setValueAtTime(58.5, t);

      // Slow LFO to pulse the drone
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.12, t); // Slow 8-second breathing cycle
      lfoGain.gain.setValueAtTime(0.08, t);
      lfo.connect(lfoGain);
      lfoGain.connect(this.droneGain.gain);
      lfo.start();

      this.droneOsc1.connect(filter);
      this.droneOsc2.connect(filter);
      filter.connect(this.droneGain);
      this.droneGain.connect(this.masterGain);

      this.droneOsc1.start();
      this.droneOsc2.start();

      // 2. Procedural wind & crackle loop
      this.startWindAtmosphere();

      this.isDronePlaying = true;
    } catch {
      // Audio autoplay policy handled safely
    }
  }

  private startWindAtmosphere() {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate vinyl crackle & wind noise
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brown noise integration for heavy wind gust
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.5;
      // Occasional vinyl pops
      if (Math.random() < 0.001) {
        data[i] += (Math.random() - 0.5) * 1.5;
      }
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(260, this.ctx.currentTime);
    bandpass.Q.setValueAtTime(2.5, this.ctx.currentTime);

    this.noiseGain = this.ctx.createGain();
    this.noiseGain.gain.setValueAtTime(0.06, this.ctx.currentTime);

    noiseSource.connect(bandpass);
    bandpass.connect(this.noiseGain);
    this.noiseGain.connect(this.masterGain);

    noiseSource.start();
    this.noiseNode = noiseSource;
  }

  // Interactive Sound Cues

  public playClick() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(120, t + 0.04);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.045);
    } catch {
      // Ignored
    }
  }

  public playPaperRustle() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.15);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.05));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1200, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.12, t);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      noise.start(t);
    } catch {
      // Ignored
    }
  }

  public playClueDiscovered() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      const t = this.ctx.currentTime;

      // Dark low resonant bell chime (C2 / G2 minor harmonic)
      const freqs = [130.81, 155.56, 196.00];
      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.15 / (idx + 1), t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.8);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 3.0);
      });
    } catch {
      // Ignored
    }
  }

  public playUVToggle(active: boolean) {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      if (active) {
        osc.frequency.setValueAtTime(220, t);
        osc.frequency.exponentialRampToValueAtTime(1800, t + 0.18);
      } else {
        osc.frequency.setValueAtTime(1200, t);
        osc.frequency.exponentialRampToValueAtTime(150, t + 0.15);
      }
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.22);
    } catch {
      // Ignored
    }
  }

  public playGhostWhisper() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.linearRampToValueAtTime(290, t + 0.6);
      osc.frequency.linearRampToValueAtTime(310, t + 1.2);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(650, t);
      filter.Q.setValueAtTime(6, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.14, t + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 1.5);
    } catch {
      // Ignored
    }
  }
}

export const soundEngine = new HorrorAudioEngine();
