import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SliderState {
	value: number;
}

const initialState: SliderState = {
	value: 50, // Default value, adjust as needed
};

export const sliderSlice = createSlice({
	name: 'slider',
	initialState,
	reducers: {
		setSliderValue: (state, action: PayloadAction<number>) => {
			state.value = action.payload;
		},
		resetSlider: (state) => {
			state.value = initialState.value;
		},
	},
});

export const { setSliderValue, resetSlider } = sliderSlice.actions;
export default sliderSlice.reducer;
