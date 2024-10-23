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
		<div className="flex flex-wrap justify-center p-1 sm:gap-2 sm:p-4">
			{scale.map((note, index) => (
				<button
					key={index}
					onClick={() => alert(`Note: ${note.note}`)}
					className={`flex flex-col items-center justify-between rounded-lg p-1 sm:p-2 
            ${note.isChordTone ? 'bg-card' : ''}
            transition-all duration-150 hover:outline hover:outline-2 hover:outline-foreground`}
				>
					<div
						className={`text-base font-semibold sm:text-lg 
              ${note.isChordTone ? 'text-primary' : ''}`}
					>
						{note.note}
					</div>
					<div className="text-xs text-muted-foreground sm:text-sm">
						{note.degree}
					</div>
				</button>
			))}
		</div>
	);
};

export default ScaleDisplay;