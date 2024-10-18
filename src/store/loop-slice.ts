import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoopState {
	loops: Loop[];
	currentLoop: Loop | null;
}

interface Loop {
	loopId: string;
	userId: string;
	name: string;
	config: {
		keySignature: string;
		scale: string;
		chordProgression: string[];
		tempo: number;
		timeSignature: string;
	};
	genre: string;
	isShared: boolean;
	tags: string[];
}

const initialState: LoopState = {
	loops: [],
	currentLoop: null,
};

const loopSlice = createSlice({
	name: 'loops',
	initialState,
	reducers: {
		setLoops: (state, action: PayloadAction<Loop[]>) => {
			state.loops = action.payload;
		},
		addLoop: (state, action: PayloadAction<Loop>) => {
			state.loops.push(action.payload);
		},
		updateLoop: (state, action: PayloadAction<Loop>) => {
			const index = state.loops.findIndex(
				(loop) => loop.loopId === action.payload.loopId
			);
			if (index !== -1) {
				state.loops[index] = action.payload;
			}
		},
		deleteLoop: (state, action: PayloadAction<string>) => {
			state.loops = state.loops.filter(
				(loop) => loop.loopId !== action.payload
			);
		},
		setCurrentLoop: (state, action: PayloadAction<Loop | null>) => {
			state.currentLoop = action.payload;
		},
	},
});

export const { setLoops, addLoop, updateLoop, deleteLoop, setCurrentLoop } =
	loopSlice.actions;
export default loopSlice.reducer;
