import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import sidebarReducer from './sidebar-slice';
import searchReducer from './search-slice';
import counterReducer from './counter-slice';
import playbackReducer from './playback-slice';
import practiceConfigReducer from './practice-config-slice';
import timerReducer from './timer-slice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		search: searchReducer,
		counter: counterReducer,
		sidebar: sidebarReducer,
		playback: playbackReducer,
		practiceConfig: practiceConfigReducer,
		timer: timerReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
