import * as React from 'react';
import { Play, Pause, Square } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { setTimerStatus, resetTimer } from '@/store/practice-session-slice';
import { RootState } from '@/store/store';

export const PlaybackControls: React.FC = () => {
	const dispatch = useDispatch();
	const { playback } = useSelector((state: RootState) => state.practiceSession);

	const handlePlayPause = () => {
		if (playback.status === 'playing') {
			dispatch(setTimerStatus('paused'));
		} else {
			dispatch(setTimerStatus('playing'));
		}
	};

	const handleStop = () => {
		dispatch(setTimerStatus('stopped'));
		dispatch(resetTimer());
	};

	return (
		<div className="flex gap-2">
			<Toggle
				variant="outline"
				size="sm"
				pressed={playback.status === 'playing'}
				onPressedChange={handlePlayPause}
				className="h-10 w-10"
			>
				{playback.status === 'playing' ? (
					<Pause className="h-[1.2rem] w-[1.2rem]" />
				) : (
					<Play className="h-[1.2rem] w-[1.2rem]" />
				)}
				<span className="sr-only">Toggle playback</span>
			</Toggle>
			<Button variant="outline" size="icon" onClick={handleStop}>
				<Square className="h-[1.2rem] w-[1.2rem]" />
				<span className="sr-only">Stop</span>
			</Button>
		</div>
	);
};
