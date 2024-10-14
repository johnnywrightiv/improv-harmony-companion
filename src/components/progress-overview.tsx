import { Progress } from '@/components/ui/progress';

export default function ProgressOverview() {
	const progress = 57; // Example progress percentage
	const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

	// Example usage activity data: true for active, false for inactive.
	const usageActivity = [true, false, true, true, false, true, false];

	return (
		<div className="w-full space-y-4 rounded-[--radius] border border-border bg-secondary p-3 shadow-lg">
			<div className="text-center">
				<h3 className="text-foreground font-semibold">
					{progress}% of the way to your goal this week
				</h3>
			</div>

			<div className="relative">
				<Progress
					value={progress}
					className="h-4 w-full rounded-[--radius] bg-gradient-to-r from-accent to-secondary"
				/>
				<div
					className="absolute inset-0 rounded-[--radius] bg-primary"
					style={{
						clipPath: `polygon(0 0, ${progress}% 0, ${progress}% 100%, 0 100%)`,
					}}
				/>
			</div>

			<div className="flex justify-around space-x-2 pt-2">
				{daysOfWeek.map((day, index) => (
					<div
						key={day}
						className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-medium
                        ${usageActivity[index] ? 'bg-primary text-primary-foreground' : 'bg-secondary/50 text-secondary-foreground'}`}
					>
						{day}
					</div>
				))}
			</div>
		</div>
	);
}
