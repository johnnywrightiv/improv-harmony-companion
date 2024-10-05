'use client';

import * as React from 'react';
import { Play, Pause, Square } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { togglePlayback, setPlayback } from '@/store/playback-slice';
import { RootState } from '@/store/store';

export function PlaybackControls() {
	const dispatch = useDispatch();
	const isPlaying = useSelector((state: RootState) => state.playback.isPlaying);

	const handleStop = () => {
		dispatch(setPlayback(false));
		// might want to add additional reset logic here
		// for example, tracking time or progress
	};

	return (
		<div className="flex gap-2">
			<Button
				variant="outline"
				size="icon"
				onClick={() => dispatch(togglePlayback())}
			>
				{isPlaying ? (
					<Pause className="h-[1.2rem] w-[1.2rem]" />
				) : (
					<Play className="h-[1.2rem] w-[1.2rem]" />
				)}
				<span className="sr-only">Toggle playback</span>
			</Button>
			<Button variant="outline" size="icon" onClick={handleStop}>
				<Square className="h-[1.2rem] w-[1.2rem]" />
				<span className="sr-only">Stop</span>
			</Button>
		</div>
	);
}
