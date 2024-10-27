import {
	ChordAudioService,
	chordAudio,
} from '@/lib/services/chord-audio-service';

export type MetronomeStatus = 'playing' | 'paused' | 'stopped';
export type ToneSet = 'click' | 'clave' | 'blip' | 'beep';

export class MetronomeService {
	private audioContext: AudioContext | null = null;
	private gainNode: GainNode | null = null;
	private schedulerTimer: number | null = null;
	private nextNoteTime: number = 0.0;
	private currentBeat: number = 0;
	private tempo: number = 120;
	private beatsPerBar: number = 4;
	private status: MetronomeStatus = 'stopped';
	private isEnabled: boolean = false;
	private volume: number = 0.5;
	private toneSet: ToneSet = 'click';
	private strongBeatBuffers: Record<ToneSet, AudioBuffer | null> = {
		click: null,
		clave: null,
		blip: null,
		beep: null,
	};
	private weakBeatBuffers: Record<ToneSet, AudioBuffer | null> = {
		click: null,
		clave: null,
		blip: null,
		beep: null,
	};
	private isCompoundTime: boolean = false;
	private readonly lookAhead: number = 25.0;
	private readonly scheduleAheadTime: number = 0.1;

	// Removed constructor as it's not necessary with property initializers

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
		return this.isCompoundTime ? this.tempo * 2 : this.tempo;
	}

	private getEffectiveBeatsPerBar(): number {
		return this.beatsPerBar;
	}

	private nextNote() {
		const secondsPerBeat = 60.0 / this.getTrueTempoForSubdivision();
		this.nextNoteTime += secondsPerBeat;
		this.currentBeat = (this.currentBeat + 1) % this.getEffectiveBeatsPerBar();
	}

	protected tickCallback?: () => void;
	private readonly visualDelay: number = 20; // 20ms delay for visual feedback

	public setTickCallback(callback: () => void) {
		this.tickCallback = callback;
	}

	private nextNote() {
		if (this.tickCallback) {
			// Trigger visual feedback for the current beat
			this.tickCallback();
		}

		const secondsPerBeat = 60.0 / this.getTrueTempoForSubdivision();
		this.nextNoteTime += secondsPerBeat;
		this.currentBeat = (this.currentBeat + 1) % this.getEffectiveBeatsPerBar();
	}

	private scheduleNote() {
		if (!this.audioContext) return;
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
		this.setVolume(this.volume * 100);
		await this.loadToneSets();
	}

	public setTimeSignature(timeSignature: string) {
		const [numerator, denominator] = timeSignature.split('/').map(Number);

		this.isCompoundTime = denominator === 8;
		this.beatsPerBar = numerator;
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
		this.volume = Math.max(0, Math.min(100, newVolume)) / 100;
		if (this.gainNode) {
			this.gainNode.gain.setValueAtTime(
				this.volume,
				this.audioContext?.currentTime || 0
			);
		}
	}

	public start() {
		if (!this.isEnabled || this.status === 'playing' || !this.audioContext)
			return;

		if (this.audioContext.state === 'suspended') {
			this.audioContext.resume();
		}

		this.status = 'playing';
		this.nextNoteTime = this.audioContext.currentTime;
		this.scheduler();
	}

	public pause() {
		if (this.status !== 'playing') return;

		this.status = 'paused';
		if (this.schedulerTimer !== null) {
			window.clearTimeout(this.schedulerTimer);
			this.schedulerTimer = null;
		}
	}

	public stop() {
		if (this.status === 'stopped') return;

		this.status = 'stopped';
		if (this.schedulerTimer !== null) {
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

export class EnhancedMetronomeService extends MetronomeService {
	private chords: { name: string; duration: number }[] = [];
	private currentChordIndex: number = 0;
	private onChordChange?: (index: number) => void;

	public setChordProgression(
		chords: { name: string }[] | undefined,
		timeSignature: string
	) {
		if (!chords || chords.length === 0) {
			this.chords = [];
			return;
		}
		const [numerator] = timeSignature.split('/').map(Number);
		this.chords = chords.map((chord) => ({
			name: chord.name,
			duration: numerator,
		}));
	}

	public setChordChangeCallback(callback: (index: number) => void) {
		this.onChordChange = callback;
	}

	protected override scheduleNote() {
		if (!this.audioContext) return;

		super.scheduleNote();

		if (this.currentBeat === 0 && this.chords.length > 0) {
			const currentChord = this.chords[this.currentChordIndex];
			const barDuration =
				(60 / this.getTrueTempoForSubdivision()) * currentChord.duration;
			chordAudio.playChord(currentChord.name, this.nextNoteTime, barDuration);

			if (this.onChordChange) {
				const timeUntilChange =
					(this.nextNoteTime - this.audioContext.currentTime) * 1000;
				setTimeout(
					() => this.onChordChange!(this.currentChordIndex),
					timeUntilChange
				);
			}

			this.currentChordIndex =
				(this.currentChordIndex + 1) % this.chords.length;
		}
	}

	public override start() {
		super.start();
		if (this.isEnabled) {
			chordAudio.setEnabled(true);
		}
	}

	public override stop() {
		super.stop();
		this.currentChordIndex = 0;
		chordAudio.setEnabled(false);
	}

	public override pause() {
		super.pause();
		chordAudio.setEnabled(false);
	}

	public override async initialize() {
		await super.initialize();
		await chordAudio.initialize();
	}

	public override cleanup() {
		super.cleanup();
		chordAudio.cleanup();
	}
}

export const metronome = new MetronomeService();
export const enhancedMetronome = new EnhancedMetronomeService();
