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
			// For any X/8 time, double the tempo to fit X beats in the same space
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
		// For all time signatures, only accent the first beat
		const isStrongBeat = this.currentBeat === 0;
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
			// Any X/8 time signature gets X beats with first beat accented
			this.isCompoundTime = true;
			this.beatsPerBar = numerator;
		} else {
			this.isCompoundTime = false;
			this.beatsPerBar = numerator;
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
