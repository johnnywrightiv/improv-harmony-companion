import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Review {
	reviewId: string;
	sessionId: string;
	userId: string;
	rating: number;
	comments: string;
	sessionName: string;
	keySignature: string;
	timeSignature: string;
	tempo: number;
	practiceDuration: number;
}

interface ReviewState {
	reviews: Review[];
	currentReview: Review | null;
}

const initialState: ReviewState = {
	reviews: [],
	currentReview: null,
};

const reviewSlice = createSlice({
	name: 'reviews',
	initialState,
	reducers: {
		setReviews: (state, action: PayloadAction<Review[]>) => {
			state.reviews = action.payload;
		},
		addReview: (state, action: PayloadAction<Review>) => {
			state.reviews.push(action.payload);
		},
		updateReview: (state, action: PayloadAction<Review>) => {
			const index = state.reviews.findIndex(
				(review) => review.reviewId === action.payload.reviewId
			);
			if (index !== -1) {
				state.reviews[index] = action.payload;
			}
		},
		setCurrentReview: (state, action: PayloadAction<Review | null>) => {
			state.currentReview = action.payload;
		},
	},
});

export const { setReviews, addReview, updateReview, setCurrentReview } =
	reviewSlice.actions;
export default reviewSlice.reducer;
