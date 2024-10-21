import * as React from 'react';
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	setTimerStatus,
	resetTimer,
	updateConfig,
	setMetronomeVolume,
} from '@/store/session-slice';
import { RootState } from '@/store/store';
import Image from 'next/image';

interface PlaybackControlsProps {
	onConfigOpen: () => void;
	onReviewOpen: () => void;
	onSaveSession: () => void;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
	onConfigOpen,
	onReviewOpen,
	onSaveSession,
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
	};

	const handleKeySignatureChange = (value: string) => {
		dispatch(updateConfig({ keySignature: value }));
	};

	const handleScaleTypeChange = (value: string) => {
		dispatch(updateConfig({ scaleType: value }));
	};

	const handleTimeSignatureChange = (value: string) => {
		dispatch(updateConfig({ timeSignature: value }));
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between gap-2"></div>

			<div className="flex items-center justify-evenly gap-4 rounded-lg bg-secondary/50 p-4">
				<div className="flex items-center gap-2">
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

				<Toggle
					variant="outline"
					pressed={config.useMetronome}
					onPressedChange={handleMetronomeToggle}
					className="h-10 w-10 rounded-xl"
				>
					<Image
						src="/metronome.svg"
						alt="Metronome"
						width={36}
						height={36}
						className="dark:invert"
					/>
					<span className="sr-only">Toggle metronome</span>
				</Toggle>
				<Volume2 className="h-4 w-4" />
				<Slider
					className="w-[120px]"
					value={[metronome.volume]}
					max={100}
					step={1}
					onValueChange={handleVolumeChange}
				/>
				<span className="text-sm text-muted-foreground">
					{metronome.volume}%
				</span>

				<div className="flex items-center gap-2">
					<Button variant="outline" size="icon" onClick={onConfigOpen}>
						<Settings className="h-[1.2rem] w-[1.2rem]" />
						<span className="sr-only">Open settings</span>
					</Button>
					<Button variant="outline" size="icon" onClick={onReviewOpen}>
						<NotepadText className="h-[1.2rem] w-[1.2rem]" />
						<span className="sr-only">Session notes</span>
					</Button>
					<Button variant="outline" size="icon" onClick={onSaveSession}>
						<Save className="h-[1.2rem] w-[1.2rem]" />
						<span className="sr-only">Save session</span>
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-4 rounded-lg bg-secondary/50 p-4">
				<div className="space-y-2">
					<label className="text-sm font-medium">Tempo</label>
					<Slider
						value={[config.tempo]}
						min={40}
						max={208}
						step={4}
						onValueChange={(value) =>
							dispatch(updateConfig({ tempo: value[0] }))
						}
					/>
					<div className="text-right text-sm text-muted-foreground">
						{config.tempo} BPM
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">Key</label>
					<div className="flex gap-2">
						<Select
							value={config.keySignature}
							onValueChange={handleKeySignatureChange}
						>
							<SelectTrigger className="w-[70px]">
								<SelectValue placeholder="Key" />
							</SelectTrigger>
							<SelectContent>
								{[
									'C',
									'D',
									'E',
									'F',
									'G',
									'A',
									'B',
									'Ab',
									'Bb',
									'Db',
									'Eb',
									'Gb',
								].map((key) => (
									<SelectItem key={key} value={key}>
										{key}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select
							value={config.scaleType}
							onValueChange={handleScaleTypeChange}
						>
							<SelectTrigger className="w-[100px]">
								<SelectValue placeholder="Scale" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="major">Major</SelectItem>
								<SelectItem value="lydian">Lydian (#4)</SelectItem>
								<SelectItem value="mixolydian">Mixolydian (b7)</SelectItem>
								<SelectItem value="dorian">Dorian (b3 b7)</SelectItem>
								<SelectItem value="minor">Minor</SelectItem>
								<SelectItem value="phrygian">Phrygian (min b2)</SelectItem>
								<SelectItem value="locrian">Locrian (min b2 b5)</SelectItem>
								<SelectItem value="blues">Blues (b5)</SelectItem>
								<SelectItem value="harmonic-minor">
									Harmonic Minor (min #7)
								</SelectItem>
								<SelectItem value="melodic-minor">
									Melodic Minor (min #6 #7)
								</SelectItem>
								<SelectItem value="diminished">Diminished</SelectItem>
								<SelectItem value="augmented">Augmented</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Time Signature Control */}
				<div className="space-y-2">
					<label className="text-sm font-medium">Time</label>
					<Select
						value={config.timeSignature}
						onValueChange={handleTimeSignatureChange}
					>
						<SelectTrigger>
							<SelectValue placeholder="Time Signature" />
						</SelectTrigger>
						<SelectContent>
							{[
								'1/4',
								'2/4',
								'3/4',
								'4/4',
								'5/4',
								'6/8',
								'7/8',
								'8/8',
								'9/8',
								'11/8',
								'12/8',
							].map((time) => (
								<SelectItem key={time} value={time}>
									{time}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
};
