import React from 'react';
import { MoreVertical, Edit2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ChordActionsMenuProps {
	onEdit: () => void;
	onDelete: () => void;
}

export const ChordActionsMenu: React.FC<ChordActionsMenuProps> = ({
	onEdit,
	onDelete,
}) => (
	<div className="absolute right-1 top-1">
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" className="h-8 w-8 p-1">
					<MoreVertical className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={onEdit}>
					<Edit2 className="mr-2 h-4 w-4" />
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem onClick={onDelete} className="text-destructive">
					<X className="mr-2 h-4 w-4" />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
);
