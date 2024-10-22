import React from 'react';

interface ScaleNote {
	note: string;
	degree: string;
	isChordTone: boolean;
}

interface ScaleDisplayProps {
	scale: ScaleNote[];
	currentChord: string;
}

const ScaleDisplay: React.FC<ScaleDisplayProps> = ({ scale, currentChord }) => {
	return (
		<div className="flex justify-center space-x-2 p-4">
			{scale.map((note, index) => (
				<div
					key={index}
					className={`flex flex-col items-center justify-between rounded-lg p-2 ${
						note.isChordTone ? 'bg-card' : ''
					}`}
				>
					<div
						className={`text-lg font-semibold ${note.isChordTone ? 'text-primary' : ''}`}
					>
						{note.note}
					</div>
					<div className="text-sm text-muted-foreground">{note.degree}</div>
				</div>
			))}
		</div>
	);
};

export default ScaleDisplay;
