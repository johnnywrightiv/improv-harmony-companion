'use client';

import { Progress } from '@/components/ui/progress';
import { Circle } from 'lucide-react';
import Link from 'next/link';

export default function ProgressOverview() {
	const progress = 35; // Example progress percentage
	const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

	// Example daily progress data (0-40)
	const dailyProgress = [40, 0, 40, 10, 25, 36, 0];

	return (
		<div className="w-full space-y-4 rounded-[--radius] border border-border bg-secondary p-3 shadow-lg">
			<Link href="/dashboard/progress" className="block">
				<div className="hover: text-center">
					<h3 className="text-foreground font-semibold">
						{progress}% of the way to your goal this week
					</h3>
				</div>

				<div className="relative">
					<Progress
						value={progress}
						className="h-4 w-full rounded-[--radius] bg-accent"
					/>
					<div
						className="absolute inset-0 rounded-[--radius] bg-primary"
						style={{
							clipPath: `polygon(0 0, ${progress}% 0, ${progress}% 100%, 0 100%)`,
						}}
					/>
				</div>
			</Link>

			<div className="flex justify-around space-x-2 pt-2">
				{daysOfWeek.map((day, index) => (
					<div key={day} className="relative">
						<Circle size={48} className="stroke-[3] text-accent" />
						<Circle
							size={48}
							className="absolute inset-0 stroke-[3] text-primary"
							style={{
								strokeDasharray: `${dailyProgress[index] * 1.51}, 151`,
								transform: 'rotate(-90deg)',
								transformOrigin: 'center',
							}}
						/>
						<span className="text-foreground absolute inset-0 flex items-center justify-center text-sm font-medium">
							{day}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
