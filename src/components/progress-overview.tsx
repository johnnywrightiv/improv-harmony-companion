import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Circle } from 'lucide-react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import placeholderData from '@/data/placeholder-data.json';

export default function ProgressOverview() {
	// Get practice goal from Redux store
	const { dailyGoal } = useSelector(
		(state: RootState) => state.user.settings.practiceGoal
	);

	// Get sessions from placeholder data for now
	// In production, this would come from your data source
	const user = placeholderData.users[0];
	const userSessions = placeholderData.sessions.filter(
		(session) => session.userId === user.id
	);

	// Calculate weekly goal
	const weeklyGoal = dailyGoal ? dailyGoal * 7 : 0;

	// Get dates for the current week (Monday to Sunday)
	const getCurrentWeekDates = () => {
		const now = new Date();
		const currentDay = now.getDay();
		const diff = currentDay === 0 ? 6 : currentDay - 1; // Adjust for Monday start

		const monday = new Date(now);
		monday.setDate(now.getDate() - diff);
		monday.setHours(0, 0, 0, 0);

		const dates = [];
		for (let i = 0; i < 7; i++) {
			const date = new Date(monday);
			date.setDate(monday.getDate() + i);
			dates.push(date);
		}
		return dates;
	};

	// Calculate progress for each day of the current week
	const calculateDailyProgress = () => {
		const weekDates = getCurrentWeekDates();

		return weekDates.map((date) => {
			const dayStart = new Date(date);
			const dayEnd = new Date(date);
			dayEnd.setHours(23, 59, 59, 999);

			const daySessions = userSessions.filter((session) => {
				const sessionDate = new Date(session.date);
				return sessionDate >= dayStart && sessionDate <= dayEnd;
			});

			return daySessions.reduce(
				(total, session) => total + session.duration / 60,
				0
			);
		});
	};

	const dailyProgress = calculateDailyProgress();
	const weeklyProgress = dailyProgress.reduce(
		(sum, minutes) => sum + minutes,
		0
	);

	// Calculate overall progress percentage
	const overallProgress =
		weeklyGoal > 0
			? Math.min(Math.round((weeklyProgress / weeklyGoal) * 100), 100)
			: 0;

	const daysOfWeek = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];

	return (
		<div className="w-full space-y-4 rounded-[--radius] border border-border bg-secondary p-3 shadow-lg">
			<Link href="/dashboard/progress" className="block">
				<div className="text-center hover:underline">
					<h3 className="text-foreground mb-4 font-semibold">
						{!dailyGoal
							? 'Set a practice goal to track your progress'
							: weeklyProgress > 0
								? `${overallProgress}% of the way to your goal this week`
								: 'No progress yet this week 😢'}
					</h3>
				</div>

				<div className="relative">
					<Progress
						value={overallProgress}
						className="h-6 w-full rounded-[--radius] bg-accent"
					/>
					{overallProgress > 0 && (
						<div
							className="absolute inset-0 rounded-[--radius] bg-primary"
							style={{
								clipPath: `polygon(0 0, ${overallProgress}% 0, ${overallProgress}% 100%, 0 100%)`,
							}}
						/>
					)}
				</div>
			</Link>

			<div className="flex justify-around space-x-2 pt-2">
				{daysOfWeek.map((day, index) => {
					const dayProgress =
						dailyGoal > 0
							? Math.min((dailyProgress[index] / dailyGoal) * 100, 100)
							: 0;

					return (
						<div key={day} className="relative">
							<Circle size={48} className="stroke-[3] text-accent" />
							{dayProgress > 0 && (
								<Circle
									size={48}
									className="absolute inset-0 stroke-[4] text-primary"
									style={{
										strokeDasharray: `${dayProgress * 1.51}, 151`,
										transform: 'rotate(-90deg)',
										transformOrigin: 'center',
									}}
								/>
							)}
							<span className="text-foreground absolute inset-0 flex items-center justify-center text-sm font-medium">
								{day}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
