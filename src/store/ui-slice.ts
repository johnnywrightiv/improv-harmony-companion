import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
	sidebarVisible: boolean;
	currentPage: string;
	theme: 'light' | 'dark';
	loading: boolean;
}

const initialState: UIState = {
	sidebarVisible: true,
	currentPage: 'home',
	theme: 'light',
	loading: false,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleSidebar: (state) => {
			state.sidebarVisible = !state.sidebarVisible;
		},
		setCurrentPage: (state, action: PayloadAction<string>) => {
			state.currentPage = action.payload;
		},
		setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
			state.theme = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
	},
});

export const { toggleSidebar, setCurrentPage, setTheme, setLoading } =
	uiSlice.actions;
export default uiSlice.reducer;
