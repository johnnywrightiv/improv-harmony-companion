'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setTimerStatus, timerTick } from '@/store/session-slice';
import { Progress } from '@/components/ui/progress';

export const TimerProgress: React.FC = () => {
	const dispatch = useDispatch();
	const { timer } = useSelector((state: RootState) => state.sessions);

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (timer.status === 'playing') {
			interval = setInterval(() => {
				dispatch(timerTick());
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [timer.status, dispatch]);

	useEffect(() => {
		if (
			timer.mode === 'countdown' &&
			timer.currentTime === 0 &&
			timer.status === 'playing'
		) {
			dispatch(setTimerStatus('stopped'));
		}
	}, [timer.mode, timer.currentTime, timer.status, dispatch]);

	const formatTime = (time: number) => {
		const minutes = Math.floor(Math.abs(time) / 60);
		const seconds = Math.abs(time) % 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	};

	// Calculate progress percentage
	const calculateProgress = () => {
		if (!timer.duration) return 0;
		const elapsed = timer.duration - timer.currentTime;
		return Math.round((elapsed / timer.duration) * 100);
	};

	const progress = calculateProgress();

	return (
		<div className="w-full space-y-4">
			<div className="text-center">
        <p className="text-foreground text-xl font-semibold">
          {formatTime(timer.currentTime)} / {formatTime(timer.duration || 0)}
        </p>
			</div>

			<div className="relative ">
				<Progress
					value={progress}
					className="h-4 w-full rounded-[--radius] bg-accent"
				/>
				{progress > 0 && (
					<div
						className="absolute inset-0 rounded-[--radius] bg-primary"
						style={{
              clipPath: `polygon(0 0, ${progress}% 0, ${progress}% 100%, 0 100%)`,
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default TimerProgress;
