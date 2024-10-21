'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setPracticeGoal } from '@/store/user-slice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { CircleCheck } from 'lucide-react';

const SetPracticeGoalDialog = () => {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const { dailyGoal } = useSelector(
		(state: RootState) => state.user.settings.practiceGoal
	);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: { dailyGoal: dailyGoal || '' },
	});

	const watchDailyGoal = watch('dailyGoal', dailyGoal || 0);

	const onSubmit = (data: { dailyGoal: number }) => {
		dispatch(setPracticeGoal({ dailyGoal: data.dailyGoal }));
		setOpen(false);
	};

	const weeklyHours = (watchDailyGoal / 60) * 7;
	const options = [
		{ sessions: 1, duration: watchDailyGoal, frequency: 'day' },
		{ sessions: 3, duration: Math.round(watchDailyGoal / 3), frequency: 'day' },
		{ sessions: 1, duration: watchDailyGoal * 2, frequency: 'other day' },
	];

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					className="flex h-[48px] items-center justify-start gap-2 rounded-[--radius] border border-border bg-background p-2 px-3 text-sm font-medium text-muted-foreground hover:bg-secondary/30 hover:text-card-foreground"
				>
					<CircleCheck className="w-6" />
					<div>Set Goal</div>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Set Your Practice Goal</DialogTitle>
					<DialogDescription>
						How many minutes would you like to practice each day?
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="dailyGoal" className="text-right">
								Minutes per day
							</Label>
							<Input
								id="dailyGoal"
								type="number"
								className="col-span-3"
								{...register('dailyGoal', {
									required: true,
									min: 1,
									max: 120,
								})}
							/>
						</div>
						{errors.dailyGoal && (
							<p className="text-sm text-destructive">
								Please enter a number between 1 and 120.
							</p>
						)}
						{watchDailyGoal > 0 && !errors.dailyGoal && (
							<div className="mt-4">
								<p className="font-semibold">
									Weekly practice time: {weeklyHours.toFixed(1)} hours
								</p>
								<p className="mt-2 font-semibold">Ways to achieve your goal:</p>
								<ul className="mt-1 list-disc pl-5">
									{options.map((option, index) => (
										<li key={index}>
											{option.sessions} session{option.sessions > 1 ? 's' : ''}{' '}
											of {option.duration} minutes every {option.frequency}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
					<DialogFooter>
						<Button type="submit">Set Goal</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default SetPracticeGoalDialog;
