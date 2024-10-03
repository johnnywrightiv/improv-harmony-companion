import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
	value: number; // The counter will hold a numeric value
}

const initialState: CounterState = {
	value: 0, // Initial value for the counter
};

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		// Increment the counter by 1
		increment: (state) => {
			state.value += 1;
		},
		// Decrement the counter by 1
		decrement: (state) => {
			state.value -= 1;
		},
		// Set the counter to a specific value
		setCounter: (state, action: PayloadAction<number>) => {
			state.value = action.payload;
		},
		// Reset the counter to 0
		resetCounter: (state) => {
			state.value = 0;
		},
	},
});

export const { increment, decrement, setCounter, resetCounter } =
	counterSlice.actions;
export default counterSlice.reducer;
