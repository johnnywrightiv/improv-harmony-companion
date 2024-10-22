import React from 'react';
import {
	Play,
	Pause,
	Square,
	Save,
	Settings,
	Volume2,
	NotepadText,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Slider } from '@/components/ui/slider';
import {
	setTimerStatus,
	resetTimer,
	updateConfig,
	setMetronomeVolume,
	toggleMetronome,
} from '@/store/session-slice';
import { RootState } from '@/store/store';
import Image from 'next/image';

interface PlaybackControlsBarProps {
	onConfigOpen: () => void;
	onReviewOpen: () => void;
	onSaveLoop: () => void;
}

export const PlaybackControlsBar: React.FC<PlaybackControlsBarProps> = ({
	onConfigOpen,
	onReviewOpen,
	onSaveLoop,
}) => {
	const dispatch = useDispatch();
	const { playback, config, metronome } = useSelector(
		(state: RootState) => state.sessions
	);

	const handlePlayPause = () => {
		dispatch(
			setTimerStatus(playback.status === 'playing' ? 'paused' : 'playing')
		);
	};

	const handleStop = () => {
		dispatch(setTimerStatus('stopped'));
		dispatch(resetTimer());
	};

	const handleVolumeChange = (value: number[]) => {
		dispatch(setMetronomeVolume(value[0]));
	};

	const handleMetronomeToggle = () => {
		dispatch(updateConfig({ useMetronome: !config.useMetronome }));
		dispatch(toggleMetronome({ useMetronome: !metronome.isActive }));
	};

	return (
		<div className="flex flex-col items-center gap-6 bg-secondary/50 p-8">
			{/* Controls Row */}
			<div className="flex items-center gap-4">
				{/* Settings buttons */}
				<Button variant="outline" size="icon" onClick={onSaveLoop}>
					<Save className="h-4 w-4" />
					<span className="sr-only">Save loop</span>
				</Button>

				<Toggle
					variant="outline"
					pressed={config.useMetronome}
					onPressedChange={handleMetronomeToggle}
					className="h-10 w-10"
				>
					<Image
						src="/metronome.svg"
						alt="Metronome"
						width={16}
						height={16}
						className="dark:invert"
					/>
					<span className="sr-only">Toggle metronome</span>
				</Toggle>

				{/* Playback controls */}
				<Toggle
					variant="outline"
					pressed={playback.status === 'playing'}
					onPressedChange={handlePlayPause}
					className="h-10 w-10"
				>
					{playback.status === 'playing' ? (
						<Pause className="h-4 w-4" />
					) : (
						<Play className="h-4 w-4" />
					)}
					<span className="sr-only">Toggle playback</span>
				</Toggle>
				<Button variant="outline" size="icon" onClick={handleStop}>
					<Square className="h-4 w-4" />
					<span className="sr-only">Stop</span>
				</Button>
				<Button variant="outline" size="icon" onClick={onReviewOpen}>
					<NotepadText className="h-4 w-4" />
					<span className="sr-only">Session comments</span>
				</Button>
				<Button variant="outline" size="icon" onClick={onConfigOpen}>
					<Settings className="h-4 w-4" />
					<span className="sr-only">Open settings</span>
				</Button>
			</div>

			{/* Volume Row */}
			<div className="flex w-full max-w-[300px] items-center gap-2">
				<span className='text-xs text-muted-foreground inline'>Metronome</span>
				<Volume2 className="h-4 w-4 shrink-0" />
				<Slider
					value={[metronome.volume]}
					max={100}
					step={1}
					onValueChange={handleVolumeChange}
				/>
				<span className="min-w-[3ch] text-sm text-muted-foreground">
					{metronome.volume}%
				</span>
			</div>
		</div>
	);
};