// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import { RootState } from '@/store/store';
// import { saveSessionReview } from '@/store/session-review-slice';
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogFooter,
// 	DialogDescription,
// } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import { Save } from 'lucide-react';

// interface SessionReviewModalProps {
// 	isOpen: boolean;
// 	onClose: () => void;
// 	sessionDuration: number;
// }

// const SessionReviewModal: React.FC<SessionReviewModalProps> = ({
// 	isOpen,
// 	onClose,
// 	sessionDuration,
// }) => {
// 	const dispatch = useDispatch();
// 	const router = useRouter();
// 	const config = useSelector(
// 		(state: RootState) => state.practiceSession.config
// 	);
// 	const [rating, setRating] = useState<number>(0);
// 	const [comments, setComments] = useState<string>('');

// 	const handleSave = () => {
// 		dispatch(
// 			saveSessionReview({
// 				rating,
// 				comments,
// 				...config,
// 				practiceDuration: sessionDuration,
// 			})
// 		);
// 		alert(`${config.sessionName} session saved`);
// 		onClose();
// 	};

// 	const formatDuration = (duration: number): string => {
// 		const minutes = Math.floor(duration / 60);
// 		const seconds = duration % 60;
// 		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
// 	};

// 	const emojis = ['😞', '😐', '🙂', '😊', '😃'];

// 	return (
// 		<Dialog open={isOpen} onOpenChange={onClose}>
// 			<DialogContent aria-describedby="session review modal">
// 				<DialogHeader>
// 					<DialogTitle className="flex items-center justify-between">
// 						Session Review
// 						<Button size="sm" onClick={handleSave}>
// 							<Save className="mr-2 h-4 w-4" /> Save
// 						</Button>
// 					</DialogTitle>
// 					<DialogDescription>
// 						Update your progress, rate your session, take notes, or save your
// 						loop.
// 					</DialogDescription>
// 				</DialogHeader>
// 				<div className="space-y-4">
// 					<div>
// 						<h3 className="mb-2">Rate your session:</h3>
// 						<div className="flex justify-between">
// 							{emojis.map((emoji, index) => (
// 								<Button
// 									key={index}
// 									variant={rating === index + 1 ? 'default' : 'outline'}
// 									onClick={() => setRating(index + 1)}
// 									className="text-2xl"
// 								>
// 									{emoji}
// 								</Button>
// 							))}
// 						</div>
// 					</div>
// 					<div>
// 						<h3 className="mb-2">Session comments:</h3>
// 						<Textarea
// 							value={comments}
// 							onChange={(e) => setComments(e.target.value)}
// 							placeholder="How was your practice session?"
// 						/>
// 					</div>
// 					<div>
// 						<h3 className="mb-2">Session details:</h3>
// 						<ul>
// 							<li>Key Signature: {config.keySignature}</li>
// 							<li>Time Signature: {config.timeSignature}</li>
// 							<li>Tempo: {config.tempo} BPM</li>
// 							<li>Session Name: {config.sessionName}</li>
// 							<li>Duration: {formatDuration(sessionDuration)}</li>
// 						</ul>
// 					</div>
// 				</div>
// 				<DialogFooter>
// 					<div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
// 						<Button variant="outline" onClick={() => router.push('/dashboard')}>
// 							Back to Home
// 						</Button>
// 						<Button onClick={() => router.push('/dashboard/progress')}>
// 							Review Progress
// 						</Button>
// 					</div>
// 				</DialogFooter>
// 			</DialogContent>
// 		</Dialog>
// 	);
// };

// export default SessionReviewModal;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';
import { saveSessionReview } from '@/store/session-review-slice';
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
	const config = useSelector(
		(state: RootState) => state.practiceSession.config
	);
	const practiceDuration = useSelector(
		(state: RootState) => state.practiceSession.timer.practiceDuration
	);
	const [rating, setRating] = useState<number>(0);
	const [comments, setComments] = useState<string>('');

	const handleSave = () => {
		dispatch(
			saveSessionReview({
				rating,
				comments,
				...config,
				practiceDuration,
			})
		);
		alert(`${config.sessionName} session saved`);
		onClose();
	};

	const formatDuration = (duration: number): string => {
		const minutes = Math.floor(duration / 60);
		const seconds = duration % 60;
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	};

	const emojis = ['😞', '😐', '🙂', '😊', '😃'];

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent aria-describedby="session review modal">
				<DialogHeader>
					<DialogTitle className="flex items-center justify-between">
						Session Review
						<Button size="sm" onClick={handleSave}>
							<Save className="mr-2 h-4 w-4" /> Save
						</Button>
					</DialogTitle>
					<DialogDescription>
						Update your progress, rate your session, take notes, or save your
						loop.
					</DialogDescription>
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
							<li>Key Signature: {config.keySignature}</li>
							<li>Time Signature: {config.timeSignature}</li>
							<li>Tempo: {config.tempo} BPM</li>
							<li>Session Name: {config.sessionName}</li>
							<li>Duration: {formatDuration(practiceDuration)}</li>
						</ul>
					</div>
				</div>
				<DialogFooter>
					<div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
						<Button variant="outline" onClick={() => router.push('/dashboard')}>
							Back to Home
						</Button>
						<Button onClick={() => router.push('/dashboard/progress')}>
							Review Progress
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default SessionReviewModal;
