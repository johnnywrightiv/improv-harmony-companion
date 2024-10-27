import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { metronome } from '../services/metronome-service';

export const useMetronome = () => {
	const {
		config,
		metronome: metronomeState,
		playback,
	} = useSelector((state: RootState) => state.sessions);

	const userToneSet = useSelector(
		(state: RootState) => state.user.settings.audioPreferences.toneSet
	);

	// Initialize metronome on mount
	useEffect(() => {
		metronome.initialize();
		return () => metronome.cleanup();
	}, []);

	// Handle metronome enabled state
	useEffect(() => {
		metronome.setEnabled(config.useMetronome);
	}, [config.useMetronome]);

	// Handle playback state changes
	useEffect(() => {
		if (!config.useMetronome) return;

		switch (playback.status) {
			case 'playing':
				metronome.start();
				break;
			case 'paused':
				metronome.pause();
				break;
			case 'stopped':
				metronome.stop();
				break;
		}
	}, [playback.status, config.useMetronome]);

	// Handle tempo changes
	useEffect(() => {
		metronome.setTempo(config.tempo);
	}, [config.tempo]);

	// Handle time signature changes
	useEffect(() => {
		metronome.setTimeSignature(config.timeSignature);
	}, [config.timeSignature]);

	// Handle volume changes
	useEffect(() => {
		metronome.setVolume(metronomeState.volume);
	}, [metronomeState.volume]);

	// Handle tone set changes
	useEffect(() => {
		metronome.setToneSet(userToneSet);
	}, [userToneSet]);
};
