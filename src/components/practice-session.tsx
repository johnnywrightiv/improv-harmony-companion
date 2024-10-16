import React from 'react';
import { Timer } from '@/components/timer';
import { PlaybackControls } from '@/components/playback-controls';

interface PracticeSessionProps {}

const PracticeSession: React.FC<PracticeSessionProps> = () => {
	return (
		<div className="space-y-4 rounded-[--radius] border p-4">
			<h2>Practice Session (Active)</h2>
			<div className="space-y-4">
				<div className="flex h-40 items-center justify-center rounded bg-secondary">
					Visual Feedback Section
					{/* Add chord progressions, highlighting, etc. here */}
				</div>
				<div className="flex justify-center">
					<Timer />
				</div>
				<div className="flex justify-center">
					<PlaybackControls />
				</div>
			</div>
		</div>
	);
};

export default PracticeSession;
