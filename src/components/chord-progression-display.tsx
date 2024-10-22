import React from 'react';

interface Chord {
	name: string;
	tones: string[];
	romanNumeral: string;
}

interface ChordProgressionDisplayProps {
	chords: Chord[];
	currentChordIndex: number;
}

const ChordProgressionDisplay: React.FC<ChordProgressionDisplayProps> = ({
	chords,
	currentChordIndex,
}) => {
	return (
		<div className="flex flex-wrap justify-center gap-2 p-2 sm:p-4">
			{chords.map((chord, index) => (
				<div
					key={index}
					className={`flex min-w-[90px] flex-col items-center justify-between rounded-[--radius] p-2 sm:w-[120px] sm:p-4 ${
						index === currentChordIndex
							? 'border-2 border-primary bg-primary'
							: 'border border-border'
					}`}
				>
					<div className="text-xl font-bold sm:text-2xl">{chord.name}</div>
					<div className="text-xs text-muted-foreground sm:text-sm">
						(
						{chord.tones.map((tone, i) => (
							<span
								key={i}
								className={
									index === currentChordIndex
										? 'font-bold text-card-foreground'
										: ''
								}
							>
								{tone}
								{i < chord.tones.length - 1 ? ' ' : ''}
							</span>
						))}
						)
					</div>
					<div className="mt-1 text-base font-semibold sm:mt-2 sm:text-lg">
						{chord.romanNumeral}
					</div>
				</div>
			))}
		</div>
	);
};

export default ChordProgressionDisplay;
