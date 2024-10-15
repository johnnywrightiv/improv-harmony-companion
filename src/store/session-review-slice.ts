import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionReview {
	rating: number;
	comments: string;
	sessionName: string;
	keySignature: string;
	timeSignature: string;
	tempo: number;
	practiceDuration: number;
	// Add other relevant fields from PracticeConfigState
}

interface SessionReviewState {
	reviews: SessionReview[];
}

const initialState: SessionReviewState = {
	reviews: [],
};

export const sessionReviewSlice = createSlice({
	name: 'sessionReview',
	initialState,
	reducers: {
		saveSessionReview: (state, action: PayloadAction<SessionReview>) => {
			state.reviews.push(action.payload);
		},
	},
});

export const { saveSessionReview } = sessionReviewSlice.actions;
export default sessionReviewSlice.reducer;
