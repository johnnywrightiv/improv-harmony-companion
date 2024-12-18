'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SessionConfig from '@/components/session-config-window';
import PracticeSession from '@/components/practice-session';
import PracticeSessionPlaceholder from '@/components/practice-session-placeholder';
import SavedLoops from '@/components/saved-loops';
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
	updateConfig,
	resetSession,
	clearCompletedSession,
	completeSession,
} from '@/store/session-slice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux-hooks';

const PracticePage: React.FC = () => {
	const [isConfigOpen, setIsConfigOpen] = useState(false);
	const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
	const [isLogSessionPromptOpen, setIsLogSessionPromptOpen] = useState(false);
	const { playback, timer, config } = useAppSelector((state) => state.sessions);
	const dispatch = useAppDispatch();
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
			dispatch(completeSession());
			setIsLogSessionPromptOpen(true);
		}
	}, [config.isActive, playback.status, timer.status, dispatch]);

	const handleConfigOpen = () => {
		setIsConfigOpen(true);
	};

	const handleLogSessionPromptClose = (willLog: boolean) => {
		setIsLogSessionPromptOpen(false);
		if (willLog) {
			setIsReviewModalOpen(true);
		} else {
			dispatch(resetSession());
			dispatch(clearCompletedSession());
		}
	};

	const handleReviewClose = () => {
		setIsReviewModalOpen(false);
		dispatch(resetSession());
		dispatch(clearCompletedSession());
	};

	return (
		<div className="grid gap-4">
			{playback.status === 'playing' || playback.status === 'paused' ? (
				<>
					<PracticeSession />
					<SavedLoops />
				</>
			) : (
				<>
					<div className="relative">
						<PracticeSessionPlaceholder />
						<div className="absolute inset-0 flex items-center justify-center rounded-[--radius] bg-popover/60">
							{/* bg-muted-foreground/50 */}
							<Button onClick={handleConfigOpen}>Open Session Config</Button>
						</div>
					</div>
					<SessionConfig
						initialOpen={isConfigOpen}
						onOpenChange={setIsConfigOpen}
					/>
					<SavedLoops />
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
							<DialogTitle>Quick Session Review?</DialogTitle>
							<DialogDescription>
								Rate your practice and take notes on your progress
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

export default PracticePage;
