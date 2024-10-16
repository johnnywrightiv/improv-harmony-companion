// store/session-details-slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionDetailsState {
	duration: number;
	isActive: boolean;
}

const initialState: SessionDetailsState = {
	duration: 0,
	isActive: false,
};

const sessionDetailsSlice = createSlice({
	name: 'sessionDetails',
	initialState,
	reducers: {
		setDuration: (state, action: PayloadAction<number>) => {
			state.duration = action.payload;
		},
		setIsActive: (state, action: PayloadAction<boolean>) => {
			state.isActive = action.payload;
		},
		resetSessionDetails: (state) => {
			state.duration = 0;
			state.isActive = false;
		},
	},
});

export const { setDuration, setIsActive, resetSessionDetails } =
	sessionDetailsSlice.actions;
export default sessionDetailsSlice.reducer;
