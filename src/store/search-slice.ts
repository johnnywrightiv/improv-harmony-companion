// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface SearchState {
// 	value: string;
// }

// const initialState: SearchState = {
// 	value: '',
// };

// export const searchSlice = createSlice({
// 	name: 'search',
// 	initialState,
// 	reducers: {
// 		setSearchTerm: (state, action: PayloadAction<string>) => {
// 			state.value = action.payload;
// 		},
// 		clearSearch: (state) => {
// 			state.value = '';
// 		},
// 	},
// });

// export const { setSearchTerm, clearSearch } = searchSlice.actions;
// export default searchSlice.reducer;

// store/search-slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
	query: string;
}

const initialState: SearchState = {
	query: '', // Initial empty search query
};

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearchQuery: (state, action: PayloadAction<string>) => {
			state.query = action.payload;
		},
		clearSearchQuery: (state) => {
			state.query = '';
		},
	},
});

export const { setSearchQuery, clearSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
