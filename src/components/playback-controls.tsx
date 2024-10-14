'use client';

import * as React from 'react';
import { Play, Pause, Square } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { play, pause, stop } from '@/store/playback-slice';
import { setStatus, reset } from '@/store/timer-slice';
import { RootState } from '@/store/store';

export const PlaybackControls: React.FC = () => {
	const dispatch = useDispatch();
	const playbackStatus = useSelector(
		(state: RootState) => state.playback.status
	);

	const handlePlayPause = () => {
		if (playbackStatus === 'playing') {
			dispatch(pause());
			dispatch(setStatus('paused'));
		} else {
			dispatch(play());
			dispatch(setStatus('playing'));
		}
	};

	const handleStop = () => {
		dispatch(stop());
		dispatch(reset());
		dispatch(setStatus('stopped'));
	};

	return (
		<div className="flex gap-2">
			<Toggle
				variant="outline"
				size="sm"
				pressed={playbackStatus === 'playing'}
				onPressedChange={handlePlayPause}
				className="h-10 w-10"
			>
				{playbackStatus === 'playing' ? (
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
