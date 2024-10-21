import React from 'react';
import { Timer } from '@/components/timer';
import { PlaybackControls } from '@/components/playback-controls';
import PracticeConfig from '@/components/practice-config-window';
import SessionReviewModal from '@/components/session-review-modal';

interface PracticeSessionProps {}

const PracticeSession: React.FC<PracticeSessionProps> = () => {
	const [isConfigOpen, setIsConfigOpen] = React.useState(false);
	const [isReviewOpen, setIsReviewOpen] = React.useState(false);

	const handleSaveSession = () => {
		// We'll implement the actual save logic later
		alert('Saving loop...');
	};

	return (
		<div className="space-y-4 rounded-[--radius] border p-4">
			<h2>Practice Session (Active)</h2>
			<div className="space-y-4">
				<div className="h-auto items-center justify-center rounded-[--radius] border border-border bg-primary/10 ">
					<h3 className="m-10 flex justify-center">Visual Feedback Section</h3>
					{/* Add chord progressions, highlighting, etc. here */}
					<div className="mb-4 flex justify-center">
						<Timer />
					</div>
					<div className="flex justify-center">
						<PlaybackControls
							onConfigOpen={() => setIsConfigOpen(true)}
							onReviewOpen={() => setIsReviewOpen(true)}
							onSaveSession={handleSaveSession}
						/>
					</div>
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
		</div>
	);
};

export default PracticeSession;
