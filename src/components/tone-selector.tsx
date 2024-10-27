'use client';

import * as React from 'react';
import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { updateAudioPreferences } from '@/store/user-slice';
import { capitalize } from '@/lib/utils';

type ToneSet = 'click' | 'clave' | 'blip' | 'beep';

const toneOptions: { value: ToneSet; label: string }[] = [
	{ value: 'click', label: 'Click' },
	{ value: 'clave', label: 'Clave' },
	{ value: 'blip', label: 'Blip' },
	{ value: 'beep', label: 'Beep' },
];

export function ToneSelector() {
	const dispatch = useDispatch();
	const toneSet = useSelector(
		(state: RootState) => state.user.settings.audioPreferences.toneSet
	);

	const handleToneChange = (value: ToneSet) => {
		dispatch(updateAudioPreferences({ toneSet: value }));
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className={clsx(
						'flex h-[48px] items-center justify-start gap-2 rounded-[--radius] border border-border bg-background p-2 px-3 text-sm font-medium text-muted-foreground hover:bg-secondary/30 hover:text-card-foreground'
					)}
				>
					<Volume2 className="h-6 w-6" />
					<div>Metronome: {capitalize(toneSet)}</div>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{toneOptions.map((option) => (
					<DropdownMenuItem
						key={option.value}
						onClick={() => handleToneChange(option.value)}
					>
						{option.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
