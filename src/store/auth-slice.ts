import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from './store';

// Types
interface User {
	id: string;
	email: string;
	username: string;
}

interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
}

// Initial state
const initialState: AuthState = {
	user: null,
	token: null,
	isAuthenticated: false,
	isLoading: false,
	error: null,
};

// Slice
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
			state.error = null;
		},
		setError: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		loginSuccess: (
			state,
			action: PayloadAction<{ user: User; token: string }>
		) => {
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.isLoading = false;
			state.error = null;
		},
		signupSuccess: (
			state,
			action: PayloadAction<{ user: User; token: string }>
		) => {
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.isLoading = false;
			state.error = null;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
			state.error = null;
		},
	},
});

// Actions
export const { setLoading, setError, loginSuccess, signupSuccess, logout } =
	authSlice.actions;

// Async action creators
export const loginUser =
	// ESLINT RULE: bypass because "password" is used in useAuth.ts
	// eslint-disable-next-line no-unused-vars
	(email: string, password: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch(setLoading(true));

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// This is where you'd make your actual API call
			// For now, we'll simulate a successful response
			const mockUser: User = {
				id: '123',
				email,
				username: email.split('@')[0],
			};
			const mockToken = 'mock-jwt-token';

			dispatch(loginSuccess({ user: mockUser, token: mockToken }));
		} catch (error) {
			dispatch(
				setError(error instanceof Error ? error.message : 'An error occurred')
			);
		}
	};

export const signupUser =
	(email: string, password: string, username: string) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(setLoading(true));

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// This is where you'd make your actual API call
			// For now, we'll simulate a successful response
			const mockUser: User = {
				id: '123',
				email,
				username,
			};
			const mockToken = 'mock-jwt-token';

			dispatch(signupSuccess({ user: mockUser, token: mockToken }));
		} catch (error) {
			dispatch(
				setError(error instanceof Error ? error.message : 'An error occurred')
			);
		}
	};

export const logoutUser = () => (dispatch: AppDispatch) => {
	// Here you would typically:
	// 1. Clear any stored tokens
	// 2. Make an API call to invalidate the token on the server

	dispatch(logout());
};

export default authSlice.reducer;
