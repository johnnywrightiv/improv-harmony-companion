import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import sidebarReducer from './sidebar-slice';
import playbackReducer from './playback-slice';
import practiceConfigReducer from './practice-config-slice';
import sessionReviewReducer from './session-review-slice';
import timerReducer from './timer-slice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		sidebar: sidebarReducer,
		playback: playbackReducer,
		practiceConfig: practiceConfigReducer,
		timer: timerReducer,
		sessionReview: sessionReviewReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
