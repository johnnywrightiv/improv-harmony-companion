import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Import icons from lucide-react
import { Settings, Music, Clock } from 'lucide-react';

// Import placeholder data
import placeholderData from '@/data/placeholder-data.json';

const DashboardHome = () => {
	const userData = placeholderData.users[0]; // Assuming we're using the first user

	return (
		<div className="mx-auto w-full max-w-6xl space-y-8 p-4">
			{/* Header */}
			<div className="flex items-center space-x-4">
				<Avatar className="h-16 w-16">
					<AvatarImage
						src={userData.profile.avatar}
						alt={userData.profile.displayName}
					/>
					<AvatarFallback>
						{userData.profile.displayName.charAt(0)}
					</AvatarFallback>
				</Avatar>
				<div>
					<h1 className="text-2xl font-bold text-primary">
						{userData.profile.displayName}
					</h1>
					<p className="text-muted-foreground">@{userData.username}</p>
				</div>
			</div>

			{/* Main content */}
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{/* Left column */}
				<div className="space-y-6 lg:col-span-2">
					<Card>
						<CardHeader>
							<h2 className="text-xl font-semibold">Stats</h2>
						</CardHeader>
						<CardContent className="grid grid-cols-3 gap-4">
							<div>
								<p className="text-2xl font-bold">
									{userData.stats.totalSessions}
								</p>
								<p className="text-sm text-muted-foreground">Total Sessions</p>
							</div>
							<div>
								<p className="text-2xl font-bold">
									{userData.stats.totalLoops}
								</p>
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
					<div className="space-y-4">
						<h2 className="text-xl font-semibold">Tools</h2>
						<div className="grid grid-cols-3 gap-4">
							<Button variant="secondary" className="h-16 border border-border">
								<Music className="mr-2 h-4 w-4" /> Loop Generator
							</Button>
							<Button variant="secondary" className="h-16 border border-border">
								<Clock className="mr-2 h-4 w-4" /> Metronome
							</Button>
							<Button variant="secondary" className="h-16 border border-border">
								<Music className="mr-2 h-4 w-4" /> Tuner
							</Button>
						</div>
					</div>
				</div>

				{/* Right column */}
				<div className="space-y-6">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<h2 className="text-sm font-medium">Quick Settings</h2>
							<Settings className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							{/* Add quick settings controls here */}
							<p className="text-sm text-muted-foreground">
								Adjust your preferences
							</p>
						</CardContent>
					</Card>
					<div className="space-y-4">
						<h2 className="text-xl font-semibold">Recent Loops</h2>
						{userData.recentLoops.map((loop) => (
							<Link
								href={`/loops/${loop.id}`}
								key={loop.id}
								className="flex items-center space-x-4 rounded-md p-2 hover:bg-secondary"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
									<Music className="h-6 w-6 text-background" />
								</div>
								<div className="flex-grow">
									<p className="font-medium">{loop.name}</p>
									<p className="text-sm text-muted-foreground">
										{loop.duration}
									</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardHome;
