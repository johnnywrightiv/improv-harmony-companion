'use client';

import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { ArrowUp, ArrowDown } from 'lucide-react';
import RecentSessions from '@/components/recent-sessions';
import {
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Bar,
	ComposedChart,
} from 'recharts';
import ProgressOverview from '@/components/progress-overview';
import SetPracticeGoalDialog from '@/components/set-practice-goal';
import placeholderData from '@/data/placeholder-data.json';

// Helper component for trend indicators
const TrendIndicator: React.FC<{ isPositive: boolean; value: string }> = ({
	isPositive,
	value,
}) => (
	<div className="flex items-center space-x-1">
		{isPositive ? (
			<ArrowUp className="h-4 w-4 text-success" />
		) : (
			<ArrowDown className="h-4 w-4 text-destructive" />
		)}
		<span className={isPositive ? 'text-success' : 'text-destructive'}>
			{value}%
		</span>
	</div>
);

const ProgressPage = () => {
	const user = placeholderData.users[0];
	const userSessions = placeholderData.sessions.filter(
		(session) => session.userId === user.id
	);

	// Calculate total stats (all-time)
	const totalStats = {
		sessions: userSessions.length,
		practiceTime: userSessions.reduce(
			(sum, session) => sum + session.duration / 60,
			0
		),
		avgSession:
			userSessions.length > 0
				? userSessions.reduce(
						(sum, session) => sum + session.duration / 60,
						0
					) / userSessions.length
				: 0,
	};

	// Calculate weekly trends
	const getWeekStats = (daysAgo: number) => {
		const now = new Date();
		const startDate = new Date(now.setDate(now.getDate() - daysAgo));

		return userSessions
			.filter((session) => new Date(session.date) >= startDate)
			.reduce(
				(stats, session) => ({
					sessions: stats.sessions + 1,
					practiceTime: stats.practiceTime + session.duration / 60,
				}),
				{ sessions: 0, practiceTime: 0 }
			);
	};

	// Get current week and previous week stats
	const currentWeek = getWeekStats(7);
	const previousWeek = getWeekStats(14);
	previousWeek.sessions -= currentWeek.sessions;
	previousWeek.practiceTime -= currentWeek.practiceTime;

	// Calculate week-over-week trends
	const calculateTrend = (current: number, previous: number) => {
		if (previous === 0) return 0;
		return Math.round(((current - previous) / previous) * 100);
	};

	const trends = {
		sessions: calculateTrend(currentWeek.sessions, previousWeek.sessions),
		practiceTime: calculateTrend(
			currentWeek.practiceTime,
			previousWeek.practiceTime
		),
		avgSession: calculateTrend(
			currentWeek.sessions > 0
				? currentWeek.practiceTime / currentWeek.sessions
				: 0,
			previousWeek.sessions > 0
				? previousWeek.practiceTime / previousWeek.sessions
				: 0
		),
	};

	const practiceData = React.useMemo(() => {
		const now = new Date();
		const oneWeekAgo = new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000);

		return Array.from({ length: 10 }, (_, i) => {
			const date = new Date(oneWeekAgo.getTime() + i * 24 * 60 * 60 * 1000);

			// Format both session dates and current date for consistency
			const dateKey = date.toISOString().split('T')[0];

			const sessionsForDay = userSessions.filter((session) => {
				const sessionDateKey = new Date(session.date)
					.toISOString()
					.split('T')[0];
				return sessionDateKey === dateKey;
			});

			const minutes = sessionsForDay.reduce(
				(sum, session) => sum + session.duration / 60,
				0
			);

			return {
				date: dateKey,
				minutes: minutes,
			};
		});
	}, [userSessions]);

	return (
		<div className="space-y-8">
			<ProgressOverview />

			{/* Practice Stats */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<h2>Practice Stats</h2>
						<SetPracticeGoalDialog />
					</div>
				</CardHeader>

				<CardContent className="grid grid-cols-3 gap-2 md:gap-4">
					<div>
						<p className="mb-1 text-muted-foreground">Total Sessions</p>
						<p className="mb-2 text-2xl font-bold">{totalStats.sessions}</p>
						<div className="flex items-center text-sm">
							<TrendIndicator
								isPositive={trends.sessions >= 0}
								value={Math.abs(trends.sessions).toString()}
							/>
							<span className="ml-1">past week</span>
						</div>
					</div>
					<div>
						<p className="mb-1 text-muted-foreground">Total Practice</p>
						<p className="mb-2 text-2xl font-bold">
							{Math.round(totalStats.practiceTime)} mins
						</p>
						<div className="flex items-center text-sm">
							<TrendIndicator
								isPositive={trends.practiceTime >= 0}
								value={Math.abs(trends.practiceTime).toString()}
							/>
							<span className="ml-1">past week</span>
						</div>
					</div>
					<div>
						<p className="mb-1 text-muted-foreground">Avg. Session</p>
						<p className="mb-2 text-2xl font-bold">
							{Math.round(totalStats.avgSession)} mins
						</p>
						<div className="flex items-center text-sm">
							<TrendIndicator
								isPositive={trends.avgSession >= 0}
								value={Math.abs(trends.avgSession).toString()}
							/>
							<span className="ml-1">past week</span>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Calendar & Trend Chart */}
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
				<Card className="flex flex-col">
					<CardHeader>
						<h2>Practice Calendar</h2>
					</CardHeader>
					<CardContent className="flex flex-grow items-center justify-center">
						<div className="max-w-full overflow-visible">
							<Calendar
								mode="single"
								selected={new Date()}
								className="rounded-md border"
							/>
						</div>
					</CardContent>
				</Card>

				<Card className="flex flex-col">
					<CardHeader>
						<h2>Practice Trend</h2>
					</CardHeader>
					<CardContent className="-ml-10 flex flex-grow items-center justify-center">
						<div className="h-80 w-full">
							<ResponsiveContainer width="100%" height="100%">
								<ComposedChart data={practiceData}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="date" />
									<YAxis />
									<Tooltip />
									<Bar dataKey="minutes" fill="#bf3b57" opacity={0.5} />
									<Line
										type="monotone"
										dataKey="minutes"
										stroke="#bf3b57"
										strokeWidth={2}
									/>
								</ComposedChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>

			<RecentSessions sessions={userSessions} />
		</div>
	);
};

export default ProgressPage;
