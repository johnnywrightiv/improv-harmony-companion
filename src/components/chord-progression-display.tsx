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
					className={`flex flex-col items-center justify-between rounded-lg p-4 w-[120px] ${
						index === currentChordIndex
							? 'border-2 border-primary bg-secondary'
							: 'border border-border'
					}`}
				>
					<div className="text-2xl font-bold">{chord.name}</div>
					<div className="text-sm text-muted-foreground">
						({chord.tones.join(' ')})
					</div>
					<div className="mt-2 text-lg font-semibold">{chord.romanNumeral}</div>
				</div>
			))}
		</div>
	);
};

export default ChordProgressionDisplay;
