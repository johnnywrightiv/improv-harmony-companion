// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Slider } from '@/components/ui/slider';
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from '@/components/ui/select';
// import { updateConfig } from '@/store/session-slice';
// import { RootState } from '@/store/store';

// export const MusicalControlsBar: React.FC = () => {
// 	const dispatch = useDispatch();
// 	const { config } = useSelector((state: RootState) => state.sessions);

// 	const handleTempoChange = (value: number[]) => {
// 		dispatch(updateConfig({ tempo: value[0] }));
// 	};

// 	const handleKeySignatureChange = (value: string) => {
// 		dispatch(updateConfig({ keySignature: value }));
// 	};

// 	const handleScaleTypeChange = (value: string) => {
// 		dispatch(updateConfig({ scaleType: value }));
// 	};

// 	const handleTimeSignatureChange = (value: string) => {
// 		dispatch(updateConfig({ timeSignature: value }));
// 	};

// 	return (
// 		<div className="flex flex-col gap-4 rounded-[--radius] bg-secondary/50 p-4 sm:flex-row sm:items-start sm:justify-between">
// 			{/* Key Signature section */}
// 			<div className="flex flex-col items-center sm:items-start">
// 				<label className="mb-2 text-sm text-muted-foreground">
// 					Key Signature
// 				</label>
// 				<div className="flex gap-2">
// 					<Select
// 						value={config.keySignature}
// 						onValueChange={handleKeySignatureChange}
// 					>
// 						<SelectTrigger className="w-[70px]">
// 							<SelectValue placeholder="Key" />
// 						</SelectTrigger>
// 						<SelectContent>
// 							{[
// 								'C',
// 								'D',
// 								'E',
// 								'F',
// 								'G',
// 								'A',
// 								'B',
// 								'Ab',
// 								'Bb',
// 								'Db',
// 								'Eb',
// 								'Gb',
// 							].map((key) => (
// 								<SelectItem key={key} value={key}>
// 									{key}
// 								</SelectItem>
// 							))}
// 						</SelectContent>
// 					</Select>
// 					<Select
// 						value={config.scaleType}
// 						onValueChange={handleScaleTypeChange}
// 					>
// 						<SelectTrigger className="w-[100px]">
// 							<SelectValue placeholder="Scale" />
// 						</SelectTrigger>
// 						<SelectContent>
// 							<SelectItem value="major">Major</SelectItem>
// 							<SelectItem value="lydian">Lydian (#4)</SelectItem>
// 							<SelectItem value="mixolydian">Mixolydian (b7)</SelectItem>
// 							<SelectItem value="dorian">Dorian (b3 b7)</SelectItem>
// 							<SelectItem value="minor">Minor</SelectItem>
// 							<SelectItem value="phrygian">Phrygian (min b2)</SelectItem>
// 							<SelectItem value="locrian">Locrian (min b2 b5)</SelectItem>
// 							<SelectItem value="blues">Blues (b5)</SelectItem>
// 							<SelectItem value="harmonic-minor">
// 								Harmonic Minor (min #7)
// 							</SelectItem>
// 							<SelectItem value="melodic-minor">
// 								Melodic Minor (min #6 #7)
// 							</SelectItem>
// 							<SelectItem value="diminished">Diminished</SelectItem>
// 							<SelectItem value="augmented">Augmented</SelectItem>
// 						</SelectContent>
// 					</Select>
// 				</div>
// 			</div>

// 			{/* Time Signature section */}
// 			<div className="flex flex-col items-center">
// 				<label className="mb-2 text-sm text-muted-foreground">
// 					Time Signature
// 				</label>
// 				<Select
// 					value={config.timeSignature}
// 					onValueChange={handleTimeSignatureChange}
// 				>
// 					<SelectTrigger className="w-[80px]">
// 						<SelectValue placeholder="Time" />
// 					</SelectTrigger>
// 					<SelectContent>
// 						{[
// 							'1/4',
// 							'2/4',
// 							'3/4',
// 							'4/4',
// 							'5/4',
// 							'6/8',
// 							'7/8',
// 							'8/8',
// 							'9/8',
// 							'11/8',
// 							'12/8',
// 						].map((time) => (
// 							<SelectItem key={time} value={time}>
// 								{time}
// 							</SelectItem>
// 						))}
// 					</SelectContent>
// 				</Select>
// 			</div>

// 			{/* Tempo section */}
// 			<div className="flex w-full flex-col items-center gap-2 sm:w-[250px]">
// 				<label className="text-sm text-muted-foreground">Tempo</label>
// 				<Slider
// 					value={[config.tempo]}
// 					min={40}
// 					max={208}
// 					step={1}
// 					onValueChange={handleTempoChange}
// 				/>
// 				<div className="text-sm text-muted-foreground">{config.tempo} BPM</div>
// 			</div>
// 		</div>
// 	);
// };

// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Slider } from '@/components/ui/slider';
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from '@/components/ui/select';
// import { updateConfig } from '@/store/session-slice';
// import { RootState } from '@/store/store';

// export const MusicalControlsBar: React.FC = () => {
// 	const dispatch = useDispatch();
// 	const { config } = useSelector((state: RootState) => state.sessions);

// 	const handleTempoChange = (value: number[]) => {
// 		dispatch(updateConfig({ tempo: value[0] }));
// 	};

// 	const handleKeySignatureChange = (value: string) => {
// 		dispatch(updateConfig({ keySignature: value }));
// 	};

// 	const handleScaleTypeChange = (value: string) => {
// 		dispatch(updateConfig({ scaleType: value }));
// 	};

// 	const handleTimeSignatureChange = (value: string) => {
// 		dispatch(updateConfig({ timeSignature: value }));
// 	};

// 	return (
// 		<div className="flex flex-col p-4 pr-2 items-center gap-8 bg-secondary/50 sm:flex-row sm:justify-center sm:gap-16">
// 			{/* Key Signature section */}
// 			<div className="flex flex-col items-center">
// 				<label className="mb-2 text-sm font-medium text-muted-foreground">
// 					Key Signature
// 				</label>
// 				<div className="flex gap-2">
// 					<Select
// 						value={config.keySignature}
// 						onValueChange={handleKeySignatureChange}
// 					>
// 						<SelectTrigger className="w-[70px]">
// 							<SelectValue placeholder="Key" />
// 						</SelectTrigger>
// 						<SelectContent>
// 							{[
// 								'C',
// 								'D',
// 								'E',
// 								'F',
// 								'G',
// 								'A',
// 								'B',
// 								'Ab',
// 								'Bb',
// 								'Db',
// 								'Eb',
// 								'Gb',
// 							].map((key) => (
// 								<SelectItem key={key} value={key}>
// 									{key}
// 								</SelectItem>
// 							))}
// 						</SelectContent>
// 					</Select>
// 					<Select
// 						value={config.scaleType}
// 						onValueChange={handleScaleTypeChange}
// 					>
// 						<SelectTrigger className="w-[100px]">
// 							<SelectValue placeholder="Scale" />
// 						</SelectTrigger>
// 						<SelectContent>
// 							<SelectItem value="major">Major</SelectItem>
// 							<SelectItem value="lydian">Lydian (#4)</SelectItem>
// 							<SelectItem value="mixolydian">Mixolydian (b7)</SelectItem>
// 							<SelectItem value="dorian">Dorian (b3 b7)</SelectItem>
// 							<SelectItem value="minor">Minor</SelectItem>
// 							<SelectItem value="phrygian">Phrygian (min b2)</SelectItem>
// 							<SelectItem value="locrian">Locrian (min b2 b5)</SelectItem>
// 							<SelectItem value="blues">Blues (b5)</SelectItem>
// 							<SelectItem value="harmonic-minor">
// 								Harmonic Minor (min #7)
// 							</SelectItem>
// 							<SelectItem value="melodic-minor">
// 								Melodic Minor (min #6 #7)
// 							</SelectItem>
// 							<SelectItem value="diminished">Diminished</SelectItem>
// 							<SelectItem value="augmented">Augmented</SelectItem>
// 						</SelectContent>
// 					</Select>
// 				</div>
// 			</div>

// 			{/* Time Signature section */}
// 			<div className="flex flex-col items-center">
// 				<label className="mb-2 text-sm font-medium text-muted-foreground">
// 					Time Signature
// 				</label>
// 				<Select
// 					value={config.timeSignature}
// 					onValueChange={handleTimeSignatureChange}
// 				>
// 					<SelectTrigger className="w-[80px]">
// 						<SelectValue placeholder="Time" />
// 					</SelectTrigger>
// 					<SelectContent>
// 						{[
// 							'1/4',
// 							'2/4',
// 							'3/4',
// 							'4/4',
// 							'5/4',
// 							'6/8',
// 							'7/8',
// 							'8/8',
// 							'9/8',
// 							'11/8',
// 							'12/8',
// 						].map((time) => (
// 							<SelectItem key={time} value={time}>
// 								{time}
// 							</SelectItem>
// 						))}
// 					</SelectContent>
// 				</Select>
// 			</div>

// 			{/* Tempo section */}
// 			<div className="flex flex-col items-center">
// 				<label className="mb-2 text-sm font-medium text-muted-foreground">
// 					Tempo
// 				</label>
// 				<div className="w-[200px]">
// 					<Slider
// 						value={[config.tempo]}
// 						min={40}
// 						max={208}
// 						step={1}
// 						onValueChange={handleTempoChange}
// 					/>
// 				</div>
// 				<div className="mt-2 text-sm text-muted-foreground">
// 					{config.tempo} BPM
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Slider } from '@/components/ui/slider';
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from '@/components/ui/select';
// import { updateConfig } from '@/store/session-slice';
// import { RootState } from '@/store/store';

// export const MusicalControlsBar: React.FC = () => {
// 	const dispatch = useDispatch();
// 	const { config } = useSelector((state: RootState) => state.sessions);

// 	const handleTempoChange = (value: number[]) => {
// 		dispatch(updateConfig({ tempo: value[0] }));
// 	};

// 	const handleKeySignatureChange = (value: string) => {
// 		dispatch(updateConfig({ keySignature: value }));
// 	};

// 	const handleScaleTypeChange = (value: string) => {
// 		dispatch(updateConfig({ scaleType: value }));
// 	};

// 	const handleTimeSignatureChange = (value: string) => {
// 		dispatch(updateConfig({ timeSignature: value }));
// 	};

// 	return (
// 		<div className="flex flex-col items-center gap-6">
// 			{/* Selects Row */}
// 			<div className="flex w-full items-center gap-6 flex-row justify-center">
// 				{/* Key Signature section */}
// 				<div className="flex flex-col items-center">
// 					<label className="mb-2 text-sm font-medium text-muted-foreground">
// 						Key Signature
// 					</label>
// 					<div className="flex gap-2">
// 						<Select
// 							value={config.keySignature}
// 							onValueChange={handleKeySignatureChange}
// 						>
// 							<SelectTrigger className="w-[70px]">
// 								<SelectValue placeholder="Key" />
// 							</SelectTrigger>
// 							<SelectContent>
// 								{[
// 									'C',
// 									'D',
// 									'E',
// 									'F',
// 									'G',
// 									'A',
// 									'B',
// 									'Ab',
// 									'Bb',
// 									'Db',
// 									'Eb',
// 									'Gb',
// 								].map((key) => (
// 									<SelectItem key={key} value={key}>
// 										{key}
// 									</SelectItem>
// 								))}
// 							</SelectContent>
// 						</Select>
// 						<Select
// 							value={config.scaleType}
// 							onValueChange={handleScaleTypeChange}
// 						>
// 							<SelectTrigger className="w-[100px]">
// 								<SelectValue placeholder="Scale" />
// 							</SelectTrigger>
// 							<SelectContent>
// 								<SelectItem value="major">Major</SelectItem>
// 								<SelectItem value="lydian">Lydian (#4)</SelectItem>
// 								<SelectItem value="mixolydian">Mixolydian (b7)</SelectItem>
// 								<SelectItem value="dorian">Dorian (b3 b7)</SelectItem>
// 								<SelectItem value="minor">Minor</SelectItem>
// 								<SelectItem value="phrygian">Phrygian (min b2)</SelectItem>
// 								<SelectItem value="locrian">Locrian (min b2 b5)</SelectItem>
// 								<SelectItem value="blues">Blues (b5)</SelectItem>
// 								<SelectItem value="harmonic-minor">
// 									Harmonic Minor (min #7)
// 								</SelectItem>
// 								<SelectItem value="melodic-minor">
// 									Melodic Minor (min #6 #7)
// 								</SelectItem>
// 								<SelectItem value="diminished">Diminished</SelectItem>
// 								<SelectItem value="augmented">Augmented</SelectItem>
// 							</SelectContent>
// 						</Select>
// 					</div>
// 				</div>

// 				{/* Time Signature section */}
// 				<div className="flex flex-col items-center">
// 					<label className="mb-2 text-sm font-medium text-muted-foreground">
// 						Time Signature
// 					</label>
// 					<Select
// 						value={config.timeSignature}
// 						onValueChange={handleTimeSignatureChange}
// 					>
// 						<SelectTrigger className="w-[80px]">
// 							<SelectValue placeholder="Time" />
// 						</SelectTrigger>
// 						<SelectContent>
// 							{[
// 								'1/4',
// 								'2/4',
// 								'3/4',
// 								'4/4',
// 								'5/4',
// 								'6/8',
// 								'7/8',
// 								'8/8',
// 								'9/8',
// 								'11/8',
// 								'12/8',
// 							].map((time) => (
// 								<SelectItem key={time} value={time}>
// 									{time}
// 								</SelectItem>
// 							))}
// 						</SelectContent>
// 					</Select>
// 				</div>
// 			</div>

// 			{/* Tempo section */}
// 			<div className="flex flex-col items-center">
// 				<label className="mb-2 text-sm font-medium text-muted-foreground">
// 					Tempo
// 				</label>
// 				<div className="w-[200px]">
// 					<Slider
// 						value={[config.tempo]}
// 						min={40}
// 						max={208}
// 						step={1}
// 						onValueChange={handleTempoChange}
// 					/>
// 				</div>
// 				<div className="mt-2 text-sm text-muted-foreground">
// 					{config.tempo} BPM
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

import React from 'react';
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

export const MusicalControlsBar: React.FC = () => {
	const dispatch = useDispatch();
	const { config } = useSelector((state: RootState) => state.sessions);

	const handleTempoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		if (value >= 40 && value <= 208) {
			dispatch(updateConfig({ tempo: value }));
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
		<div className="bg-secondary/50 p-8 flex items-center justify-evenly gap-6">
			{/* Time Signature section */}
			<div className="flex flex-col items-center">
				<label className="mb-2 text-sm font-medium text-muted-foreground">
					Time Signature
				</label>
				<Select
					value={config.timeSignature}
					onValueChange={handleTimeSignatureChange}
				>
					<SelectTrigger className="w-[80px]">
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

			{/* Key Signature section */}
			<div className="flex flex-col items-center">
				<label className="mb-2 text-sm font-medium text-muted-foreground">
					Key Signature
				</label>
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

			{/* Tempo section */}
			<div className="flex flex-col items-center pl-2">
				<label className="mb-2 pr-12 text-sm font-medium text-muted-foreground">
					Tempo
				</label>
				<div className="flex items-center gap-2">
					<input
						type="number"
						min="40"
						max="208"
						value={config.tempo}
						onChange={handleTempoChange}
						className="w-[80px] rounded-md border border-input bg-popover px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
					/>
					<span className="text-sm text-muted-foreground">BPM</span>
				</div>
			</div>
		</div>
	);
};

export default MusicalControlsBar;