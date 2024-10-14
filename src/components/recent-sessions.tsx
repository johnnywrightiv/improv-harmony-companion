import React from 'react';

// Import placeholder data
import placeholderData from '@/data/placeholder-data.json';

// Import icons from lucide-react
import { Music } from 'lucide-react';

import Link from 'next/link';

const RecentSessions = () => {
	const userData = placeholderData.users[0]; // Assuming we're using the first user

	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold">Recent Loops</h2>
			{userData.recentLoops.map((loop) => (
				<Link
					href={`/loops/${loop.id}`}
					key={loop.id}
					className="flex items-center space-x-4 rounded-[--radius] p-2 hover:bg-secondary"
				>
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
						<Music className="h-6 w-6 text-background" />
					</div>
					<div className="flex-grow">
						<p className="font-medium">{loop.name}</p>
						<p className="text-sm text-muted-foreground">{loop.duration}</p>
					</div>
				</Link>
			))}
		</div>
	);
};

export default RecentSessions;
