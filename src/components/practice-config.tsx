import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { updateConfig, resetConfig } from '@/store/practice-config-slice';
import { RootState } from '@/store/store';
import { setPlaybackStatus } from '@/store/playback-slice';
import { setMode, setStatus, setDuration } from '@/store/timer-slice';

interface PracticeConfigProps {
	initialOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const PracticeConfig: React.FC<PracticeConfigProps> = ({
	initialOpen,
	onOpenChange,
}) => {
	const dispatch = useDispatch();
	const config = useSelector((state: RootState) => state.practiceConfig);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateConfig({ [e.target.id]: e.target.value }));
	};

	const handleSelectChange = (value: string, field: string) => {
		dispatch(updateConfig({ [field]: value }));
	};

	const handleSliderChange = (value: number[], field: string) => {
		dispatch(updateConfig({ [field]: value[0] }));
	};

	const handleSwitchChange = (checked: boolean) => {
		dispatch(updateConfig({ useMetronome: checked }));
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		console.log('Practice session configuration:', config);
		dispatch(setPlaybackStatus('playing'));
		dispatch(setMode('countdown'));
		dispatch(setDuration(Number(config.sessionDuration) * 60)); // Convert minutes to seconds
		dispatch(setStatus('playing'));
		onOpenChange(false);
	};

	return (
		<Sheet open={initialOpen} onOpenChange={onOpenChange}>
			<SheetContent side="right" className="w-full sm:w-[540px] sm:max-w-full">
				<SheetHeader>
					<SheetTitle>Configure Practice Session</SheetTitle>
					<SheetDescription>
						Customize your practice session parameters.
					</SheetDescription>
				</SheetHeader>
				<form onSubmit={handleSubmit}>
					<ScrollArea className="h-[calc(100vh-12rem)] pr-4">
						<div className="space-y-6 py-4">
							<div className="space-y-2">
								<Label htmlFor="sessionName">Session Name</Label>
								<Input
									id="sessionName"
									value={config.sessionName}
									onChange={handleInputChange}
									placeholder="Enter session name"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="keySignature">Key Signature</Label>
								<Input
									id="keySignature"
									value={config.keySignature}
									onChange={handleInputChange}
									placeholder="Enter key signature"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="timeSignature">Time Signature</Label>
								<Input
									id="timeSignature"
									value={config.timeSignature}
									onChange={handleInputChange}
									placeholder="Enter time signature"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="chordsNotes">Chords/Notes</Label>
								<Input
									id="chordsNotes"
									value={config.chordsNotes}
									onChange={handleInputChange}
									placeholder="Enter chords/notes"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="difficulty">Difficulty</Label>
								<Select
									onValueChange={(value) =>
										handleSelectChange(value, 'difficulty')
									}
								>
									<SelectTrigger id="difficulty">
										<SelectValue placeholder="Select difficulty" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="easy">Easy</SelectItem>
										<SelectItem value="medium">Medium</SelectItem>
										<SelectItem value="hard">Hard</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="flex items-center space-x-2">
								<Switch
									id="useMetronome"
									checked={config.useMetronome}
									onCheckedChange={handleSwitchChange}
								/>
								<Label htmlFor="useMetronome">Use Metronome</Label>
							</div>
							<div className="space-y-2">
								<Label htmlFor="sessionDuration">
									Session Duration (minutes)
								</Label>
								<Input
									id="sessionDuration"
									type="number"
									min="1"
									value={config.sessionDuration}
									onChange={handleInputChange}
									placeholder="Enter duration"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="tempo">Tempo (BPM)</Label>
								<Slider
									id="tempo"
									min={40}
									max={208}
									step={4}
									value={[config.tempo]}
									onValueChange={(value) => handleSliderChange(value, 'tempo')}
								/>
								<div className="text-right text-sm text-muted-foreground">
									{config.tempo} BPM
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="practiceType">Practice Type</Label>
								<Select
									onValueChange={(value) =>
										handleSelectChange(value, 'practiceType')
									}
								>
									<SelectTrigger id="practiceType">
										<SelectValue placeholder="Select practice type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="timed">Timed</SelectItem>
										<SelectItem value="freestyle">Freestyle</SelectItem>
										<SelectItem value="challenge">Challenge</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="skillFocus">Skill Focus</Label>
								<Select
									onValueChange={(value) =>
										handleSelectChange(value, 'skillFocus')
									}
								>
									<SelectTrigger id="skillFocus">
										<SelectValue placeholder="Select skill focus" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="technique">Technique</SelectItem>
										<SelectItem value="speed">Speed</SelectItem>
										<SelectItem value="endurance">Endurance</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</ScrollArea>
					<SheetFooter className="mt-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => dispatch(resetConfig())}
						>
							Reset
						</Button>
						<Button type="submit">Start Session</Button>
					</SheetFooter>
				</form>
			</SheetContent>
		</Sheet>
	);
};

export default PracticeConfig;
