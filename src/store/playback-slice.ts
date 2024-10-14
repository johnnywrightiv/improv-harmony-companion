import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlaybackState {
	status: 'playing' | 'paused' | 'stopped';
}

const initialState: PlaybackState = {
	status: 'stopped',
};

export const playbackSlice = createSlice({
	name: 'playback',
	initialState,
	reducers: {
		play: (state) => {
			state.status = 'playing';
		},
		pause: (state) => {
			state.status = 'paused';
		},
		stop: (state) => {
			state.status = 'stopped';
		},
		setPlaybackStatus: (
			state,
			action: PayloadAction<PlaybackState['status']>
		) => {
			state.status = action.payload;
		},
	},
});

export const { play, pause, stop, setPlaybackStatus } = playbackSlice.actions;
export default playbackSlice.reducer;
