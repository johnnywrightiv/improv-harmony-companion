import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Circle } from 'lucide-react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import placeholderData from '@/data/placeholder-data.json';

export default function ProgressOverview() {
	const { dailyGoal } = useSelector(
		(state: RootState) => state.user.settings.practiceGoal
	);

	const user = placeholderData.users[0];
	const userSessions = placeholderData.sessions.filter(
		(session) => session.userId === user.id
	);

	// Convert dailyGoal from minutes to seconds for comparison
	const dailyGoalSeconds = dailyGoal * 60;
	const weeklyGoal = dailyGoal ? dailyGoal * 7 : 0;

	const getCurrentWeekDates = () => {
		const now = new Date();
		const currentDay = now.getDay();
		const diff = currentDay === 0 ? 6 : currentDay - 1;
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

	const calculateDailyProgress = () => {
		const weekDates = getCurrentWeekDates();
		return weekDates.map((date) => {
			const dayStart = new Date(date);
			const dayEnd = new Date(date);
			dayEnd.setHours(23, 59, 59, 999);
			const daySessions = userSessions.filter((session) => {
				const [year, month, day] = session.date.split('-').map(Number);
				const sessionDate = new Date(year, month - 1, day);
				return sessionDate >= dayStart && sessionDate <= dayEnd;
			});
			return daySessions.reduce(
				(total, session) => total + session.duration,
				0
			);
		});
	};

	const dailyProgress = calculateDailyProgress();
	const weeklyProgress = dailyProgress.reduce(
		(sum, seconds) => sum + seconds / 60,
		0
	);

	const overallProgress =
		weeklyGoal > 0
			? Math.min(Math.round((weeklyProgress / weeklyGoal) * 100), 100)
			: 0;

	const daysOfWeek = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];

	return (
		<div className="w-full space-y-2 rounded-[--radius] border border-border bg-secondary p-2 shadow-lg sm:space-y-4 sm:p-3">
			<Link href="/dashboard/progress" className="block">
				<div className="text-center hover:underline">
					<h3 className="text-foreground mb-2 px-2 text-sm font-semibold sm:mb-4 sm:text-2xl">
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
						className="h-4 w-full rounded-[--radius] bg-accent sm:h-6"
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
			<div className="flex justify-around space-x-1 pt-1 sm:space-x-2 sm:pt-2">
				{daysOfWeek.map((day, index) => {
					// Calculate progress percentage comparing seconds to seconds
					const dayProgress =
						dailyGoalSeconds > 0
							? Math.min((dailyProgress[index] / dailyGoalSeconds) * 40, 100)
							: 0;

					return (
						<div key={day} className="relative">
							<Circle size={32} className="stroke-[3] text-accent sm:hidden" />
							<Circle
								size={48}
								className="hidden stroke-[3] text-accent sm:block"
							/>
							{dayProgress > 0 && (
								<>
									<Circle
										size={32}
										className="absolute inset-0 stroke-[4] text-primary sm:hidden"
										style={{
											strokeDasharray: `${dayProgress}, 100`,
											transform: 'rotate(-90deg)',
											transformOrigin: 'center',
										}}
									/>
									<Circle
										size={48}
										className="absolute inset-0 hidden stroke-[4] text-primary sm:block"
										style={{
											strokeDasharray: `${dayProgress * 1.51}, 151`,
											transform: 'rotate(-90deg)',
											transformOrigin: 'center',
										}}
									/>
								</>
							)}
							<span className="text-foreground absolute inset-0 flex items-center justify-center text-xs font-medium sm:text-sm">
								{day}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
