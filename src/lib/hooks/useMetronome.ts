import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { enhancedMetronome } from '@/lib/services/metronome-service';

export const useMetronome = () => {
	const dispatch = useDispatch();

	// Redux selectors
	const {
		config,
		metronome: metronomeState,
		playback,
		chords,
	} = useSelector((state: RootState) => state.sessions);
	const userToneSet = useSelector(
		(state: RootState) => state.user.settings.audioPreferences.toneSet
	);

	// Initialize enhanced metronome on mount
	useEffect(() => {
		enhancedMetronome.initialize();
		return () => {
			enhancedMetronome.cleanup();
		};
	}, []);

	// Handle metronome enabled state
	useEffect(() => {
		enhancedMetronome.setEnabled(config.useMetronome);
	}, [config.useMetronome]);

	// Set up chord progression
	useEffect(() => {
		enhancedMetronome.setChordProgression(chords, config.timeSignature);
	}, [chords, config.timeSignature]);

	// Set up callbacks for both chord changes and visual feedback
	useEffect(() => {
		enhancedMetronome.setTickCallback(() => {
			window.dispatchEvent(new Event('metronomeTick'));
		});

		enhancedMetronome.setChordChangeCallback((index) => {
			dispatch({ type: 'session/setCurrentChordIndex', payload: index });
		});
	}, [dispatch]);

	// Handle playback state changes
	useEffect(() => {
		if (!config.useMetronome) return;

		switch (playback.status) {
			case 'playing':
				enhancedMetronome.start();
				break;
			case 'paused':
				enhancedMetronome.pause();
				break;
			case 'stopped':
				enhancedMetronome.stop();
				break;
		}
	}, [playback.status, config.useMetronome]);

	// Handle tempo changes
	useEffect(() => {
		enhancedMetronome.setTempo(config.tempo);
	}, [config.tempo]);

	// Handle time signature changes
	useEffect(() => {
		enhancedMetronome.setTimeSignature(config.timeSignature);
	}, [config.timeSignature]);

	// Handle volume changes
	useEffect(() => {
		enhancedMetronome.setVolume(metronomeState.volume);
	}, [metronomeState.volume]);

	// Handle tone set changes
	useEffect(() => {
		enhancedMetronome.setToneSet(userToneSet);
	}, [userToneSet]);
};
