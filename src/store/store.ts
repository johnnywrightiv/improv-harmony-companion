import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import sidebarReducer from './sidebar-slice';
import practiceSessionReducer from './practice-session-slice';
import sessionReviewReducer from './session-review-slice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		sidebar: sidebarReducer,
		practiceSession: practiceSessionReducer,
		sessionReview: sessionReviewReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
