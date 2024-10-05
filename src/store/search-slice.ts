import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
	value: string;
}

const initialState: SearchState = {
	value: '',
};

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearchTerm: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
		},
		clearSearch: (state) => {
			state.value = '';
		},
	},
});

export const { setSearchTerm, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
