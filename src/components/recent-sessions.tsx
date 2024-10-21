'use client';

import React from 'react';
import { NotebookPen } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import placeholderData from '@/data/placeholder-data.json';
import ListItem from './list-item';

const RecentSessions = () => {
	const userData = placeholderData.users[0];
	const allSessions = placeholderData.sessions;

	const handleSessionClick = (sessionId: string) => {
		const session = allSessions.find((s) => s.sessionId === sessionId);
		if (session) {
			alert(`Session: ${session.name}`);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Recent Sessions</CardTitle>
				<CardDescription>Review your latest practice sessions</CardDescription>
			</CardHeader>
			<CardContent>
				{userData.stats.recentSessions.map((sessionId) => {
					const session = allSessions.find((s) => s.sessionId === sessionId);
					if (!session) return null;

					return (
						<ListItem
							key={sessionId}
							icon={NotebookPen}
							title={session.name}
							subtitle={`${Math.floor(session.duration / 60)} minutes`}
							onClick={() => handleSessionClick(sessionId)}
						/>
					);
				})}
			</CardContent>
		</Card>
	);
};

export default RecentSessions;
