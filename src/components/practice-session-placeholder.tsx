// import { Card } from '@/components/ui/card';

// const PracticeSessionPlaceholder = () => {
// 	return (
// 		<Card>
// 			<div className="h-auto items-center justify-center rounded-[--radius] border border-border">
// 				{/* Musical Controls Bar Placeholder */}
// 				<div className="flex flex-wrap items-center justify-around gap-4  bg-secondary p-4 sm:flex-nowrap">
// 					<div className="flex min-w-[50px] items-center">
// 						<div className="h-10 w-24 rounded-md bg-accent" />
// 					</div>
// 					<div className="flex min-w-[50px] items-center space-x-2">
// 						<div className="h-10 w-12 rounded-md bg-accent" />
// 						<div className="h-10 w-20 rounded-md bg-accent" />
// 					</div>

// 					<div className="h-10 w-20 rounded-md bg-accent" />
// 					<span className="text-muted-foreground">BPM</span>
// 				</div>

// 				{/* Timer Bar Placeholder */}
// 				<div className="rounded-b-[--radius] bg-accent py-2 text-center text-muted-foreground">
// 					00:00 / 00:00
// 				</div>

// 				{/* Chord Progression Display Placeholder */}
// 				<div className="mt-8 flex flex-wrap justify-center gap-4 px-4">
// 					{[1, 2, 3, 4].map((i) => (
// 						<div key={i} className="relative">
// 							<div className="h-24 w-24 rounded-lg border border-border bg-secondary p-3">
// 								<div className="text-center text-muted-foreground">
// 									<div className="mb-2 text-xl">•</div>
// 									<div className="space-y-1 text-xs">
// 										<div>• • •</div>
// 										<div className="text-[10px]">•</div>
// 									</div>
// 								</div>
// 							</div>
// 							<div className="absolute -left-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-secondary/50" />
// 							<div className="absolute -right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-secondary/50" />
// 						</div>
// 					))}
// 					<div className="flex h-24 w-24 items-center justify-center rounded-lg border border-dashed border-border bg-accent">
// 						<div className="text-center text-muted-foreground">
// 							<div className="mb-1 text-2xl">+</div>
// 							<div className="text-xs ">Add Chord</div>
// 						</div>
// 					</div>
// 				</div>

// 				{/* Scale Display Placeholder */}
// 				<div className="my-8 space-y-4">
// 					<div className="flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
// 						<div className="text-right text-muted-foreground sm:w-24">
// 							Major
// 						</div>
// 						<div className="flex flex-wrap justify-center gap-2">
// 							{[1, 2, 3, 4, 5, 6, 7].map((i) => (
// 								<div
// 									key={i}
// 									className="flex h-10 w-10 items-center justify-center rounded bg-secondary"
// 								>
// 									<div className="text-xs text-muted-foreground">•</div>
// 								</div>
// 							))}
// 						</div>
// 					</div>
// 					<div className="flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
// 						<div className="text-right text-muted-foreground sm:w-24">
// 							Minor
// 						</div>
// 						<div className="flex flex-wrap justify-center gap-2">
// 							{[1, 2, 3, 4, 5, 6, 7].map((i) => (
// 								<div
// 									key={i}
// 									className="flex h-10 w-10 items-center justify-center rounded bg-secondary"
// 								>
// 									<div className="text-xs text-muted-foreground">•</div>
// 								</div>
// 							))}
// 						</div>
// 					</div>
// 				</div>

// 				{/* Playback Controls Bar Placeholder */}
// 				<div className="border-t border-border p-4">
// 					<div className="mb-4 flex flex-wrap justify-center gap-4">
// 						{[1, 2, 3, 4, 5].map((i) => (
// 							<div key={i} className="h-10 w-10 rounded-[--radius] bg-accent" />
// 						))}
// 					</div>
// 					<div className="flex flex-wrap items-center justify-center gap-4">
// 						<div className="h-8 w-8 rounded-full bg-secondary" />
// 						<div className="h-2 w-full max-w-[12rem] rounded-full bg-accent" />
// 						<div className="text-muted-foreground">50%</div>
// 					</div>
// 				</div>
// 			</div>
// 		</Card>
// 	);
// };

// export default PracticeSessionPlaceholder;

import React from 'react';
import { Card } from '@/components/ui/card';
import {
	Play,
	Square,
	Save,
	Settings,
	Volume2,
	NotepadText,
} from 'lucide-react';

const PracticeSessionPlaceholder = () => {
	return (
		<Card>
			<div className="h-auto items-center justify-center rounded-[--radius] border border-border">
				{/* Musical Controls Bar Placeholder */}
				<div className="rounded-[--radius] bg-background/50">
					<div className="mb-2 flex min-w-0 flex-row flex-nowrap items-start justify-between overflow-x-auto py-6 sm:px-6 md:items-center md:justify-evenly">
						<div className="flex shrink-0 flex-col items-center">
							<div className="mb-2 whitespace-nowrap text-xs font-medium text-muted-foreground md:text-sm">
								Time Signature
							</div>
							<div className="h-10 w-[70px] rounded-md bg-accent md:w-[80px]" />
						</div>

						<div className="flex shrink-0 flex-col items-center">
							<div className="mb-2 whitespace-nowrap text-xs font-medium text-muted-foreground md:text-sm">
								Key Signature
							</div>
							<div className="flex gap-1 md:gap-2">
								<div className="h-10 w-[60px] rounded-md bg-accent md:w-[70px]" />
								<div className="h-10 w-[60px] rounded-md bg-accent sm:w-[180px]" />
							</div>
						</div>

						<div className="flex shrink-0 flex-col items-center">
							<div className="mb-2 whitespace-nowrap text-center text-xs font-medium text-muted-foreground md:text-sm">
								Tempo
							</div>
							<div className="mx-2 flex items-center gap-1 md:gap-2">
								<div className="h-10 w-[60px] rounded-md bg-accent md:w-[80px]" />
								<span className="hidden text-xs text-muted-foreground sm:block md:text-sm">
									BPM
								</span>
							</div>
						</div>
					</div>
					{/* Timer Bar Placeholder */}
					<div className="rounded-b-[--radius] bg-accent py-2 text-center text-muted-foreground">
						00:00 / 00:00
					</div>
				</div>

				{/* Chord Progression Display */}
				<div className="mt-8">
					<div className="flex flex-wrap justify-center gap-4 px-4">
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
					</div>
				</div>

				{/* Scale Display */}
				<div className="justify-center">
					<div className="flex items-center justify-center">
						<h3 className="text-sm font-semibold sm:text-xl">Major</h3>
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
					<div className="mb-2 flex items-center justify-center">
						<h3 className="text-sm font-semibold sm:text-xl">Minor</h3>
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

				{/* Playback Controls Bar */}
				<div className="flex flex-col items-center gap-6 rounded-[--radius] bg-background/50 py-6 sm:px-6">
					<div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
						<div className="flex h-10 w-10 items-center justify-center rounded-[--radius] border border-border bg-accent">
							<Play className="h-4 w-4 text-muted-foreground" />
						</div>
						<div className="flex h-10 w-10 items-center justify-center rounded-[--radius] border border-border bg-accent">
							<Square className="h-4 w-4 text-muted-foreground" />
						</div>
						<div className="flex h-10 w-10 items-center justify-center rounded-[--radius] border border-border bg-accent">
							<NotepadText className="h-4 w-4 text-muted-foreground" />
						</div>
						<div className="flex h-10 w-10 items-center justify-center rounded-[--radius] border border-border bg-accent">
							<Save className="h-4 w-4 text-muted-foreground" />
						</div>
						<div className="flex h-10 w-10 items-center justify-center rounded-[--radius] border border-border bg-accent">
							<Settings className="h-4 w-4 text-muted-foreground" />
						</div>
					</div>

					<div className="flex w-full max-w-[250px] flex-col items-center gap-2 px-2">
						<div className="flex w-full items-center">
							<div className="flex items-center justify-center">
								<div className="mr-4 h-8 w-8 rounded-[--radius] border border-border bg-accent" />
							</div>
							<div className="flex flex-1 items-center justify-between">
								<span className="min-w-[2ch] text-sm text-muted-foreground">
									<Volume2 className="h-4 w-4 shrink-0" />
								</span>
								<div className="mx-2 h-2 flex-1 rounded-full bg-accent" />
								<span className="min-w-[3ch] text-right text-sm text-muted-foreground">
									50%
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default PracticeSessionPlaceholder;
