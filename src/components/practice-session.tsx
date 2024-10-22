import React from 'react';
import { Timer } from '@/components/timer';
import { PlaybackControlsBar } from '@/components/playback-controls-bar';
import { MusicalControlsBar } from '@/components/musical-controls-bar';
import PracticeConfig from '@/components/practice-config-window';
import SessionReviewModal from '@/components/session-review-modal';
import ChordProgressionDisplay from '@/components/chord-progression-display';
import ScaleDisplay from './scales-display';
import TimerProgress from './timer-progress';

interface PracticeSessionProps {}

const PracticeSession: React.FC<PracticeSessionProps> = () => {
	const [isConfigOpen, setIsConfigOpen] = React.useState(false);
	const [isReviewOpen, setIsReviewOpen] = React.useState(false);
	const [currentChordIndex, setCurrentChordIndex] = React.useState(0);

	const handleSaveLoop = () => {
		// We'll implement the actual save logic later
		alert('Saving loop...');
	};

	const chords = [
		{ name: 'C', tones: ['C', 'E', 'G'], romanNumeral: 'I' },
		{ name: 'F', tones: ['F', 'A', 'C'], romanNumeral: 'IV' },
		{ name: 'G7 ', tones: ['G', 'B', 'D', 'F'], romanNumeral: 'V7' },
		{ name: 'Em', tones: ['E', 'G', 'B'], romanNumeral: 'iii' },
	];

	const scale = [
		{ note: 'C', degree: 'I', isChordTone: true },
		{ note: 'D', degree: 'ii', isChordTone: false },
		{ note: 'E', degree: 'iii', isChordTone: true },
		{ note: 'F', degree: 'IV', isChordTone: false },
		{ note: 'G', degree: 'V', isChordTone: true },
		{ note: 'A', degree: 'vi', isChordTone: false },
		{ note: 'B', degree: 'vii*', isChordTone: false },
	];

	return (
		<>
			<div className="space-y-4">
				<div className="h-auto items-center justify-center rounded-[--radius] border border-border bg-secondary p-4">
					<MusicalControlsBar />
					<div className="my-6">
						<h3 className="mb-4 text-center text-xl font-semibold">
							Chord Progression
						</h3>
						<ChordProgressionDisplay
							chords={chords}
							currentChordIndex={currentChordIndex}
						/>
					</div>
					<div className="my-6 flex justify-center">
						<h3 className="items-center mb-4 flex text-center text-xl font-semibold">C Major Scale</h3>
							<ScaleDisplay
								scale={scale}
								currentChord={chords[currentChordIndex].name}
							/>
					</div>
					<TimerProgress />
					<PlaybackControlsBar
						onConfigOpen={() => setIsConfigOpen(true)}
						onReviewOpen={() => setIsReviewOpen(true)}
						onSaveLoop={handleSaveLoop}
					/>
				</div>
			</div>

			<PracticeConfig
				initialOpen={isConfigOpen}
				onOpenChange={setIsConfigOpen}
			/>

			<SessionReviewModal
				isOpen={isReviewOpen}
				onClose={() => setIsReviewOpen(false)}
				hideControls={true}
			/>
		</>
	);
};

export default PracticeSession;