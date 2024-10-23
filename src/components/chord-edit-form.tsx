import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Chord {
	name: string;
	tones: string[];
}

interface ChordEditFormProps {
	chord: Chord;
	onChange: (updates: Partial<Chord>) => void;
	onSave: () => void;
}

export const ChordEditForm: React.FC<ChordEditFormProps> = ({
	chord,
	onChange,
	onSave,
}) => (
  <>
	<div className="flex min-w-[90px] sm:w-[120px] flex-col items-center justify-start pt-3 rounded-[--radius] border border-border px-2 py-1">
		<Input
			value={chord.name}
			onChange={(e) => onChange({ name: e.target.value })}
			className="text-center text-2xl font-bold"
			placeholder="Chord name"
		/>
		<Input
			value={chord.tones.join(', ')}
			onChange={(e) =>
				onChange({ tones: e.target.value.split(',').map((t) => t.trim()) })
			}
			className="text-center h-2 mt-1"
			placeholder="C, E, G"
		/>
			<Button className='h-6 mt-2' variant="default" onClick={onSave}>
				Save
			</Button>
    </div>
    <div className="flex justify-center">
    </div>
  </>
);
