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
			dailyGoal: number;
			weeklyGoal: number;
			currentDailyProgress: number;
			currentWeeklyProgress: number;
		};
	};
	settings: {
		theme: string;
		audioPreferences: {
			defaultVolume: number;
			defaultTempo: number;
			toneSet: 'click' | 'clave' | 'blip' | 'beep';
		};
		notifications: {
			newLoops: boolean;
			sessionReminders: boolean;
		};
		practiceGoal: {
			dailyGoal: number;
			weeklyGoal: number;
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
			dailyGoal: 0,
			weeklyGoal: 0,
			currentDailyProgress: 0,
			currentWeeklyProgress: 0,
		},
	},
	settings: {
		theme: 'light',
		audioPreferences: {
			defaultVolume: 70,
			defaultTempo: 100,
			toneSet: 'click',
		},
		notifications: {
			newLoops: true,
			sessionReminders: false,
		},
		practiceGoal: {
			dailyGoal: 0,
			weeklyGoal: 0,
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
		setPracticeGoal: (state, action: PayloadAction<{ dailyGoal: number }>) => {
			const dailyGoal = action.payload.dailyGoal;
			const weeklyGoal = dailyGoal * 7;

			// Update in settings
			state.settings.practiceGoal = {
				dailyGoal,
				weeklyGoal,
			};

			// Update in stats
			state.stats.goalTracking.dailyGoal = dailyGoal;
			state.stats.goalTracking.weeklyGoal = weeklyGoal;
		},
		updateGoalProgress: (
			state,
			action: PayloadAction<{ dailyProgress: number; weeklyProgress: number }>
		) => {
			state.stats.goalTracking.currentDailyProgress =
				action.payload.dailyProgress;
			state.stats.goalTracking.currentWeeklyProgress =
				action.payload.weeklyProgress;
		},
		updateAudioPreferences: (
			state,
			action: PayloadAction<Partial<UserState['settings']['audioPreferences']>>
		) => {
			state.settings.audioPreferences = {
				...state.settings.audioPreferences,
				...action.payload,
			};
		},
	},
});

export const {
	setUser,
	updateUserSettings,
	updateUserStats,
	setPracticeGoal,
	updateGoalProgress,
	updateAudioPreferences,
} = userSlice.actions;

export default userSlice.reducer;
