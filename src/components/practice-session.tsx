import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Timer } from '@/components/timer';
import { PlaybackControls } from '@/components/playback-controls';
import SessionReviewModal from '@/components/session-review-modal';

interface PracticeSessionProps {}

const PracticeSession: React.FC<PracticeSessionProps> = () => {
	const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
	const timerStatus = useSelector((state: RootState) => state.timer.status);
	const playbackStatus = useSelector(
		(state: RootState) => state.playback.status
	);

	useEffect(() => {
		if (timerStatus === 'stopped' && playbackStatus === 'stopped') {
			setIsReviewModalOpen(true);
		}
	}, [timerStatus, playbackStatus]);

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
			<SessionReviewModal
				isOpen={isReviewModalOpen}
				onClose={() => setIsReviewModalOpen(false)}
			/>
		</div>
	);
};

export default PracticeSession;
