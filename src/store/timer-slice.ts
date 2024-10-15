// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface TimerState {
// 	mode: 'stopwatch' | 'countdown';
// 	status: 'playing' | 'paused' | 'stopped';
// 	currentTime: number;
// 	duration: number;
// }

// const initialState: TimerState = {
// 	mode: 'stopwatch',
// 	status: 'stopped',
// 	currentTime: 0,
// 	duration: 0,
// };

// const timerSlice = createSlice({
// 	name: 'timer',
// 	initialState,
// 	reducers: {
// 		setMode: (state, action: PayloadAction<'stopwatch' | 'countdown'>) => {
// 			state.mode = action.payload;
// 			if (action.payload === 'stopwatch') {
// 				state.currentTime = 0;
// 			} else {
// 				state.currentTime = state.duration;
// 			}
// 		},
// 		setStatus: (
// 			state,
// 			action: PayloadAction<'playing' | 'paused' | 'stopped'>
// 		) => {
// 			state.status = action.payload;
// 			if (action.payload === 'stopped') {
// 				state.currentTime = state.mode === 'stopwatch' ? 0 : state.duration;
// 			}
// 		},
// 		setDuration: (state, action: PayloadAction<number>) => {
// 			state.duration = action.payload;
// 			if (state.mode === 'countdown') {
// 				state.currentTime = action.payload;
// 			}
// 		},
// 		tick: (state) => {
// 			if (state.mode === 'stopwatch') {
// 				state.currentTime += 1;
// 			} else {
// 				state.currentTime = Math.max(0, state.currentTime - 1);
// 			}
// 		},
// 		reset: (state) => {
// 			state.status = 'stopped';
// 			state.currentTime = state.mode === 'stopwatch' ? 0 : state.duration;
// 		},
// 	},
// });

// export const { setMode, setStatus, setDuration, tick, reset } =
// 	timerSlice.actions;
// export default timerSlice.reducer;

// store/timer-slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerState {
	mode: 'stopwatch' | 'countdown';
	status: 'playing' | 'paused' | 'stopped';
	currentTime: number;
	duration: number;
	practiceDuration: number;
}

const initialState: TimerState = {
	mode: 'stopwatch',
	status: 'stopped',
	currentTime: 0,
	duration: 0,
	practiceDuration: 0,
};

const timerSlice = createSlice({
	name: 'timer',
	initialState,
	reducers: {
		setMode: (state, action: PayloadAction<'stopwatch' | 'countdown'>) => {
			state.mode = action.payload;
			if (action.payload === 'stopwatch') {
				state.currentTime = 0;
			} else {
				state.currentTime = state.duration;
			}
			state.practiceDuration = 0;
		},
		setStatus: (
			state,
			action: PayloadAction<'playing' | 'paused' | 'stopped'>
		) => {
			state.status = action.payload;
			if (action.payload === 'stopped') {
				state.currentTime = state.mode === 'stopwatch' ? 0 : state.duration;
				if (state.mode === 'stopwatch') {
					state.practiceDuration = state.currentTime;
				} else {
					state.practiceDuration = state.duration - state.currentTime;
				}
			}
		},
		setDuration: (state, action: PayloadAction<number>) => {
			state.duration = action.payload;
			if (state.mode === 'countdown') {
				state.currentTime = action.payload;
			}
			state.practiceDuration = 0;
		},
		tick: (state) => {
			if (state.mode === 'stopwatch') {
				state.currentTime += 1;
				state.practiceDuration += 1;
			} else {
				state.currentTime = Math.max(0, state.currentTime - 1);
				state.practiceDuration += 1;
			}
		},
		reset: (state) => {
			state.status = 'stopped';
			state.currentTime = state.mode === 'stopwatch' ? 0 : state.duration;
			state.practiceDuration = 0;
		},
		setPracticeDuration: (state, action: PayloadAction<number>) => {
			state.practiceDuration = action.payload;
		},
	},
});

export const {
	setMode,
	setStatus,
	setDuration,
	tick,
	reset,
	setPracticeDuration,
} = timerSlice.actions;
export default timerSlice.reducer;
