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
		<div className="flex justify-center space-x-2 p-4">
			{chords.map((chord, index) => (
				<div
					key={index}
					className={`flex w-[120px] flex-col items-center justify-between rounded-[--radius] p-4 ${
						index === currentChordIndex
							? 'border-2 border-primary bg-primary'
							: 'border border-border'
					}`}
				>
					<div className="text-2xl font-bold">{chord.name}</div>
					<div className="text-sm text-muted-foreground">
						(
						{chord.tones.map((tone, i) => (
							<span
								key={i}
								className={index === currentChordIndex ? 'text-card-foreground font-bold' : ''}
							>
								{tone}
								{i < chord.tones.length - 1 ? ' ' : ''}
							</span>
						))}
						)
					</div>
					<div className="mt-2 text-lg font-semibold">{chord.romanNumeral}</div>
				</div>
			))}
		</div>
	);
};

export default ChordProgressionDisplay;