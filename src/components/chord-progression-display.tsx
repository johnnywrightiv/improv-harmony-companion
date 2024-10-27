import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import {
	updateChord,
	addChord,
	moveChord,
	deleteChord,
} from '@/store/session-slice';
import { RootState } from '@/store/store';

interface Chord {
	name: string;
	tones: string[];
	romanNumeral: string;
}

const COMMON_CHORDS: Chord[] = [
	{ name: 'C', tones: ['C', 'E', 'G'], romanNumeral: 'I' },
	{ name: 'Dm', tones: ['D', 'F', 'A'], romanNumeral: 'ii' },
	{ name: 'Em', tones: ['E', 'G', 'B'], romanNumeral: 'iii' },
	{ name: 'F', tones: ['F', 'A', 'C'], romanNumeral: 'IV' },
	{ name: 'G', tones: ['G', 'B', 'D'], romanNumeral: 'V' },
	{ name: 'Am', tones: ['A', 'C', 'E'], romanNumeral: 'vi' },
	{ name: 'Bdim', tones: ['B', 'D', 'F'], romanNumeral: 'vii°' },
];

export default function ChordProgressionDisplay() {
	const dispatch = useDispatch();
	const chords = useSelector(
		(state: RootState) => state.sessions.config.chords
	);
	const currentChordIndex = useSelector(
		(state: RootState) => state.sessions.config.currentChordIndex
	);
	const [editingChordIndex, setEditingChordIndex] = useState<number | null>(
		null
	);

	const handleEditChord = (index: number) => {
		setEditingChordIndex(index);
	};

	const handleSaveChord = (index: number, updatedChord: Chord) => {
		dispatch(updateChord({ index, chord: updatedChord }));
		setEditingChordIndex(null);
	};

	const handleAddChord = (chord: Chord) => {
		dispatch(addChord(chord));
	};

	const handleMoveChord = (index: number, direction: 'left' | 'right') => {
		dispatch(moveChord({ index, direction }));
	};

	const handleDeleteChord = (index: number) => {
		dispatch(deleteChord(index));
	};

	const handleChordClick = (chord: Chord) => {
		alert(`Chord: ${chord.name}`);
	};

	return (
		<div className="flex flex-wrap justify-center gap-2 p-2 sm:p-4">
			{chords.map((chord, index) => (
				<div key={index} className="mb-6">
					{editingChordIndex === index ? (
						<ChordEditForm
							chord={chord}
							onSave={(updatedChord) => handleSaveChord(index, updatedChord)}
							onCancel={() => setEditingChordIndex(null)}
						/>
					) : (
						<div className="relative">
							<ChordBlock
								chord={chord}
								isActive={index === currentChordIndex}
								onClick={() => handleChordClick(chord)}
							/>
							<ChordActionsMenu
								onEdit={() => handleEditChord(index)}
								onDelete={() => handleDeleteChord(index)}
							/>
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
							{chord.name} ({chord.romanNumeral})
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
