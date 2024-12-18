import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store';

type ToneSet = 'click' | 'clave' | 'blip' | 'beep';

interface Chord {
	name: string;
	tones: string[];
	romanNumeral: string;
}

interface SessionState {
	config: {
		isActive: boolean;
		sessionName: string;
		keySignature: string;
		scaleType:
			| 'major'
			| 'lydian'
			| 'mixolydian'
			| 'dorian'
			| 'minor'
			| 'phrygian'
			| 'locrian'
			| 'harmonic minor'
			| 'melodic minor'
			| 'blues'
			| 'diminished'
			| 'augmented';
		timeSignature: string;
		chordsNotes: string;
		chords: Chord[];
		currentChordIndex: number;
		useMetronome: boolean;
		sessionDuration: number;
		tempo: number;
		sessionComments: string;
		sessionRating: number;
		toneSet: ToneSet;
	};
	timer: {
		status: 'playing' | 'paused' | 'stopped';
		mode: 'countdown' | 'stopwatch';
		currentTime: number;
		duration: number;
		practiceDuration: number;
	};
	playback: {
		status: 'playing' | 'paused' | 'stopped';
	};
	metronome: {
		isActive: boolean;
		volume: number;
	};
	completedSession: {
		practiceDuration: number;
		keySignature: string;
		timeSignature: string;
		tempo: number;
		sessionName: string;
	} | null;
	sessions: Array<{
		sessionId: string;
		userId: string;
		loopId: string;
		name: string;
		playback: {
			status: 'playing' | 'paused' | 'stopped';
			currentPlayTime: number;
			totalDuration: number;
		};
		practiceType: string;
		timestamps: {
			startTime: string;
			endTime: string;
		};
		isSaved: boolean;
	}>;
}

const initialState: SessionState = {
	config: {
		isActive: false,
		sessionName: '',
		keySignature: 'C',
		scaleType: 'major',
		timeSignature: '4/4',
		chordsNotes: '',
		chords: [
			{ name: 'C', tones: ['C', 'E', 'G'], romanNumeral: 'I' },
			{ name: 'A', tones: ['A', 'C', 'E'], romanNumeral: 'vi' },
			{ name: 'G7', tones: ['G', 'B', 'D', 'F'], romanNumeral: 'V7' },
			{ name: 'Em', tones: ['E', 'G', 'B'], romanNumeral: 'iii' },
		],
		currentChordIndex: 0,
		useMetronome: true,
		sessionDuration: 30,
		tempo: 120,
		sessionComments: '',
		sessionRating: 0,
		toneSet: 'click',
	},
	timer: {
		status: 'stopped',
		mode: 'countdown',
		currentTime: 0,
		duration: 0,
		practiceDuration: 0,
	},
	playback: {
		status: 'stopped',
	},
	metronome: {
		isActive: false,
		volume: 50,
	},
	completedSession: null,
	sessions: [],
};

const sessionSlice = createSlice({
	name: 'sessions',
	initialState,
	reducers: {
		updateConfig: (
			state,
			action: PayloadAction<Partial<SessionState['config']>>
		) => {
			state.config = { ...state.config, ...action.payload };
		},
		setTimerMode: (state, action: PayloadAction<'stopwatch' | 'countdown'>) => {
			state.timer.mode = action.payload;
			state.timer.currentTime =
				action.payload === 'stopwatch' ? 0 : state.timer.duration;
		},
		setTimerStatus: (
			state,
			action: PayloadAction<'playing' | 'paused' | 'stopped'>
		) => {
			state.timer.status = action.payload;
			state.playback.status = action.payload;
		},
		setTimerDuration: (state, action: PayloadAction<number>) => {
			state.timer.duration = action.payload;
			if (state.timer.mode === 'countdown') {
				state.timer.currentTime = action.payload;
			}
			state.timer.practiceDuration = 0;
		},
		timerTick: (state) => {
			if (state.timer.mode === 'stopwatch') {
				state.timer.currentTime += 1;
				state.timer.practiceDuration += 1;
			} else {
				state.timer.currentTime = Math.max(0, state.timer.currentTime - 1);
				state.timer.practiceDuration += 1;
			}
		},
		resetTimer: (state) => {
			state.timer.status = 'stopped';
			state.timer.currentTime =
				state.timer.mode === 'stopwatch' ? 0 : state.timer.duration;
		},
		toggleMetronome: (state) => {
			state.metronome.isActive = !state.metronome.isActive;
		},
		setMetronomeVolume: (state, action: PayloadAction<number>) => {
			state.metronome.volume = action.payload;
		},
		updateSessionComments: (state, action: PayloadAction<string>) => {
			state.config.sessionComments = action.payload;
		},
		endSession: (state) => {
			state.completedSession = {
				practiceDuration: state.timer.practiceDuration,
				keySignature: state.config.keySignature,
				timeSignature: state.config.timeSignature,
				tempo: state.config.tempo,
				sessionName: state.config.sessionName,
			};
			state.config.isActive = false;
		},
		finalizeSession: (state) => {
			state.timer.status = 'stopped';
			state.playback.status = 'stopped';
			state.timer.currentTime =
				state.timer.mode === 'stopwatch' ? 0 : state.timer.duration;
			state.timer.practiceDuration = 0;
		},
		resetSession: () => initialState,
		clearCompletedSession: (state) => {
			state.completedSession = null;
		},
		addSession: (state, action: PayloadAction<SessionState['sessions'][0]>) => {
			state.sessions.push(action.payload);
		},
		updateSession: (
			state,
			action: PayloadAction<SessionState['sessions'][0]>
		) => {
			const index = state.sessions.findIndex(
				(session) => session.sessionId === action.payload.sessionId
			);
			if (index !== -1) {
				state.sessions[index] = action.payload;
			}
		},
		updateSessionRating: (state, action: PayloadAction<number>) => {
			state.config.sessionRating = action.payload;
		},
		setCurrentChordIndex: (state, action: PayloadAction<number>) => {
			state.config.currentChordIndex = action.payload;
		},
		updateChord: (
			state,
			action: PayloadAction<{ index: number; chord: Chord }>
		) => {
			state.config.chords[action.payload.index] = action.payload.chord;
		},
		addChord: (state, action: PayloadAction<Chord>) => {
			state.config.chords.push(action.payload);
		},
		moveChord: (
			state,
			action: PayloadAction<{ index: number; direction: 'left' | 'right' }>
		) => {
			const { index, direction } = action.payload;
			if (direction === 'left' && index > 0) {
				[state.config.chords[index - 1], state.config.chords[index]] = [
					state.config.chords[index],
					state.config.chords[index - 1],
				];
			} else if (
				direction === 'right' &&
				index < state.config.chords.length - 1
			) {
				[state.config.chords[index], state.config.chords[index + 1]] = [
					state.config.chords[index + 1],
					state.config.chords[index],
				];
			}
		},
		deleteChord: (state, action: PayloadAction<number>) => {
			state.config.chords.splice(action.payload, 1);
		},
		setPlaybackStatus: (
			state,
			action: PayloadAction<'playing' | 'paused' | 'stopped'>
		) => {
			state.playback.status = action.payload;
		},
	},
});

export const {
	updateConfig,
	setTimerMode,
	setTimerStatus,
	setTimerDuration,
	timerTick,
	resetTimer,
	toggleMetronome,
	setMetronomeVolume,
	updateSessionComments,
	endSession,
	finalizeSession,
	resetSession,
	clearCompletedSession,
	addSession,
	updateSession,
	updateSessionRating,
	setCurrentChordIndex,
	updateChord,
	addChord,
	moveChord,
	deleteChord,
	setPlaybackStatus,
} = sessionSlice.actions;

// Thunk action
export const completeSession = (): AppThunk => (dispatch) => {
	dispatch(endSession());
	dispatch(finalizeSession());
};

export default sessionSlice.reducer;
