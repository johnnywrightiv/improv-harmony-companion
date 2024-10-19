import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '@/store/auth-slice';
import userReducer from '@/store/user-slice';
import loopReducer from '@/store/loop-slice';
import sessionReducer from '@/store/session-slice';
import reviewReducer from '@/store/review-slice';
import uiReducer from '@/store/ui-slice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		loops: loopReducer,
		sessions: sessionReducer,
		reviews: reviewReducer,
		ui: uiReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
