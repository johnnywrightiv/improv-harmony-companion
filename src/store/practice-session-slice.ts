import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PracticeSessionState {
	config: {
		sessionName: string;
		keySignature: string;
		timeSignature: string;
		chordsNotes: string;
		difficulty: string;
		useMetronome: boolean;
		sessionDuration: number;
		tempo: number;
		practiceType: string;
		skillFocus: string;
		isActive: boolean;
	};
	timer: {
		mode: 'stopwatch' | 'countdown';
		status: 'playing' | 'paused' | 'stopped';
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
}

const initialState: PracticeSessionState = {
	config: {
		sessionName: '',
		keySignature: '',
		timeSignature: '',
		chordsNotes: '',
		difficulty: 'easy',
		useMetronome: false,
		sessionDuration: 30,
		tempo: 120,
		practiceType: 'timed',
		skillFocus: 'technique',
		isActive: false,
	},
	timer: {
		mode: 'stopwatch',
		status: 'stopped',
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
};

const practiceSessionSlice = createSlice({
	name: 'practiceSession',
	initialState,
	reducers: {
		updateConfig: (
			state,
			action: PayloadAction<Partial<PracticeSessionState['config']>>
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
			if (action.payload === 'stopped') {
				state.timer.currentTime =
					state.timer.mode === 'stopwatch' ? 0 : state.timer.duration;
				state.timer.practiceDuration =
					state.timer.mode === 'stopwatch'
						? state.timer.currentTime
						: state.timer.duration - state.timer.currentTime;
			}
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
			state.timer.practiceDuration = 0;
		},
		toggleMetronome: (state) => {
			state.metronome.isActive = !state.metronome.isActive;
		},
		setMetronomeVolume: (state, action: PayloadAction<number>) => {
			state.metronome.volume = action.payload;
		},
		resetSession: () => initialState,
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
	resetSession,
} = practiceSessionSlice.actions;

export default practiceSessionSlice.reducer;
