// components/session-review-modal.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RootState } from '@/store/store';
import { saveSessionReview } from '@/store/session-review-slice';
import { Save } from 'lucide-react';

interface SessionReviewModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const SessionReviewModal: React.FC<SessionReviewModalProps> = ({
	isOpen,
	onClose,
}) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const practiceConfig = useSelector(
		(state: RootState) => state.practiceConfig
	);
	const practiceDuration = useSelector(
		(state: RootState) => state.timer.practiceDuration
	);
	const [rating, setRating] = useState<number>(0);
	const [comments, setComments] = useState<string>('');

	const handleSave = () => {
		dispatch(
			saveSessionReview({
				rating,
				comments,
				...practiceConfig,
				practiceDuration,
			})
		);
		alert(`${practiceConfig.sessionName} session saved`);
	};

	const emojis = ['😞', '😐', '🙂', '😊', '😃'];

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex items-center justify-between">
						Session Review
						<Button size="sm" onClick={handleSave}>
							<Save className="mr-2 h-4 w-4" /> Save
						</Button>
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<div>
						<h3 className="mb-2">Rate your session:</h3>
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
						<h3 className="mb-2">Session comments:</h3>
						<Textarea
							value={comments}
							onChange={(e) => setComments(e.target.value)}
							placeholder="How was your practice session?"
						/>
					</div>
					<div>
						<h3 className="mb-2">Session details:</h3>
						<ul>
							<li>Key Signature: {practiceConfig.keySignature}</li>
							<li>Time Signature: {practiceConfig.timeSignature}</li>
							<li>Tempo: {practiceConfig.tempo} BPM</li>
							<li>Session Name: {practiceConfig.sessionName}</li>
							<li>
								Duration: {Math.floor(practiceDuration / 60)}:
								{(practiceDuration % 60).toString().padStart(2, '0')}
							</li>
						</ul>
					</div>
				</div>
				<DialogFooter>
					<Button onClick={() => router.push('/dashboard')}>
						Back to Dashboard
					</Button>
					<Button onClick={() => router.push('/dashboard/progress')}>
						Review Progress
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default SessionReviewModal;
