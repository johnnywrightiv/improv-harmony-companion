import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const alertVariants = cva(
	'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
	{
		variants: {
			variant: {
				default: 'bg-background text-foreground border-text/50',
				destructive:
					'border-destructive/50 text-destructive dark:border-destructive bg-destructive/10 [&>svg]:text-destructive',
				warning:
					'border-warning/50 text-warning dark:border-warning border-warning bg-warning/10 [&>svg]:text-warning',
				success:
					'border-success/50 text-success dark:border-success border-success bg-success/10 [&>svg]:text-success',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

const Alert = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
	<div
		ref={ref}
		role="alert"
		className={cn(alertVariants({ variant }), className)}
		{...props}
	/>
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h5
		ref={ref}
		className={cn('mb-1 font-medium leading-none tracking-tight', className)}
		{...props}
	/>
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('text-sm text-text [&_p]:leading-relaxed', className)}
		{...props}
	/>
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
