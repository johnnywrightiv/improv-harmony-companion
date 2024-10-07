import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import sidebarReducer from './sidebar-slice';
import searchReducer from './search-slice';
import counterReducer from './counter-slice';
import isPlaying from './playback-slice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		search: searchReducer,
		counter: counterReducer,
		sidebar: sidebarReducer,
		playback: isPlaying,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
