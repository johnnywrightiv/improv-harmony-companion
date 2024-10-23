import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Plus, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChordBlock } from '@/components/chord-block';
import { ChordActionsMenu } from '@/components/chord-actions-menu';
import { ChordEditForm } from '@/components/chord-edit-form';

interface Chord {
	name: string;
	tones: string[];
}

interface ChordProgressionDisplayProps {
	chords: Chord[];
	currentChordIndex: number;
}

const COMMON_CHORDS: Chord[] = [
	{ name: 'C', tones: ['C', 'E', 'G'] },
	{ name: 'Dm', tones: ['D', 'F', 'A'] },
	{ name: 'Em', tones: ['E', 'G', 'B'] },
	{ name: 'F', tones: ['F', 'A', 'C'] },
	{ name: 'G', tones: ['G', 'B', 'D'] },
	{ name: 'Am', tones: ['A', 'C', 'E'] },
];

const ChordProgressionDisplay: React.FC<ChordProgressionDisplayProps> = ({
	chords,
	currentChordIndex,
}) => {
	const dispatch = useDispatch();
	const [editingChordIndex, setEditingChordIndex] = useState<number | null>(
		null
	);
	const [editingChord, setEditingChord] = useState<Chord | null>(null);

	const handleEditChord = (index: number) => {
		setEditingChordIndex(index);
		setEditingChord({ ...chords[index] });
	};

	const handleSaveChord = () => {
		if (editingChord && editingChordIndex !== null) {
			dispatch({
				type: 'session/updateChord',
				payload: { index: editingChordIndex, chord: editingChord },
			});
			setEditingChordIndex(null);
			setEditingChord(null);
		}
	};

	const handleAddChord = (chord: Chord) => {
		dispatch({ type: 'session/addChord', payload: chord });
	};

	const handleMoveChord = (index: number, direction: 'left' | 'right') => {
		dispatch({ type: 'session/moveChord', payload: { index, direction } });
	};

	const handleDeleteChord = (index: number) => {
		dispatch({ type: 'session/deleteChord', payload: index });
	};

	const handleSwapChord = (index: number) => {
		dispatch({ type: 'session/swapChord', payload: index });
	};

	const renderNavigationButtons = (index: number) => (
		<div className="absolute bottom-5 left-0 right-0 -mb-8 flex justify-center space-x-10">
			<Button
				variant="outline"
				size="sm"
				onClick={() => handleMoveChord(index, 'left')}
				className="h-6 w-6 rounded-full p-0"
				disabled={index === 0}
			>
				<ArrowLeft className="h-4 w-4" />
			</Button>
			<Button
				variant="outline"
				size="sm"
				onClick={() => handleMoveChord(index, 'right')}
				className="h-6 w-6 rounded-full p-0"
				disabled={index === chords.length - 1}
			>
				<ArrowRight className="h-4 w-4" />
			</Button>
		</div>
	);

	return (
		<div className="flex flex-wrap justify-center gap-2 p-2 sm:p-4">
			{chords.map((chord, index) => (
				<div key={index} className="mb-6">
					{editingChordIndex === index ? (
						<ChordEditForm
							chord={editingChord || chord}
							onChange={(updates) =>
								setEditingChord((prev) =>
									prev ? { ...prev, ...updates } : null
								)
							}
							onSave={handleSaveChord}
						/>
					) : (
						<div className="relative">
							<ChordBlock
								chord={chord}
								isActive={index === currentChordIndex}
								onClick={() =>
									alert(`Chord: ${chord.name}`)
								}
							/>
							<ChordActionsMenu
								onEdit={() => handleEditChord(index)}
								onSwap={() => handleSwapChord(index)}
								onDelete={() => handleDeleteChord(index)}
							/>
							{renderNavigationButtons(index)}
						</div>
					)}
				</div>
			))}

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="mb-6 flex h-auto min-w-[120px] flex-col items-center justify-center rounded-[--radius] border-dashed p-2 sm:p-4"
					>
						<Plus className="h-8 w-8" />
						<span className="mt-2 text-sm">Add Chord</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{COMMON_CHORDS.map((chord) => (
						<DropdownMenuItem
							key={chord.name}
							onClick={() => handleAddChord(chord)}
						>
							{chord.name}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default ChordProgressionDisplay;