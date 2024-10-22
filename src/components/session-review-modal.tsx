import React, { useState } from 'react';
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
import {
	updateSessionComments
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

	const [rating, setRating] = useState<number>(0);

	const formatDuration = (duration: number): string => {
		const minutes = Math.floor(duration / 60);
		const seconds = duration % 60;
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	};

	const emojis = ['😞', '😐', '🙂', '😊', '😃'];

	const handleCommentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(updateSessionComments(e.target.value));
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Session Comments</DialogTitle>
					<DialogDescription>
						Rate your session and take comments on your progress.
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4">
					<div>
						<h3 className="mb-2">Rate Your Session:</h3>
						<div className="flex justify-between">
							{emojis.map((emoji, index) => (
								<Button
									key={index}
									variant={rating === index + 1 ? 'default' : 'outline'}
									onClick={() => setRating(index + 1)}
									className="text-2xl"
								>
									{emoji}
								</Button>
							))}
						</div>
					</div>
					<div>
						<h3 className="mb-2">Session Comments:</h3>
						<Textarea
							value={config.sessionComments}
							onChange={handleCommentsChange}
							placeholder="How was your practice session?"
							rows={6}
						/>
					</div>

					{completedSession && (
						<div>
							<h3 className="mb-2">Session Details:</h3>
							<ul>
								<li>Key Signature: {completedSession.keySignature}</li>
								<li>Time Signature: {completedSession.timeSignature}</li>
								<li>Tempo: {completedSession.tempo} BPM</li>
								<li>Session Name: {completedSession.sessionName}</li>
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
