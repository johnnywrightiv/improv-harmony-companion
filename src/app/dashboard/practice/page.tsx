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
} from '@/components/ui/dialog';
import { setPlaybackStatus } from '@/store/playback-slice';

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
	const playbackStatus = useSelector(
		(state: RootState) => state.playback.status
	);
	const { status: timerStatus } = useSelector(
		(state: RootState) => state.timer
	);
	const dispatch = useDispatch();
	const searchParams = useSearchParams();
	// const router = useRouter();

	useEffect(() => {
		if (searchParams.get('config') === 'open') {
			setIsConfigOpen(true);
		}
	}, [searchParams]);

	useEffect(() => {
		if (playbackStatus === 'stopped' && timerStatus === 'stopped') {
			setIsLogSessionPromptOpen(true);
			dispatch(setPlaybackStatus('stopped'));
		}
	}, [playbackStatus, timerStatus, dispatch]);

	const handleConfigOpen = () => {
		setIsConfigOpen(true);
	};

	const handleLogSessionPromptClose = (willLog: boolean) => {
		setIsLogSessionPromptOpen(false);
		if (willLog) {
			setIsReviewModalOpen(true);
		} else {
			// router.push('/dashboard');
		}
	};

	const handleReviewClose = () => {
		setIsReviewModalOpen(false);
	};

	return (
		<div className="grid gap-4">
			{playbackStatus === 'playing' || playbackStatus === 'paused' ? (
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
							<DialogTitle>Would you like to log this session?</DialogTitle>
						</DialogHeader>
						<DialogFooter>
							<Button onClick={() => handleLogSessionPromptClose(false)}>
								No
							</Button>
							<Button onClick={() => handleLogSessionPromptClose(true)}>
								Yes
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
};

export default Practice;
