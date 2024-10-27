import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setCurrentChordIndex } from '@/store/session-slice';

export const useChordProgression = () => {
	const dispatch = useDispatch();
	const beatCountRef = useRef(0);

	const { currentChordIndex, chords, timeSignature } = useSelector(
		(state: RootState) => state.sessions.config
	);

	const { status: playbackStatus } = useSelector(
		(state: RootState) => state.sessions.playback
	);

	// Get beats per measure from time signature (e.g., "4/4" -> 4)
	const beatsPerMeasure = parseInt(timeSignature.split('/')[0]);

	useEffect(() => {
		// Reset beat count when playback stops
		if (playbackStatus === 'stopped') {
			beatCountRef.current = 0;
			dispatch(setCurrentChordIndex(0));
			return;
		}

		// Subscribe to metronome tick events
		const handleMetronomeTick = () => {
			if (playbackStatus === 'playing') {
				beatCountRef.current += 1;

				// When we've reached the end of a measure
				if (beatCountRef.current >= beatsPerMeasure) {
					beatCountRef.current = 0;

					// Move to next chord or loop back to start
					dispatch(
						setCurrentChordIndex(
							currentChordIndex === chords.length - 1
								? 0
								: currentChordIndex + 1
						)
					);
				}
			}
		};

		// Add event listener for metronome ticks
		window.addEventListener('metronomeTick', handleMetronomeTick);

		return () => {
			window.removeEventListener('metronomeTick', handleMetronomeTick);
		};
	}, [
		dispatch,
		playbackStatus,
		currentChordIndex,
		chords.length,
		beatsPerMeasure,
	]);

	return { currentChordIndex };
};
