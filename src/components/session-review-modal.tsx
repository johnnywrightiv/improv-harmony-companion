'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
	updateConfig,
	updateSessionComments,
	updateSessionRating,
} from '@/store/session-slice';

interface SessionReviewModalProps {
	isOpen: boolean;
	onClose: () => void;
	hideControls?: boolean;
}

const SessionReviewModal: React.FC<SessionReviewModalProps> = ({
	isOpen,
	onClose,
	hideControls = false,
}) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { completedSession, config } = useSelector(
		(state: RootState) => state.sessions
	);

	useEffect(() => {
		if (completedSession) {
			dispatch(updateConfig({ sessionName: completedSession.sessionName }));
		}
	}, [completedSession, dispatch]);

	const formatDuration = (duration: number): string => {
		const minutes = Math.floor(duration / 60);
		const seconds = duration % 60;
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	};

	const emojis = ['😞', '😐', '🙂', '😊', '😃'];

	const handleCommentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(updateSessionComments(e.target.value));
	};

	const handleSessionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateConfig({ sessionName: e.target.value }));
	};

	const handleRatingChange = (newRating: number) => {
		dispatch(updateSessionRating(newRating));
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Session Review</DialogTitle>
					<DialogDescription>
						Rate your session and take comments on your progress.
					</DialogDescription>
				</DialogHeader>
				<div>
					<Input
						value={config.sessionName}
						onChange={handleSessionNameChange}
						placeholder="Session Name"
						className="mb-4"
					/>
					<div>
						Rate Your Session:
						<div className="mb-4 mt-2 flex justify-between">
							{emojis.map((emoji, index) => (
								<button
									key={index}
									onClick={() => handleRatingChange(index + 1)}
									className={`text-2xl ${config.sessionRating === index + 1 ? 'border-2 border-primary' : ''} rounded-full p-1`}
								>
									{emoji}
								</button>
							))}
						</div>
					</div>
					<div>
						Session Comments:
						<Textarea
							value={config.sessionComments}
							onChange={handleCommentsChange}
							className="mt-2"
						/>
					</div>
					{completedSession && (
						<div>
							<h3 className="mb-2">Session Details:</h3>
							<ul>
								<li>
									Key Signature:{' '}
									{`${completedSession.keySignature} ${config.scaleType.charAt(0).toUpperCase() + config.scaleType.slice(1)}`}
								</li>
								<li>Time Signature: {completedSession.timeSignature}</li>
								<li>Tempo: {completedSession.tempo} BPM</li>
								<li>
									Duration: {formatDuration(completedSession.practiceDuration)}
								</li>
							</ul>
						</div>
					)}
				</div>
				{!hideControls && (
					<DialogFooter>
						<div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
							<Button
								variant="outline"
								onClick={() => router.push('/dashboard')}
							>
								Back to Home
							</Button>
							<Button onClick={() => router.push('/dashboard/progress')}>
								Review Progress
							</Button>
						</div>
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default SessionReviewModal;
