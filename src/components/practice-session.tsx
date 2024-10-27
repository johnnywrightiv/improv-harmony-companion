import React from 'react';
import { PlaybackControlsBar } from '@/components/playback-controls-bar';
import { MusicalControlsBar } from '@/components/musical-controls-bar';
import SessionConfig from '@/components/session-config-window';
import SessionReviewModal from '@/components/session-review-modal';
import ChordProgressionDisplay from '@/components/chord-progression-display';
import ScaleDisplay from './scale-display';
import { Card } from './ui/card';
import { useMetronome } from '@/lib/hooks/useMetronome';

interface PracticeSessionProps {}

const PracticeSession: React.FC<PracticeSessionProps> = () => {
	useMetronome();
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
		{ note: 'B', degree: 'vii°', isChordTone: false },
	];

	const scaleRelative = [
		{ note: 'A', degree: 'i', isChordTone: false },
		{ note: 'B', degree: 'ii°', isChordTone: false },
		{ note: 'C', degree: 'III', isChordTone: true },
		{ note: 'D', degree: 'iv', isChordTone: false },
		{ note: 'E', degree: 'v', isChordTone: true },
		{ note: 'F', degree: 'IV', isChordTone: false },
		{ note: 'G', degree: 'V', isChordTone: true },
	];

	return (
		<Card>
			<div className="">
				<div className="h-auto items-center justify-center rounded-[--radius] border border-border">
					<MusicalControlsBar />
					<div className="mt-8">
						<ChordProgressionDisplay
							chords={chords}
							currentChordIndex={currentChordIndex}
						/>
					</div>
					<div className="justify-center">
						<div className="flex items-center justify-center">
							<h3 className="text-sm font-semibold sm:text-xl">C Major</h3>
							<ScaleDisplay
								scale={scale}
								currentChord={chords[currentChordIndex].name}
							/>
						</div>
						<div className="mb-2 flex items-center justify-center">
							<h3 className="text-sm font-semibold sm:text-xl">A Minor</h3>
							<ScaleDisplay
								scale={scaleRelative}
								currentChord={chords[currentChordIndex].name}
							/>
						</div>
					</div>

					<PlaybackControlsBar
						onConfigOpen={() => setIsConfigOpen(true)}
						onReviewOpen={() => setIsReviewOpen(true)}
						onSaveLoop={handleSaveLoop}
					/>
				</div>
			</div>

			<SessionConfig
				initialOpen={isConfigOpen}
				onOpenChange={setIsConfigOpen}
			/>

			<SessionReviewModal
				isOpen={isReviewOpen}
				onClose={() => setIsReviewOpen(false)}
				hideControls={true}
			/>
		</Card>
	);
};

export default PracticeSession;
