import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Chord {
	name: string;
	tones: string[];
	romanNumeral: string;
}

interface ChordEditFormProps {
	chord: Chord;
	onSave: (updatedChord: Chord) => void;
	onCancel: () => void;
}

export const ChordEditForm: React.FC<ChordEditFormProps> = ({
	chord,
	onSave,
}) => {
	const [editedChord, setEditedChord] = useState<Chord>(chord);

	const handleChange = (field: keyof Chord, value: string) => {
		setEditedChord((prev) => ({
			...prev,
			[field]:
				field === 'tones' ? value.split(',').map((t) => t.trim()) : value,
		}));
	};

	return (
		<div className="flex min-w-[90px] flex-col items-center justify-start rounded-[--radius] border border-border px-2 py-1 pt-3 sm:w-[120px]">
			<Input
				value={editedChord.name}
				onChange={(e) => handleChange('name', e.target.value)}
				className="w-24 text-center text-2xl font-bold"
				placeholder="Chord name"
			/>
			<Input
				value={editedChord.tones.join(', ')}
				onChange={(e) => handleChange('tones', e.target.value)}
				className="mt-1 h-2 w-24 text-center"
				placeholder="C, E, G"
			/>
			<div className="mt-2 flex justify-center">
				<Button
					className="h-6"
					variant="default"
					onClick={() => onSave(editedChord)}
				>
					Save
				</Button>
			</div>
		</div>
	);
};
