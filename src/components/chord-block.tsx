import React from 'react';
import { Button } from '@/components/ui/button';

interface Chord {
	name: string;
	tones: string[];
	romanNumeral?: string;
}

interface ChordBlockProps {
	chord: Chord;
	isActive: boolean;
	onClick: () => void;
	children?: React.ReactNode;
}

export const ChordBlock: React.FC<ChordBlockProps> = ({
	chord,
	isActive,
	onClick,
	children,
}) => (
	<div className="relative">
		<Button
			onClick={onClick}
			variant="secondary"
			className={`flex h-28 w-28 min-w-[120px] flex-col items-center justify-between rounded-[--radius] p-4
        ${isActive ? 'border-2 border-primary bg-primary hover:bg-primary' : 'border border-border'} 
        hover:outline-foreground transition-all duration-150 hover:outline hover:outline-2`}
		>
			<div className="text-xl font-bold sm:text-2xl">{chord.name}</div>
			<div className="flex gap-1">
				{chord.tones.map((tone, index) => (
					<Button
						key={index}
						variant="ghost"
						size="sm"
						className="h-6 min-w-[24px] px-1 text-xs hover:border hover:border-foreground bg-transparent"
						onClick={(e) => {
							e.stopPropagation(); // Prevent triggering parent chord button click
              alert(`Chord Tone: ${chord.tones[index]}`);
						}}
					>
						{tone}
					</Button>
				))}
      </div>
      <div className="text-xs opacity-50">{chord.romanNumeral}</div>
		</Button>
		{children}
	</div>
);
