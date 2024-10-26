import { Card } from '@/components/ui/card';

const PracticeSessionPlaceholder = () => {
	return (
		<Card>
			<div className="h-auto items-center justify-center rounded-[--radius] border border-border">
				{/* Musical Controls Bar Placeholder */}
				<div className="flex flex-wrap items-center justify-around gap-4  bg-secondary p-4 sm:flex-nowrap">
					<div className="flex min-w-[50px] items-center">
						<div className="h-10 w-24 rounded-md bg-accent" />
					</div>
					<div className="flex min-w-[50px] items-center space-x-2">
						<div className="h-10 w-12 rounded-md bg-accent" />
						<div className="h-10 w-20 rounded-md bg-accent" />
					</div>

					<div className="h-10 w-20 rounded-md bg-accent" />
					<span className="text-muted-foreground">BPM</span>
				</div>

				{/* Timer Bar Placeholder */}
				<div className="rounded-b-[--radius] bg-accent py-2 text-center text-muted-foreground">
					00:00 / 00:00
				</div>

				{/* Chord Progression Display Placeholder */}
				<div className="mt-8 flex flex-wrap justify-center gap-4 px-4">
					{[1, 2, 3, 4].map((i) => (
						<div key={i} className="relative">
							<div className="h-24 w-24 rounded-lg border border-border bg-secondary p-3">
								<div className="text-center text-muted-foreground">
									<div className="mb-2 text-xl">•</div>
									<div className="space-y-1 text-xs">
										<div>• • •</div>
										<div className="text-[10px]">•</div>
									</div>
								</div>
							</div>
							<div className="absolute -left-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-secondary/50" />
							<div className="absolute -right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-secondary/50" />
						</div>
					))}
					<div className="flex h-24 w-24 items-center justify-center rounded-lg border border-dashed border-border bg-accent">
						<div className="text-center text-muted-foreground">
							<div className="mb-1 text-2xl">+</div>
							<div className="text-xs ">Add Chord</div>
						</div>
					</div>
				</div>

				{/* Scale Display Placeholder */}
				<div className="my-8 space-y-4">
					<div className="flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
						<div className="text-right text-muted-foreground sm:w-24">
							Major
						</div>
						<div className="flex flex-wrap justify-center gap-2">
							{[1, 2, 3, 4, 5, 6, 7].map((i) => (
								<div
									key={i}
									className="flex h-10 w-10 items-center justify-center rounded bg-secondary"
								>
									<div className="text-xs text-muted-foreground">•</div>
								</div>
							))}
						</div>
					</div>
					<div className="flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
						<div className="text-right text-muted-foreground sm:w-24">
							Minor
						</div>
						<div className="flex flex-wrap justify-center gap-2">
							{[1, 2, 3, 4, 5, 6, 7].map((i) => (
								<div
									key={i}
									className="flex h-10 w-10 items-center justify-center rounded bg-secondary"
								>
									<div className="text-xs text-muted-foreground">•</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Playback Controls Bar Placeholder */}
				<div className="border-t border-border p-4">
					<div className="mb-4 flex flex-wrap justify-center gap-4">
						{[1, 2, 3, 4, 5].map((i) => (
							<div key={i} className="h-10 w-10 rounded-[--radius] bg-accent" />
						))}
					</div>
					<div className="flex flex-wrap items-center justify-center gap-4">
						<div className="h-8 w-8 rounded-full bg-secondary" />
						<div className="h-2 w-full max-w-[12rem] rounded-full bg-accent" />
						<div className="text-muted-foreground">50%</div>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default PracticeSessionPlaceholder;
