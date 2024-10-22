import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
	updateConfig,
	setTimerMode,
	setTimerStatus,
	setTimerDuration,
	setMetronomeVolume,
	updateSessionComments,
} from '@/store/session-slice';

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetFooter,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from './ui/textarea';

interface SessionConfigProps {
	initialOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function SessionConfig({
	initialOpen,
	onOpenChange,
}: SessionConfigProps) {
	const dispatch = useDispatch();
	const { config, metronome } = useSelector(
		(state: RootState) => state.sessions
	);

	const handleSelectChange = (value: string, field: keyof typeof config) => {
		dispatch(updateConfig({ [field]: value }));
	};

	const handleVolumeChange = (value: number[]) => {
		dispatch(setMetronomeVolume(value[0]));
	};

	const handleMetronomeChange = (checked: boolean) => {
		dispatch(updateConfig({ useMetronome: checked }));
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		dispatch(setTimerStatus('playing'));
		dispatch(setTimerMode('countdown'));
		dispatch(setTimerDuration(Number(config.sessionDuration) * 60));
		onOpenChange(false);
	};

	const handleCommentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(updateSessionComments(e.target.value));
	};

	return (
		<Sheet open={initialOpen} onOpenChange={onOpenChange}>
			<SheetContent side="right" className="w-full sm:w-[540px] sm:max-w-full">
				<SheetHeader className="mb-6">
					<SheetTitle>Configure Practice Session</SheetTitle>
					<SheetDescription>Customize your session parameters</SheetDescription>
				</SheetHeader>
				<form onSubmit={handleSubmit} className="space-y-6">
					<ScrollArea className="h-[calc(100vh-12rem)] pr-4">
						<div className="space-y-6">
							<div className="space-y-2">
								<Label htmlFor="sessionName">Session Name</Label>
								<Input
									id="sessionName"
									value={config.sessionName}
									onChange={(e) =>
										handleSelectChange(e.target.value, 'sessionName')
									}
									placeholder="Enter session name"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="sessionComments">Session Comments</Label>
								<Textarea
									id="sessionComments"
									value={config.sessionComments}
									onChange={handleCommentsChange}
									placeholder="Add comments about your session"
									rows={4}
								/>
							</div>


							<div className="space-y-2">
								<Label>Key and Scale</Label>
								<div className="flex gap-2">
									<Select
										value={config.keySignature}
										onValueChange={(value) =>
											handleSelectChange(value, 'keySignature')
										}
									>
										<SelectTrigger className="w-[70px]">
											<SelectValue placeholder="Key" />
										</SelectTrigger>
										<SelectContent>
											{[
												'C',
												'D',
												'E',
												'F',
												'G',
												'A',
												'B',
												'Ab',
												'Bb',
												'Db',
												'Eb',
												'Gb',
											].map((key) => (
												<SelectItem key={key} value={key}>
													{key}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<Select
										value={config.scaleType}
										onValueChange={(value) =>
											handleSelectChange(value, 'scaleType')
										}
									>
										<SelectTrigger className="w-[calc(100%-78px)]">
											<SelectValue placeholder="Scale Type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="major">Major</SelectItem>
											<SelectItem value="lydian">Lydian (#4)</SelectItem>
											<SelectItem value="mixolydian">
												Mixolydian (b7)
											</SelectItem>
											<SelectItem value="dorian">Dorian (b3 b7)</SelectItem>
											<SelectItem value="minor">Minor</SelectItem>
											<SelectItem value="phrygian">
												Phrygian (min b2)
											</SelectItem>
											<SelectItem value="locrian">
												Locrian (min b2 b5)
											</SelectItem>
											<SelectItem value="blues">Blues (b5)</SelectItem>
											<SelectItem value="harmonic-minor">
												Harmonic Minor (min #7)
											</SelectItem>
											<SelectItem value="melodic-minor">
												Melodic Minor (min #6 #7)
											</SelectItem>
											<SelectItem value="diminished">Diminished</SelectItem>
											<SelectItem value="augmented">Augmented</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="space-y-2">
								<Label>Time Signature</Label>
								<Select
									value={config.timeSignature}
									onValueChange={(value) =>
										handleSelectChange(value, 'timeSignature')
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Time Signature" />
									</SelectTrigger>
									<SelectContent>
										{[
											'1/4',
											'2/4',
											'3/4',
											'4/4',
											'5/4',
											'6/8',
											'7/8',
											'8/8',
											'9/8',
											'11/8',
											'12/8',
											'13/8',
										].map((time) => (
											<SelectItem key={time} value={time}>
												{time}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label>Duration (minutes)</Label>
								<Input
									type="number"
									min="1"
									max="60"
									value={config.sessionDuration}
									onChange={(e) =>
										handleSelectChange(e.target.value, 'sessionDuration')
									}
									placeholder="Enter duration"
								/>
							</div>
							<div className="space-y-6">
								<div className="flex items-center">
									<Label>Tempo</Label>
									<div className="ml-2 text-right text-muted-foreground">
										{config.tempo} BPM
									</div>
								</div>
								<Slider
									min={40}
									max={208}
									step={4}
									value={[config.tempo]}
									onValueChange={(value) =>
										handleSelectChange(value[0].toString(), 'tempo')
									}
								/>
							</div>

							<div className="space-y-4">
								<div className="flex flex-col items-start">
									<Label className="mb-4">Metronome</Label>
									<Switch
										checked={config.useMetronome}
										onCheckedChange={handleMetronomeChange}
									/>
								</div>
							</div>
						</div>
					</ScrollArea>
					<SheetFooter>
						<Button type="submit" className="w-full">
							Start Session
						</Button>
					</SheetFooter>
				</form>
			</SheetContent>
		</Sheet>
	);
}