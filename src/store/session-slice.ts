import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
	sessions: Session[];
	currentSession: Session | null;
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

interface Session {
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
}

const initialState: SessionState = {
	sessions: [],
	currentSession: null,
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

		setSessions: (state, action: PayloadAction<Session[]>) => {
			state.sessions = action.payload;
		},
		addSession: (state, action: PayloadAction<Session>) => {
			state.sessions.push(action.payload);
		},
		updateSession: (state, action: PayloadAction<Session>) => {
			const index = state.sessions.findIndex(
				(session) => session.sessionId === action.payload.sessionId
			);
			if (index !== -1) {
				state.sessions[index] = action.payload;
			}
		},
		setCurrentSession: (state, action: PayloadAction<Session | null>) => {
			state.currentSession = action.payload;
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
	resetSession,
	setSessions,
	addSession,
	updateSession,
	setCurrentSession,
} = sessionSlice.actions;

export default sessionSlice.reducer;
