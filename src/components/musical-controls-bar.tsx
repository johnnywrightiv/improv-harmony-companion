import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { updateConfig } from '@/store/session-slice';
import { RootState } from '@/store/store';
import TimerProgress from './timer-progress';

export const MusicalControlsBar: React.FC = () => {
	const dispatch = useDispatch();
	const { config } = useSelector((state: RootState) => state.sessions);
	const [tempTempo, setTempTempo] = useState(config.tempo.toString());

	useEffect(() => {
		setTempTempo(config.tempo.toString());
	}, [config.tempo]);

	const handleTempoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		setTempTempo(inputValue);

		const value = parseInt(inputValue);
		if (!isNaN(value) && value >= 40 && value <= 208) {
			dispatch(updateConfig({ tempo: value }));
		}
	};

	const handleTempoBlur = () => {
		const value = parseInt(tempTempo);
		if (isNaN(value) || value < 40) {
			setTempTempo('40');
			dispatch(updateConfig({ tempo: 40 }));
		} else if (value > 208) {
			setTempTempo('208');
			dispatch(updateConfig({ tempo: 208 }));
		}
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
		<div className="rounded-[--radius] bg-background/50">
			<div className="mb-2 flex min-w-0 flex-row flex-nowrap items-start justify-between overflow-x-auto py-6 sm:px-6 md:items-center md:justify-evenly">
				{/* Time Signature section */}
				<div className="flex shrink-0 flex-col items-center">
					<label className="mb-2 whitespace-nowrap text-xs font-medium text-muted-foreground md:text-sm">
						Time Signature
					</label>
					<Select
						value={config.timeSignature}
						onValueChange={handleTimeSignatureChange}
					>
						<SelectTrigger className="w-[70px] md:w-[80px]">
							<SelectValue placeholder="Time" />
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
								'9/8',
								'11/8',
								'13/8',
							].map((time) => (
								<SelectItem key={time} value={time}>
									{time}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				{/* Key Signature section */}
				<div className="flex shrink-0 flex-col items-center">
					<label className="mb-2 whitespace-nowrap text-xs font-medium text-muted-foreground md:text-sm">
						Key Signature
					</label>
					<div className="flex gap-1 md:gap-2">
						<Select
							value={config.keySignature}
							onValueChange={handleKeySignatureChange}
						>
							<SelectTrigger className="w-[60px] md:w-[70px]">
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
							<SelectTrigger className="w-[60px] sm:w-[180px]">
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
								<SelectItem value="blues">Blues (min b5)</SelectItem>
								<SelectItem value="harmonic-minor">
									Harmonic Minor (min #7)
								</SelectItem>
								<SelectItem value="melodic-minor">
									Melodic Minor (min #6 #7)
								</SelectItem>
								<SelectItem value="diminished">Diminished (min b5)</SelectItem>
								<SelectItem value="augmented">Augmented (#5)</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				{/* Tempo section */}
				<div className="flex shrink-0 flex-col items-center">
					<label className="mb-2 whitespace-nowrap text-center text-xs font-medium text-muted-foreground md:text-sm">
						Tempo
					</label>
					<div className="mx-2 flex items-center gap-1 md:gap-2">
						<input
							type="text"
							inputMode="numeric"
							pattern="[0-9]*"
							min="40"
							max="208"
							value={tempTempo}
							onChange={handleTempoChange}
							onBlur={handleTempoBlur}
							className="w-[60px] rounded-md border border-input bg-card px-2 py-2 text-sm md:w-[80px] md:px-3"
						/>
						<span className="hidden text-xs text-muted-foreground sm:block md:text-sm">
							BPM
						</span>
					</div>
				</div>
			</div>
			<TimerProgress />
		</div>
	);
};

export default MusicalControlsBar;
