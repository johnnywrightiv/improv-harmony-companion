// import React from 'react';
// import { useRouter } from 'next/navigation';
// import { useDispatch } from 'react-redux';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import {
// 	Card,
// 	CardHeader,
// 	CardContent,
// 	CardFooter,
// } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import RecentSessions from '@/components/recent-sessions';
// import { Settings, Drum, Guitar, Clock } from 'lucide-react';
// import placeholderData from '@/data/placeholder-data.json';
// import { setPlaybackStatus } from '@/store/playback-slice';
// import { setMode, setStatus, setDuration } from '@/store/timer-slice';
// import ProgressOverview from './progress-overview';

// const DashboardHome = () => {
// 	const userData = placeholderData.users[0];
// 	const router = useRouter();
// 	const dispatch = useDispatch();

// 	const handleQuickStart = () => {
// 		dispatch(setPlaybackStatus('playing'));
// 		dispatch(setMode('stopwatch'));
// 		dispatch(setStatus('playing'));
// 		dispatch(setDuration(0));
// 		router.push('/dashboard/practice');
// 	};
// 	const handleNewSession = () => {
// 		router.push('/dashboard/practice?config=open');
// 	};

// 	const handleMetronome = () => {
// 		dispatch(setPlaybackStatus('playing'));
// 		dispatch(setMode('stopwatch'));
// 		dispatch(setStatus('playing'));
// 		// Add any additional metronome-specific logic here
// 	};

// 	return (
// 		<div className="mx-auto w-full max-w-6xl space-y-8">
// 			{/* Header */}
// 			<div className="flex items-center space-x-4">
// 				<Avatar className="h-16 w-16">
// 					<AvatarImage
// 						src={userData.profile.avatar}
// 						alt={userData.profile.displayName}
// 					/>
// 					<AvatarFallback>
// 						{userData.profile.displayName.charAt(0)}
// 					</AvatarFallback>
// 				</Avatar>
// 				<div>
// 					<h1 className="text-2xl font-bold text-primary">
// 						{userData.profile.displayName}
// 					</h1>
// 					<p className="text-muted-foreground">@{userData.username}</p>
// 				</div>
// 			</div>
// 			<ProgressOverview />
// 			{/* Button Container */}
// 			<div className="flex w-full flex-col gap-4 sm:flex-row">
// 				<Button onClick={handleQuickStart} className="w-full sm:w-1/2">
// 					Quick Start
// 				</Button>
// 				<Button
// 					onClick={handleNewSession}
// 					variant="outline"
// 					className="w-full sm:w-1/2"
// 				>
// 					New Session
// 				</Button>
// 			</div>

// 			{/* Main content */}
// 			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
// 				{/* Left column */}
// 				<div className="space-y-6 lg:col-span-2">
// 					<Card>
// 						<CardHeader>
// 							<h2 className="">Practice</h2>
// 						</CardHeader>
// 						<CardContent className="grid grid-cols-3 gap-4">
// 							<div>
// 								<p className="text-2xl font-bold">
// 									{userData.stats.totalSessions}
// 								</p>
// 								<p className="text-sm text-muted-foreground">Total Sessions</p>
// 							</div>
// 							<div>
// 								<p className="text-2xl font-bold">
// 									{userData.stats.totalLoops}
// 								</p>
// 								<p className="text-sm text-muted-foreground">Total Loops</p>
// 							</div>
// 							<div>
// 								<p className="text-2xl font-bold">
// 									{userData.stats.avgSessionDuration}
// 								</p>
// 								<p className="text-sm text-muted-foreground">
// 									Avg. Session Duration
// 								</p>
// 							</div>
// 						</CardContent>
// 						<CardFooter>
// 							{/* Button Container */}
// 							<div className="flex w-full flex-col gap-4 sm:flex-row">
// 								<Button onClick={handleQuickStart} className="w-full sm:w-1/2">
// 									Quick Start
// 								</Button>
// 								<Button
// 									onClick={handleNewSession}
// 									variant="outline"
// 									className="w-full sm:w-1/2"
// 								>
// 									New Session
// 								</Button>
// 							</div>
// 						</CardFooter>
// 					</Card>
// 					<div className="space-y-4">
// 						<h2 className="text-xl font-semibold">Tools</h2>
// 						<div className="grid grid-cols-3 gap-4">
// 							<Button
// 								variant="secondary"
// 								className="h-16 border border-border"
// 								onClick={handleMetronome}
// 							>
// 								<Drum className="mr-2 h-4 w-4" /> Metronome
// 							</Button>
// 							<Button variant="secondary" className="h-16 border border-border">
// 								<Clock className="mr-2 h-4 w-4" /> Timer
// 							</Button>
// 							<Button variant="secondary" className="h-16 border border-border">
// 								<Guitar className="mr-2 h-4 w-4" /> Tuner
// 							</Button>
// 						</div>
// 					</div>
// 				</div>

// 				{/* Right column */}
// 				<div className="space-y-6">
// 					<Card>
// 						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// 							<h2 className="text-sm font-medium">Quick Settings</h2>
// 							<Settings className="h-4 w-4 text-muted-foreground" />
// 						</CardHeader>
// 						<CardContent>
// 							{/* Add quick settings controls here */}
// 							<p className="text-sm text-muted-foreground">
// 								Adjust your preferences
// 							</p>
// 						</CardContent>
// 					</Card>
// 					<RecentSessions />
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default DashboardHome;

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import RecentSessions from '@/components/recent-sessions';
import { Settings, Drum, Guitar, Clock } from 'lucide-react';
import placeholderData from '@/data/placeholder-data.json';
import { setPlaybackStatus } from '@/store/playback-slice';
import { setMode, setStatus, setDuration } from '@/store/timer-slice';
import ProgressOverview from './progress-overview';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const DashboardHome = () => {
	const userData = placeholderData.users[0];
	const router = useRouter();
	const dispatch = useDispatch();

	const handleQuickStart = () => {
		dispatch(setPlaybackStatus('playing'));
		dispatch(setMode('stopwatch'));
		dispatch(setStatus('playing'));
		dispatch(setDuration(0));
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
				<Button onClick={handleQuickStart} className="w-full sm:w-1/2">
					Quick Start
				</Button>
				<Button
					onClick={handleNewSession}
					variant="outline"
					className="w-full sm:w-1/2"
				>
					New Session
				</Button>
			</div>

			{/* Main content */}
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{/* Left column */}
				<div className="space-y-6 lg:col-span-2">
					{/* Tools section remains unchanged */}
					<div className="space-y-4">
						<h2 className="text-xl font-semibold">Tools</h2>
						<div className="grid grid-cols-3 gap-4">
							<Button
								variant="secondary"
								className="h-16 border border-border"
								onClick={() => {
									dispatch(setPlaybackStatus('playing'));
									dispatch(setMode('stopwatch'));
									dispatch(setStatus('playing'));
								}}
							>
								<Drum className="mr-2 h-4 w-4" /> Metronome
							</Button>
							<Button variant="secondary" className="h-16 border border-border">
								<Clock className="mr-2 h-4 w-4" /> Timer
							</Button>
							<Button variant="secondary" className="h-16 border border-border">
								<Guitar className="mr-2 h-4 w-4" /> Tuner
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
					<RecentSessions />
				</div>
			</div>
		</div>
	);
};

export default DashboardHome;