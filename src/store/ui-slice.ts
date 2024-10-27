import { createSlice } from '@reduxjs/toolkit';

interface UIState {
	sidebarVisible: boolean;
	currentPage: string;
	loading: boolean;
}

const initialState: UIState = {
	sidebarVisible: true,
	currentPage: 'home',
	loading: false,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleSidebar: (state) => {
			state.sidebarVisible = !state.sidebarVisible;
		},
	},
});

export const { toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
