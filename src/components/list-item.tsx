import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ListItemProps {
	icon: LucideIcon;
	title: string;
	subtitle: string;
	onClick: () => void;
}

export default function ListItem({
	icon: Icon,
	title,
	subtitle,
	onClick,
}: ListItemProps) {
	return (
		<Button
			variant="ghost"
			className="mb-2 w-full justify-start text-left font-normal"
			onClick={onClick}
		>
			<div className="flex items-center space-x-4">
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
					<Icon className="h-6 w-6 text-primary-foreground" />
				</div>
				<div className="flex-grow">
					<p className="font-medium">{title}</p>
					<p className="text-sm text-muted-foreground">{subtitle}</p>
				</div>
			</div>
		</Button>
	);
}
