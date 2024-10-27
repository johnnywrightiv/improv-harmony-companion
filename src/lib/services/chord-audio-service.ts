import { ToneSet } from '@/lib/services/metronome-service';

export type ChordVoicing = {
	frequencies: number[];
	type: 'major' | 'minor' | 'dominant7' | 'diminished';
};

const NOTE_FREQUENCIES: Record<string, number> = {
	C: 261.63,
	'C#': 277.18,
	D: 293.66,
	'D#': 311.13,
	E: 329.63,
	F: 349.23,
	'F#': 369.99,
	G: 392.0,
	'G#': 415.3,
	A: 440.0,
	'A#': 466.16,
	B: 493.88,
};

export class ChordAudioService {
	private audioContext: AudioContext | null = null;
	private gainNode: GainNode | null = null;
	private currentOscillators: OscillatorNode[] = [];
	private volume: number = 0.3;
	private isEnabled: boolean = true;

	constructor() {
		this.audioContext = null;
		this.gainNode = null;
	}

	private getChordFrequencies(chordName: string): ChordVoicing {
		// Extract root note and chord quality
		const root = chordName.substring(
			0,
			chordName.match(/[A-G](?:#)?/)![0].length
		);
		const quality = chordName.slice(root.length);

		const rootFreq = NOTE_FREQUENCIES[root];

		let frequencies: number[];
		let type: ChordVoicing['type'];

		switch (quality) {
			case 'm':
				// Minor chord (root, minor third, perfect fifth)
				frequencies = [
					rootFreq,
					rootFreq * 1.189207115,
					rootFreq * 1.498307077,
				];
				type = 'minor';
				break;
			case '7':
				// Dominant 7th (root, major third, perfect fifth, minor seventh)
				frequencies = [
					rootFreq,
					rootFreq * 1.25992105,
					rootFreq * 1.498307077,
					rootFreq * 1.781797436,
				];
				type = 'dominant7';
				break;
			case 'dim':
				// Diminished (root, minor third, diminished fifth)
				frequencies = [
					rootFreq,
					rootFreq * 1.189207115,
					rootFreq * 1.414213562,
				];
				type = 'diminished';
				break;
			default:
				// Major chord (root, major third, perfect fifth)
				frequencies = [rootFreq, rootFreq * 1.25992105, rootFreq * 1.498307077];
				type = 'major';
		}

		return { frequencies, type };
	}

	private stopCurrentOscillators() {
		this.currentOscillators.forEach((osc) => {
			osc.stop();
			osc.disconnect();
		});
		this.currentOscillators = [];
	}

	public async initialize() {
		this.audioContext = new AudioContext();
		this.gainNode = this.audioContext.createGain();
		this.gainNode.connect(this.audioContext.destination);
		this.setVolume(this.volume);
	}

	public setVolume(newVolume: number) {
		this.volume = newVolume;
		if (this.gainNode) {
			this.gainNode.gain.value = this.volume;
		}
	}

	public setEnabled(enabled: boolean) {
		this.isEnabled = enabled;
		if (!enabled) {
			this.stopCurrentOscillators();
		}
	}

	public playChord(chordName: string, startTime: number, duration: number) {
		if (!this.isEnabled || !this.audioContext || !this.gainNode) return;

		const { frequencies } = this.getChordFrequencies(chordName);

		frequencies.forEach((freq) => {
			const osc = this.audioContext!.createOscillator();
			const oscGain = this.audioContext!.createGain();

			// Shape the envelope
			oscGain.gain.setValueAtTime(0, startTime);
			oscGain.gain.linearRampToValueAtTime(
				this.volume / frequencies.length,
				startTime + 0.02
			);
			oscGain.gain.linearRampToValueAtTime(0, startTime + duration - 0.05);

			osc.frequency.setValueAtTime(freq, startTime);
			osc.connect(oscGain);
			oscGain.connect(this.gainNode!);

			osc.start(startTime);
			osc.stop(startTime + duration);

			this.currentOscillators.push(osc);
		});
	}

	public cleanup() {
		this.stopCurrentOscillators();
		if (this.audioContext) {
			this.audioContext.close();
			this.audioContext = null;
		}
	}
}

export const chordAudio = new ChordAudioService();
