import React from 'react';
import ProgressOverview from '@/components/progress-overview';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import placeholderData from '@/data/placeholder-data.json';

export default function Practice() {
	const userData = placeholderData.users[0];

	return (
		<div className="space-y-8">
			<ProgressOverview />
			<h4 className='text-center'>Calendar Component Here?</h4>
			<Card>
				<CardHeader>
					<h2 className="">Practice Stats</h2>
				</CardHeader>
				<CardContent className="grid grid-cols-3 gap-4">
					<div>
						<p className="text-2xl font-bold">{userData.stats.totalSessions}</p>
						<p className="text-sm text-muted-foreground">Total Sessions</p>
					</div>
					<div>
						<p className="text-2xl font-bold">{userData.stats.totalLoops}</p>
						<p className="text-sm text-muted-foreground">Total Loops</p>
					</div>
					<div>
						<p className="text-2xl font-bold">
							{userData.stats.avgSessionDuration}
						</p>
						<p className="text-sm text-muted-foreground">
							Avg. Session Duration
						</p>
					</div>
				</CardContent>
			</Card>
			{/* Add any additional practice-specific content here */}
		</div>
	);
}
