import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
	({ className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					'relative overflow-hidden rounded-md bg-primary/10 dark:bg-primary/5',
					'before:absolute before:inset-0 before:-translate-x-full',
					'before:animate-[shimmer_2s_infinite]',
					'before:bg-gradient-to-r',
					'before:from-transparent before:via-primary/10 before:to-transparent dark:before:via-primary/20',
					className
				)}
				{...props}
			/>
		);
	}
);
Skeleton.displayName = 'Skeleton';

export { Skeleton };
export default Skeleton;
