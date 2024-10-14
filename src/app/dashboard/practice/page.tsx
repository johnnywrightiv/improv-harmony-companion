'use client'; //needed for open config props with useEffect

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { RootState } from '@/store/store';
import PracticeConfig from '@/components/practice-config';
import PracticeSession from '@/components/practice-session';
import RecentSessions from '@/components/recent-sessions';
import { Button } from '@/components/ui/button';

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
	const [isConfigOpen, setIsConfigOpen] = React.useState(false);
	const playbackStatus = useSelector(
		(state: RootState) => state.playback.status
	);
	const searchParams = useSearchParams();

	useEffect(() => {
		if (searchParams.get('config') === 'open') {
			setIsConfigOpen(true);
		}
	}, [searchParams]);

	const handleConfigOpen = () => {
		setIsConfigOpen(true);
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
		</div>
	);
};

export default Practice;
