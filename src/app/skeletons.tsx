// Loading Animation
const shimmer =
	'before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent';

const Skeleton = ({ className }: { className: string }) => (
	<div
		className={`${shimmer} ${className} relative overflow-hidden rounded-md bg-background-muted`}
	/>
);

export function DashboardSkeleton() {
	return (
		<div className="mx-auto w-full max-w-6xl space-y-8 p-4">
			{/* Header */}
			<div className="flex items-center space-x-4">
				<Skeleton className="h-16 w-16 rounded-full" />
				<div>
					<Skeleton className="mb-2 h-6 w-40" />
					<Skeleton className="h-4 w-24" />
				</div>
			</div>

			{/* Main content */}
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{/* Left column */}
				<div className="space-y-6 lg:col-span-2">
					<Skeleton className="h-48 w-full" /> {/* Stats section */}
					<div className="space-y-4">
						{[...Array(3)].map((_, i) => (
							<Skeleton key={i} className="h-16 w-full" />
						))}
					</div>
				</div>

				{/* Right column */}
				<div className="space-y-6">
					<Skeleton className="h-24 w-full" /> {/* Settings section */}
					<div className="space-y-4">
						{[...Array(4)].map((_, i) => (
							<div key={i} className="flex items-center space-x-4">
								<Skeleton className="h-10 w-10 rounded-full" />
								<Skeleton className="h-6 flex-grow" />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default DashboardSkeleton;
