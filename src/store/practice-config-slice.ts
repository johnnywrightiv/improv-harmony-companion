import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PracticeConfigState {
	sessionName: string;
	keySignature: string;
	timeSignature: string;
	chordsNotes: string;
	difficulty: 'easy' | 'medium' | 'hard';
	useMetronome: boolean;
	sessionDuration: number;
	tempo: number;
	practiceType: 'timed' | 'freestyle' | 'challenge';
	skillFocus: 'technique' | 'speed' | 'endurance';
}

const initialState: PracticeConfigState = {
	sessionName: '',
	keySignature: 'C',
	timeSignature: '4/4',
	chordsNotes: '',
	difficulty: 'medium',
	useMetronome: false,
	sessionDuration: 30,
	tempo: 120,
	practiceType: 'timed',
	skillFocus: 'technique',
};

export const practiceConfigSlice = createSlice({
	name: 'practiceConfig',
	initialState,
	reducers: {
		updateConfig: (
			state,
			action: PayloadAction<Partial<PracticeConfigState>>
		) => {
			return { ...state, ...action.payload };
		},
		resetConfig: () => initialState,
	},
});

export const { updateConfig, resetConfig } = practiceConfigSlice.actions;
export default practiceConfigSlice.reducer;
