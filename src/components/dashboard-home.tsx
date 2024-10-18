import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import RecentSessions from '@/components/recent-sessions';
import { Settings } from 'lucide-react';
import placeholderData from '@/data/placeholder-data.json';
import {
	updateConfig,
	setTimerMode,
	setTimerStatus,
	setTimerDuration,
} from '@/store/session-slice';
import ProgressOverview from './progress-overview';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const DashboardHome = () => {
	const userData = placeholderData.users[0];
	const router = useRouter();
	const dispatch = useDispatch();

	const handleQuickStart = () => {
		dispatch(updateConfig({ isActive: true }));
		dispatch(setTimerMode('stopwatch'));
		dispatch(setTimerStatus('playing'));
		dispatch(setTimerDuration(0));
		router.push('/dashboard/practice');
	};

	const handleNewSession = () => {
		router.push('/dashboard/practice?config=open');
	};
	return (
		<div className="mx-auto w-full max-w-6xl space-y-8">
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
			<ProgressOverview />
			{/* Button Container */}
			<div className="flex w-full flex-col gap-4 sm:flex-row">
				<Button onClick={handleQuickStart} size="lg" className="w-full">
					Quick Start
				</Button>
				<Button
					onClick={handleNewSession}
					variant="outline"
					size="lg"
					className="w-full"
				>
					New Session
				</Button>
			</div>

			{/* Main content */}
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
				{/* Left column */}
				<div className="space-y-6 lg:col-span-2">
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
				</div>

				{/* Right column */}
				<div className="space-y-6 lg:col-span-2">
					<RecentSessions />
				</div>
			</div>
		</div>
	);
};

export default DashboardHome;
