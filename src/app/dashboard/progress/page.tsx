'use client';

import React, { useMemo } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { ArrowUp, ArrowDown } from 'lucide-react';
import RecentSessions from '@/components/recent-sessions';
import placeholderData from '@/data/placeholder-data.json';
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

const Progress: React.FC = () => {
	const user = placeholderData.users[0];
	const userSessions = placeholderData.sessions.filter(
		(session) => session.userId === user.id
	);

	const practiceData = useMemo(() => {
		const now = new Date();
		const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

		return Array.from({ length: 7 }, (_, i) => {
			const date = new Date(oneWeekAgo.getTime() + i * 24 * 60 * 60 * 1000);
			const sessionsForDay = userSessions.filter(
				(session) =>
					new Date(session.date).toDateString() === date.toDateString()
			);
			const minutes = sessionsForDay.reduce(
				(sum, session) => sum + session.duration / 60,
				0
			);
			return {
				date: date.toISOString().split('T')[0],
				minutes: minutes,
			};
		});
	}, [userSessions]);

	const calculateWeeklyStats = (daysAgo: number) => {
		const endDate = new Date();
		const startDate = new Date(
			endDate.getTime() - daysAgo * 24 * 60 * 60 * 1000
		);
		const relevantSessions = userSessions.filter(
			(session) =>
				new Date(session.date) >= startDate && new Date(session.date) < endDate
		);

		const totalSessions = relevantSessions.length;
		const totalPracticeTime = relevantSessions.reduce(
			(sum, session) => sum + session.duration / 60,
			0
		);
		const avgSessionDuration =
			totalSessions > 0 ? totalPracticeTime / totalSessions : 0;

		return { totalSessions, totalPracticeTime, avgSessionDuration };
	};

	const currentWeekStats = calculateWeeklyStats(7);
	const previousWeekStats = calculateWeeklyStats(14);

	const calculateTrendPercentage = (current: number, previous: number) => {
		return previous !== 0 ? ((current - previous) / previous) * 100 : 0;
	};

	const totalSessionsTrend = calculateTrendPercentage(
		currentWeekStats.totalSessions,
		previousWeekStats.totalSessions
	);
	const totalPracticeTimeTrend = calculateTrendPercentage(
		currentWeekStats.totalPracticeTime,
		previousWeekStats.totalPracticeTime
	);
	const avgSessionDurationTrend = calculateTrendPercentage(
		currentWeekStats.avgSessionDuration,
		previousWeekStats.avgSessionDuration
	);

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
						<p className="mb-2 text-2xl font-bold">
							{currentWeekStats.totalSessions}
						</p>
						<div className="flex items-center text-sm">
							<TrendIndicator
								isPositive={totalSessionsTrend >= 0}
								value={Math.abs(totalSessionsTrend).toFixed(0)}
							/>
							<span className="ml-1">past week</span>
						</div>
					</div>
					<div>
						<p className="mb-1 text-muted-foreground">Total Practice</p>
						<p className="mb-2 text-2xl font-bold">
							{currentWeekStats.totalPracticeTime.toFixed(0)} mins
						</p>
						<div className="flex items-center text-sm">
							<TrendIndicator
								isPositive={totalPracticeTimeTrend >= 0}
								value={Math.abs(totalPracticeTimeTrend).toFixed(0)}
							/>
							<span className="ml-1">past week</span>
						</div>
					</div>
					<div>
						<p className="mb-1 text-muted-foreground">Avg. Session</p>
						<p className="mb-2 text-2xl font-bold">
							{currentWeekStats.avgSessionDuration.toFixed(0)} mins
						</p>
						<div className="flex items-center text-sm">
							<TrendIndicator
								isPositive={avgSessionDurationTrend >= 0}
								value={Math.abs(avgSessionDurationTrend).toFixed(0)}
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
						<div className=" h-80 w-full">
							<ResponsiveContainer width="100%" height="100%">
								<ComposedChart data={practiceData}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="date" />
									<YAxis />
									<Tooltip />
									<Bar dataKey="minutes" fill="#8884d8" opacity={0.5} />
									<Line
										type="monotone"
										dataKey="minutes"
										stroke="#8884d8"
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

export default Progress;
