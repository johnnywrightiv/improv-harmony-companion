// 'use client';

// import React from 'react';
// import { Progress } from '@/components/ui/progress';
// import { Circle } from 'lucide-react';
// import Link from 'next/link';
// import placeholderData from '@/data/placeholder-data.json';

// export default function ProgressOverview() {
// 	const user = placeholderData.users[0];
// 	const { dailyGoal, weeklyGoal, dailyProgress, weeklyProgress } =
// 		user.stats.goalTracking;

// 	const overallProgress = Math.round((weeklyProgress / weeklyGoal) * 100);
// 	const daysOfWeek = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];

// 	return (
// 		<div className="w-full space-y-4 rounded-[--radius] border border-border bg-secondary p-3 shadow-lg">
// 			<Link href="/dashboard/progress" className="block">
// 				<div className="hover: text-center">
// 					<h3 className="text-foreground font-semibold">
// 						{overallProgress}% of the way to your goal this week
// 					</h3>
// 				</div>

// 				<div className="relative">
// 					<Progress
// 						value={overallProgress}
// 						className="h-4 w-full rounded-[--radius] bg-accent"
// 					/>
// 					<div
// 						className="absolute inset-0 rounded-[--radius] bg-primary"
// 						style={{
// 							clipPath: `polygon(0 0, ${overallProgress}% 0, ${overallProgress}% 100%, 0 100%)`,
// 						}}
// 					/>
// 				</div>
// 			</Link>

// 			<div className="flex justify-around space-x-2 pt-2">
// 				{daysOfWeek.map((day, index) => {
// 					const dayProgress = (dailyProgress[index] / dailyGoal) * 100;
// 					return (
// 						<div key={day} className="relative">
// 							<Circle size={48} className="stroke-[3] text-accent" />
// 							<Circle
// 								size={48}
// 								className="absolute inset-0 stroke-[4] text-primary"
// 								style={{
// 									strokeDasharray: `${dayProgress * 1.51}, 151`,
// 									transform: 'rotate(-90deg)',
// 									transformOrigin: 'center',
// 								}}
// 							/>
// 							<span className="text-foreground absolute inset-0 flex items-center justify-center text-sm font-medium">
// 								{day}
// 							</span>
// 						</div>
// 					);
// 				})}
// 			</div>
// 		</div>
// 	);
// }

'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Circle } from 'lucide-react';
import Link from 'next/link';
import placeholderData from '@/data/placeholder-data.json';

export default function ProgressOverview() {
	const user = placeholderData.users[0];
	const { dailyGoal, weeklyGoal, dailyProgress, weeklyProgress } =
		user.stats.goalTracking;

	// Calculate the actual weekly progress based on daily progress
	const calculatedWeeklyProgress = dailyProgress.reduce(
		(sum, day) => sum + day,
		0
	);

	// Use the higher of the two values (in case the placeholder data isn't perfectly in sync)
	const actualWeeklyProgress = Math.max(
		calculatedWeeklyProgress,
		weeklyProgress
	);

	// Calculate overall progress percentage
	const overallProgress =
		weeklyGoal > 0
			? Math.round((actualWeeklyProgress / weeklyGoal) * 100)
			: Math.round((actualWeeklyProgress / (dailyGoal * 7)) * 100); // Use 7 * dailyGoal as fallback

	const daysOfWeek = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];

	return (
		<div className="w-full space-y-4 rounded-[--radius] border border-border bg-secondary p-3 shadow-lg">
			<Link href="/dashboard/progress" className="block">
				<div className="hover: text-center">
					<h3 className="text-foreground font-semibold">
						{actualWeeklyProgress > 0
							? `${overallProgress}% of the way to your goal this week`
							: 'No progress yet this week'}
					</h3>
				</div>

				<div className="relative">
					<Progress
						value={overallProgress}
						className="h-4 w-full rounded-[--radius] bg-accent"
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
						dailyGoal > 0 ? (dailyProgress[index] / dailyGoal) * 100 : 0;
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
