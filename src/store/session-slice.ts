import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store';

interface SessionState {
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
			// state.timer.practiceDuration = 0;
		},
		toggleMetronome: (state) => {
			state.metronome.isActive = !state.metronome.isActive;
		},
		setMetronomeVolume: (state, action: PayloadAction<number>) => {
			state.metronome.volume = action.payload;
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
	endSession,
	finalizeSession,
	resetSession,
	clearCompletedSession,
	addSession,
	updateSession,
} = sessionSlice.actions;

// Thunk action
export const completeSession = (): AppThunk => (dispatch) => {
	dispatch(endSession());
	dispatch(finalizeSession());
};

export default sessionSlice.reducer;
