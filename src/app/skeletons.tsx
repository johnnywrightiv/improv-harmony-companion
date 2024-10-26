import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export function ProgressSkeleton() {
	return (
		<div className="space-y-8">
			{/* Progress Overview Skeleton */}
			<Skeleton className="h-48 w-full rounded-lg" />

			{/* Practice Stats Card */}
			<Card>
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
				<Card className="flex flex-col">
					<CardHeader>
						<Skeleton className="h-6 w-32" />
					</CardHeader>
					<CardContent className="flex flex-grow items-center justify-center">
						<Skeleton className="h-64 w-full max-w-[320px]" />
					</CardContent>
				</Card>

				{/* Trend Chart Card */}
				<Card className="flex flex-col">
					<CardHeader>
						<Skeleton className="h-6 w-32" />
					</CardHeader>
					<CardContent className="flex flex-grow items-center justify-center">
						<Skeleton className="h-80 w-full" />
					</CardContent>
				</Card>
			</div>

			{/* Recent Sessions */}
			<Card>
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
							<div className="text-right">
								<Skeleton className="h-5 w-20" />
								<Skeleton className="mt-1 h-4 w-16" />
							</div>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}

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
				<div className="space-y-6 rounded-[--radius] border border-primary/20 bg-secondary/10 lg:col-span-2 ">
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
				<div className="space-y-6 rounded-[--radius] border border-primary/20 bg-secondary/10 lg:col-span-2">
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

export { DashboardSkeleton as default };
