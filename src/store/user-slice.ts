import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
	id: string;
	username: string;
	email: string;
	profile: {
		displayName: string;
		avatar: string;
	};
	stats: {
		totalSessions: number;
		totalPracticeTime: number;
		recentSessions: string[];
		goalTracking: {
			weeklyGoal: number;
			currentProgress: number;
		};
	};
	settings: {
		theme: string;
		audioPreferences: {
			defaultVolume: number;
			defaultTempo: number;
		};
		notifications: {
			newLoops: boolean;
			sessionReminders: boolean;
		};
	};
}

const initialState: UserState = {
	id: '',
	username: '',
	email: '',
	profile: {
		displayName: '',
		avatar: '',
	},
	stats: {
		totalSessions: 0,
		totalPracticeTime: 0,
		recentSessions: [],
		goalTracking: {
			weeklyGoal: 0,
			currentProgress: 0,
		},
	},
	settings: {
		theme: 'light',
		audioPreferences: {
			defaultVolume: 70,
			defaultTempo: 100,
		},
		notifications: {
			newLoops: true,
			sessionReminders: false,
		},
	},
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserState>) => {
			return { ...state, ...action.payload };
		},
		updateUserSettings: (
			state,
			action: PayloadAction<Partial<UserState['settings']>>
		) => {
			state.settings = { ...state.settings, ...action.payload };
		},
		updateUserStats: (
			state,
			action: PayloadAction<Partial<UserState['stats']>>
		) => {
			state.stats = { ...state.stats, ...action.payload };
		},
	},
});

export const { setUser, updateUserSettings, updateUserStats } =
	userSlice.actions;
export default userSlice.reducer;
