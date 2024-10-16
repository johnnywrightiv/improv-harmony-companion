'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { RootState } from '@/store/store';
import PracticeConfig from '@/components/practice-config-window';
import PracticeSession from '@/components/practice-session';
import RecentSessions from '@/components/recent-sessions';
import SessionReviewModal from '@/components/session-review-modal';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogDescription,
} from '@/components/ui/dialog';
import {
	setTimerStatus,
	resetSession,
	updateConfig,
} from '@/store/practice-session-slice';

interface PracticeSessionPlaceholderProps {}

const PracticeSessionPlaceholder: React.FC<
	PracticeSessionPlaceholderProps
> = () => (
	<div className="space-y-4 rounded-[--radius] border p-4">
		<h2>Practice Session (Inactive)</h2>
		<div className="space-y-2">
			<div className="flex h-40 items-center justify-center rounded bg-secondary">
				PracticeSession Placeholder
			</div>
		</div>
	</div>
);

const Practice: React.FC = () => {
	const [isConfigOpen, setIsConfigOpen] = useState(false);
	const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
	const [isLogSessionPromptOpen, setIsLogSessionPromptOpen] = useState(false);
	const { playback, timer, config } = useSelector(
		(state: RootState) => state.practiceSession
	);
	const dispatch = useDispatch();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (searchParams.get('config') === 'open') {
			setIsConfigOpen(true);
		}
	}, [searchParams]);

	useEffect(() => {
		if (playback.status === 'playing' || timer.status === 'playing') {
			dispatch(updateConfig({ isActive: true }));
		}
	}, [playback.status, timer.status, dispatch]);

	useEffect(() => {
		if (
			config.isActive &&
			playback.status === 'stopped' &&
			timer.status === 'stopped'
		) {
			if (timer.practiceDuration > 0) {
				dispatch(updateConfig({ sessionDuration: timer.practiceDuration }));
			}
			setIsLogSessionPromptOpen(true);
			dispatch(setTimerStatus('stopped'));
			dispatch(updateConfig({ isActive: false }));
		}
	}, [
		config.isActive,
		playback.status,
		timer.status,
		timer.practiceDuration,
		dispatch,
	]);

	const handleConfigOpen = () => {
		setIsConfigOpen(true);
	};

	const handleLogSessionPromptClose = (willLog: boolean) => {
		setIsLogSessionPromptOpen(false);
		if (willLog) {
			setIsReviewModalOpen(true);
		} else {
			dispatch(resetSession());
		}
	};

	const handleReviewClose = () => {
		setIsReviewModalOpen(false);
		dispatch(resetSession());
	};

	return (
		<div className="grid gap-4">
			{playback.status === 'playing' || playback.status === 'paused' ? (
				<PracticeSession />
			) : (
				<>
					<PracticeSessionPlaceholder />
					<div className="flex justify-center space-y-4">
						<Button onClick={handleConfigOpen}>Open Session Config</Button>
						<PracticeConfig
							initialOpen={isConfigOpen}
							onOpenChange={setIsConfigOpen}
						/>
					</div>
					<RecentSessions />
				</>
			)}
			<SessionReviewModal
				isOpen={isReviewModalOpen}
				onClose={handleReviewClose}
			/>
			{isLogSessionPromptOpen && (
				<Dialog
					open={isLogSessionPromptOpen}
					onOpenChange={() => handleLogSessionPromptClose(false)}
				>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								Session Complete! - Update your progress?
							</DialogTitle>
							<DialogDescription>
								Log sessions to contribute to your progress and to save your
								loops.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
								<Button
									variant="outline"
									onClick={() => handleLogSessionPromptClose(false)}
								>
									No
								</Button>
								<Button onClick={() => handleLogSessionPromptClose(true)}>
									Yes
								</Button>
							</div>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
};

export default Practice;
