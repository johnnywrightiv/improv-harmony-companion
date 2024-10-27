export type MetronomeStatus = 'playing' | 'paused' | 'stopped';
export type ToneSet = 'click' | 'clave' | 'blip' | 'beep';

export class MetronomeService {
	private audioContext: AudioContext | null;
	private gainNode: GainNode | null;
	private schedulerTimer: number | null;
	private nextNoteTime: number;
	private currentBeat: number;
	private tempo: number;
	private beatsPerBar: number;
	private status: MetronomeStatus;
	private isEnabled: boolean;
	private volume: number;
	private toneSet: ToneSet;
	private strongBeatBuffers: Record<ToneSet, AudioBuffer | null>;
	private weakBeatBuffers: Record<ToneSet, AudioBuffer | null>;
	private isCompoundTime: boolean;
	private accentPattern: number[];
	private lookAhead: number = 25.0;
	private scheduleAheadTime: number = 0.1;

	constructor() {
		this.audioContext = null;
		this.gainNode = null;
		this.schedulerTimer = null;
		this.nextNoteTime = 0.0;
		this.currentBeat = 0;
		this.tempo = 120;
		this.beatsPerBar = 4;
		this.status = 'stopped';
		this.isEnabled = false;
		this.volume = 0.5;
		this.toneSet = 'click';
		this.strongBeatBuffers = {
			click: null,
			clave: null,
			blip: null,
			beep: null,
		};
		this.weakBeatBuffers = {
			click: null,
			clave: null,
			blip: null,
			beep: null,
		};
		this.isCompoundTime = false;
		this.accentPattern = [1]; // 1 for accent, 0 for no accent
	}

	private async loadAudioFile(url: string): Promise<AudioBuffer> {
		if (!this.audioContext) throw new Error('AudioContext not initialized');

		const response = await fetch(url);
		const arrayBuffer = await response.arrayBuffer();
		return await this.audioContext.decodeAudioData(arrayBuffer);
	}

	private async loadToneSets() {
		const toneTypes: ToneSet[] = ['click', 'clave', 'blip', 'beep'];

		for (const tone of toneTypes) {
			try {
				this.strongBeatBuffers[tone] = await this.loadAudioFile(
					`/sounds/${tone}1.wav`
				);
				this.weakBeatBuffers[tone] = await this.loadAudioFile(
					`/sounds/${tone}2.wav`
				);
			} catch (error) {
				console.warn(
					`Failed to load ${tone} sounds, falling back to oscillator`,
					error
				);
			}
		}
	}

	private playSound(time: number, isStrongBeat: boolean) {
		if (!this.audioContext || !this.gainNode) return;

		const currentBuffer = isStrongBeat
			? this.strongBeatBuffers[this.toneSet]
			: this.weakBeatBuffers[this.toneSet];

		if (!currentBuffer) {
			this.createOscillator(time, isStrongBeat ? 1000 : 800);
			return;
		}

		const source = this.audioContext.createBufferSource();
		source.buffer = currentBuffer;
		source.connect(this.gainNode);
		source.start(time);
	}

	private createOscillator(
		time: number,
		frequency: number,
		duration: number = 0.05
	) {
		if (!this.audioContext || !this.gainNode) return;

		const osc = this.audioContext.createOscillator();
		osc.connect(this.gainNode);
		osc.frequency.setValueAtTime(frequency, time);
		osc.start(time);
		osc.stop(time + duration);
	}

	private getTrueTempoForSubdivision(): number {
		if (this.isCompoundTime) {
			// For compound time (e.g., 7/8), double the tempo to fit more beats
			// in the same space as simple time
			return this.tempo * 2;
		}
		return this.tempo;
	}

	private getEffectiveBeatsPerBar(): number {
		return this.beatsPerBar;
	}

	private nextNote() {
		const secondsPerBeat = 60.0 / this.getTrueTempoForSubdivision();
		this.nextNoteTime += secondsPerBeat;
		this.currentBeat = (this.currentBeat + 1) % this.getEffectiveBeatsPerBar();
	}

	private scheduleNote() {
		if (!this.audioContext) return;
		const isStrongBeat = this.accentPattern[this.currentBeat] === 1;
		this.playSound(this.nextNoteTime, isStrongBeat);
	}

	private scheduler() {
		if (!this.audioContext || this.status !== 'playing') return;

		while (
			this.nextNoteTime <
			this.audioContext.currentTime + this.scheduleAheadTime
		) {
			this.scheduleNote();
			this.nextNote();
		}

		this.schedulerTimer = window.setTimeout(
			() => this.scheduler(),
			this.lookAhead
		);
	}

	private getAccentPattern(numerator: number): number[] {
		switch (numerator) {
			case 6:
				return [1, 0, 0, 0, 0, 0]; // 6/8: (1+5)
			case 7:
				return [1, 0, 0, 1, 0, 0, 0]; // 7/8: (3+4)
			case 9:
				return [1, 0, 0, 1, 0, 0, 1, 0, 0]; // 9/8: (3+3+3)
			case 11:
				return [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0]; // 11/8: (3+3+5)
			case 13:
				return [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0]; // 13/8: (3+3+3+4)
			default:
				return Array(numerator).fill(0).fill(1, 0, 1); // Default: accent first beat only
		}
	}

	public async initialize() {
		this.audioContext = new AudioContext();
		this.gainNode = this.audioContext.createGain();
		this.gainNode.connect(this.audioContext.destination);
		this.setVolume(this.volume);
		await this.loadToneSets();
	}

	public setTimeSignature(timeSignature: string) {
		const [numerator, denominator] = timeSignature.split('/').map(Number);

		if (denominator === 8) {
			this.isCompoundTime = true;
			this.beatsPerBar = numerator;
			this.accentPattern = this.getAccentPattern(numerator);
		} else {
			this.isCompoundTime = false;
			this.beatsPerBar = numerator;
			this.accentPattern = Array(numerator).fill(0).fill(1, 0, 1); // Accent first beat only
		}
	}

	public setToneSet(toneSet: ToneSet) {
		this.toneSet = toneSet;
	}

	public setEnabled(enabled: boolean) {
		this.isEnabled = enabled;
		if (!enabled) {
			this.stop();
		}
	}

	public setTempo(newTempo: number) {
		this.tempo = Math.max(40, Math.min(208, newTempo));
	}

	public setVolume(newVolume: number) {
		this.volume = newVolume / 100;
		if (this.gainNode) {
			this.gainNode.gain.value = this.volume;
		}
	}

	public start() {
		if (!this.isEnabled || this.status === 'playing') return;

		if (this.audioContext?.state === 'suspended') {
			this.audioContext.resume();
		}

		this.status = 'playing';
		this.nextNoteTime = this.audioContext!.currentTime;
		this.scheduler();
	}

	public pause() {
		if (this.status !== 'playing') return;

		this.status = 'paused';
		if (this.schedulerTimer) {
			window.clearTimeout(this.schedulerTimer);
			this.schedulerTimer = null;
		}
	}

	public stop() {
		if (this.status === 'stopped') return;

		this.status = 'stopped';
		if (this.schedulerTimer) {
			window.clearTimeout(this.schedulerTimer);
			this.schedulerTimer = null;
		}
		this.currentBeat = 0;
	}

	public cleanup() {
		this.stop();
		if (this.audioContext) {
			this.audioContext.close();
			this.audioContext = null;
		}
	}
}

export const metronome = new MetronomeService();
