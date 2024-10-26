import { Skeleton } from '@/components/ui/skeleton';
import { CardHeader, CardContent } from '@/components/ui/card';

export function DashboardSkeleton() {
	return (
		<div className="mx-auto w-full max-w-6xl space-y-8">
			{/* Header */}
			<div className="flex items-center space-x-4">
				<Skeleton className="h-16 w-16 rounded-full" />
				<div>
					<Skeleton className="mb-2 h-7 w-48" /> {/* Name */}
					<Skeleton className="h-4 w-32" /> {/* Username */}
				</div>
			</div>

			{/* Progress Overview */}
			<Skeleton className="h-48 w-full rounded-[--radius] border border-primary/20 bg-secondary/10 " />

			{/* Button Container */}
			<div className="flex w-full flex-col gap-4 sm:flex-row">
				<Skeleton className="h-11 w-full" /> {/* Quick Start */}
				<Skeleton className="h-11 w-full" /> {/* New Session */}
			</div>

			{/* Main content */}
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
				{/* Left column - Saved Loops */}
				<div className="space-y-6 rounded-[--radius] border border-primary/20 bg-secondary/10 p-4 lg:col-span-2">
					<div className="space-y-4">
						<Skeleton className="h-8 w-32" /> {/* Section Title */}
						<Skeleton className="h-4 w-48" /> {/* Section Title */}
						<div className="grid">
							{[...Array(3)].map((_, i) => (
								<div
									key={i}
									className="flex items-center space-x-2 rounded-lg p-2"
								>
									<Skeleton className="mx-6 h-12 w-12 rounded-full" />
									<div className="flex-grow space-y-2">
										<Skeleton className="h-5 w-32" />
										<Skeleton className="h-4 w-24" />
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Right column - Recent Sessions */}
				<div className="space-y-6 rounded-[--radius] border border-primary/20 bg-secondary/10 p-4 lg:col-span-2">
					<div className="space-y-4">
						<Skeleton className="h-8 w-32" /> {/* Section Title */}
						<Skeleton className="h-4 w-48" /> {/* Section Title */}
						<div className="grid">
							{[...Array(3)].map((_, i) => (
								<div
									key={i}
									className="flex items-center space-x-2 rounded-lg p-2"
								>
									<Skeleton className="mx-6 h-12 w-12 rounded-full" />
									<div className="flex-grow space-y-2">
										<Skeleton className="h-5 w-32" />
										<Skeleton className="h-4 w-24" />
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
import { Card } from '@/components/ui/card';

export function PracticeSkeleton() {
	return (
		<div className="grid animate-pulse gap-2 sm:gap-4">
			<Card className="border border-border/20 bg-secondary/10">
				<div className="h-auto items-center justify-center rounded-[--radius]">
					{/* Musical Controls Bar Skeleton */}
					<div className="rounded-[--radius] bg-background/50">
						<div className="mb-2 flex min-w-0 flex-row flex-nowrap items-start justify-between overflow-x-auto py-6 sm:px-6 md:items-center md:justify-evenly">
							{/* Time Signature */}
							<div className="flex shrink-0 flex-col items-center">
								<Skeleton className="mb-2 h-4 w-20" />
								<Skeleton className="h-10 w-[70px] md:w-[80px]" />
							</div>
							{/* Key Signature */}
							<div className="flex shrink-0 flex-col items-center">
								<Skeleton className="mb-2 h-4 w-20" />
								<div className="flex gap-1 md:gap-2">
									<Skeleton className="h-10 w-[60px] md:w-[70px]" />
									<Skeleton className="h-10 w-[60px] sm:w-[120px]" />
								</div>
							</div>
							{/* Tempo */}
							<div className="flex shrink-0 flex-col items-center">
								<Skeleton className="mb-2 h-4 w-20" />
								<div className="mx-2 flex items-center gap-1 md:gap-2">
									<Skeleton className="h-10 w-[60px] md:w-[80px]" />
									<Skeleton className="hidden h-4 w-8 sm:block" />
								</div>
							</div>
						</div>
						{/* Timer Progress */}
						<div className="rounded-b-[--radius] bg-primary/10 py-4">
							<Skeleton className="mx-auto h-4 w-24" />
						</div>
					</div>

					{/* Chord Progression Display Skeleton */}
					<div className="mt-12">
						<div className="flex flex-wrap justify-center gap-4 px-4">
							{[1, 2, 3, 4].map((i) => (
								<div key={i} className="relative">
									<Skeleton className="h-24 w-24 rounded-lg" />
								</div>
							))}
						</div>
					</div>

					{/* Scale Display Skeleton */}
					<div className="mb-2 mt-8 justify-center space-y-4">
						{[1, 2].map((scaleIndex) => (
							<div
								key={scaleIndex}
								className="flex items-center justify-center"
							>
								<Skeleton className="h-6 w-16 text-sm sm:text-xl" />
								<div className="flex flex-wrap justify-center gap-2">
									{[1, 2, 3, 4, 5, 6, 7].map((noteIndex) => (
										<Skeleton key={noteIndex} className="h-4 w-4 rounded" />
									))}
								</div>
							</div>
						))}
					</div>

					{/* Playback Controls Skeleton */}
					<div className="flex flex-col items-center gap-6 rounded-[--radius] bg-background/50 py-6 sm:px-6">
						{/* Main Controls */}
						<div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
							{[1, 2, 3, 4, 5].map((i) => (
								<Skeleton
									key={i}
									className="h-10 w-10 rounded-[--radius] border border-border/20"
								/>
							))}
						</div>
						{/* Metronome Controls */}
						<div className="flex w-full max-w-[250px] flex-col items-center gap-2 px-2">
							<div className="flex w-full items-center">
								<div className="flex items-center justify-center">
									<Skeleton className="mr-4 h-8 w-8 rounded-[--radius] border border-border/20" />
								</div>
								<div className="flex flex-1 items-center justify-between">
									<Skeleton className="h-4 w-4" />
									<Skeleton className="mx-2 h-2 flex-1 rounded-full" />
									<Skeleton className="h-4 w-8" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</Card>

			{/* Saved Loops Section */}
			<div className="space-y-4 rounded-[--radius] border border-primary/20 bg-secondary/10 p-4 sm:p-6">
				<div className="space-y-4">
					<Skeleton className="h-6 w-32" />
					<Skeleton className="h-4 w-48" />
					<div className="grid">
						{[...Array(3)].map((_, i) => (
							<div
								key={i}
								className="flex items-center space-x-2 rounded-lg p-2"
							>
								<Skeleton className="h-12 w-12 rounded-full" />
								<div className="flex-grow space-y-2">
									<Skeleton className="h-5 w-32" />
									<Skeleton className="h-4 w-24" />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export function ProgressSkeleton() {
	return (
		<div className="space-y-8">
			{/* Progress Overview Skeleton */}
			<Skeleton className="h-48 w-full rounded-lg" />

			{/* Practice Stats Card */}
			<Card className="rounded-[--radius] border border-primary/20 bg-secondary/10">
				<CardHeader>
					<div className="flex items-center justify-between">
						<Skeleton className="h-6 w-32" />
						<Skeleton className="h-10 w-36" />
					</div>
				</CardHeader>
				<CardContent className="grid grid-cols-3 gap-2 md:gap-4">
					{[...Array(3)].map((_, i) => (
						<div key={i}>
							<Skeleton className="mb-1 h-4 w-24" />
							<Skeleton className="mb-2 h-8 w-20" />
							<div className="flex items-center space-x-2">
								<Skeleton className="h-4 w-12" />
								<Skeleton className="h-4 w-16" />
							</div>
						</div>
					))}
				</CardContent>
			</Card>

			{/* Calendar & Trend Chart Grid */}
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
				{/* Calendar Card */}
				<Card className="flex flex-col rounded-[--radius] border border-primary/20 bg-secondary/10">
					<CardHeader>
						<Skeleton className="h-6 w-32" />
					</CardHeader>
					<CardContent className="flex flex-grow items-center justify-center">
						<Skeleton className="h-64 w-full max-w-[320px]" />
					</CardContent>
				</Card>

				{/* Trend Chart Card */}
				<Card className="flex flex-col rounded-[--radius] border border-primary/20 bg-secondary/10">
					<CardHeader>
						<Skeleton className="h-6 w-32" />
					</CardHeader>
					<CardContent className="flex flex-grow items-center justify-center">
						<Skeleton className="h-80 w-full" />
					</CardContent>
				</Card>
			</div>

			{/* Recent Sessions */}
			<Card className="rounded-[--radius] border border-primary/20 bg-secondary/10">
				<CardHeader>
					<Skeleton className="h-6 w-40" />
				</CardHeader>
				<CardContent className="space-y-4">
					{[...Array(5)].map((_, i) => (
						<div key={i} className="flex items-center space-x-4 rounded-lg p-2">
							<Skeleton className="h-12 w-12 rounded-full" />
							<div className="flex-grow space-y-2">
								<Skeleton className="h-5 w-32" />
								<Skeleton className="h-4 w-24" />
							</div>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}

export { DashboardSkeleton as default };
