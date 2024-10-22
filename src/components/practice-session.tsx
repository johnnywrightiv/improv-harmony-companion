// import React from 'react';
// import { Timer } from '@/components/timer';
// import { PlaybackControlsBar } from '@/components/playback-controls-bar';
// import { MusicalControlsBar } from '@/components/musical-controls-bar';
// import PracticeConfig from '@/components/practice-config-window';
// import SessionReviewModal from '@/components/session-review-modal';

// interface PracticeSessionProps {}

// const PracticeSession: React.FC<PracticeSessionProps> = () => {
// 	const [isConfigOpen, setIsConfigOpen] = React.useState(false);
// 	const [isReviewOpen, setIsReviewOpen] = React.useState(false);

// 	const handleSaveLoop = () => {
// 		// We'll implement the actual save logic later
// 		alert('Saving loop...');
// 	};

// 	return (
// 		<div className="space-y-4 rounded-[--radius] border p-4">
// 			<h2>Practice Session (Active)</h2>
// 			<div className="space-y-4">
// 				<div className="h-auto items-center justify-center rounded-[--radius] border border-border bg-card-foreground/20 ">
// 					<MusicalControlsBar />
// 					<h3 className="m-10 flex justify-center">Visual Feedback Section</h3>
// 					{/* Add chord progressions, highlighting, etc. here */}
// 					<div className="mb-4 flex justify-center">
// 						<Timer />
// 					</div>
// 						<PlaybackControlsBar
// 							onConfigOpen={() => setIsConfigOpen(true)}
// 							onReviewOpen={() => setIsReviewOpen(true)}
// 							onSaveLoop={handleSaveLoop}
// 						/>
// 					<div className="flex justify-center">
// 					</div>
// 				</div>
// 			</div>

// 			<PracticeConfig
// 				initialOpen={isConfigOpen}
// 				onOpenChange={setIsConfigOpen}
// 			/>

// 			<SessionReviewModal
// 				isOpen={isReviewOpen}
// 				onClose={() => setIsReviewOpen(false)}
// 				hideControls={true}
// 			/>
// 		</div>
// 	);
// };

// export default PracticeSession;

import React from 'react'
import { Timer } from '@/components/timer'
import { PlaybackControlsBar } from '@/components/playback-controls-bar'
import { MusicalControlsBar } from '@/components/musical-controls-bar'
import PracticeConfig from '@/components/practice-config-window'
import SessionReviewModal from '@/components/session-review-modal'
import ChordProgressionDisplay from '@/components/chord-progression-display'

interface PracticeSessionProps {}

const PracticeSession: React.FC<PracticeSessionProps> = () => {
  const [isConfigOpen, setIsConfigOpen] = React.useState(false)
  const [isReviewOpen, setIsReviewOpen] = React.useState(false)
  const [currentChordIndex, setCurrentChordIndex] = React.useState(0)

  const handleSaveLoop = () => {
    // We'll implement the actual save logic later
    alert('Saving loop...')
  }

  const chords = [
    { name: 'C', tones: ['C', 'E', 'G'], romanNumeral: 'I' },
    { name: 'F', tones: ['F', 'A', 'C'], romanNumeral: 'IV' },
    { name: 'G7', tones: ['G', 'B', 'D', 'F'], romanNumeral: 'V7' },
    { name: 'Em', tones: ['E', 'G', 'B'], romanNumeral: 'iii' },
  ]

  return (
		<>
			<div className="space-y-4">
				<div className="h-auto items-center justify-center rounded-[--radius] border border-border bg-card-foreground/20 ">
          <MusicalControlsBar />
          <div className="my-6">
            <h3 className="text-xl text-center font-semibold mb-4">Chord Progression</h3>
            <ChordProgressionDisplay chords={chords} currentChordIndex={currentChordIndex} />
          </div>
          <div className="mb-4 flex justify-center">
            <Timer />
          </div>
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
  )
}

export default PracticeSession