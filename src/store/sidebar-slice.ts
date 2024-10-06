import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
	isVisible: boolean;
}

// Initial state with localStorage fallback for SSR (Server-Side Rendering)
const initialState: SidebarState = {
	isVisible:
		typeof window !== 'undefined'
			? localStorage.getItem('sidebarVisible') !== 'false'
			: true,
};

export const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState,
	reducers: {
		toggleSidebar: (state) => {
			state.isVisible = !state.isVisible;
			if (typeof window !== 'undefined') {
				localStorage.setItem('sidebarVisible', state.isVisible.toString());
			}
		},
		setSidebarVisibility: (state, action: PayloadAction<boolean>) => {
			state.isVisible = action.payload;
			if (typeof window !== 'undefined') {
				localStorage.setItem('sidebarVisible', state.isVisible.toString());
			}
		},
		resetSidebar: (state) => {
			state.isVisible = initialState.isVisible;
			if (typeof window !== 'undefined') {
				localStorage.setItem('sidebarVisible', state.isVisible.toString());
			}
		},
	},
});

export const { toggleSidebar, setSidebarVisibility, resetSidebar } =
	sidebarSlice.actions;
export default sidebarSlice.reducer;
