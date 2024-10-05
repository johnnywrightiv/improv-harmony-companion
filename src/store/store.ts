import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter-slice';
import isPlaying from './playback-slice';
import searchReducer from './search-slice';
import sliderReducer from './slider-slice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		playback: isPlaying,
		search: searchReducer,
		slider: sliderReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
