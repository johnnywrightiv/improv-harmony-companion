import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlaybackState {
	isPlaying: boolean;
}

const initialState: PlaybackState = {
	isPlaying: false,
};

export const playbackSlice = createSlice({
	name: 'playback',
	initialState,
	reducers: {
		togglePlayback: (state) => {
			state.isPlaying = !state.isPlaying;
		},
		setPlayback: (state, action: PayloadAction<boolean>) => {
			state.isPlaying = action.payload;
		},
	},
});

export const { togglePlayback, setPlayback } = playbackSlice.actions;
export default playbackSlice.reducer;
