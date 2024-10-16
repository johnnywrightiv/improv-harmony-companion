import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setTimerStatus, timerTick } from '@/store/practice-session-slice';

export const Timer: React.FC = () => {
	const dispatch = useDispatch();
	const { mode, status, currentTime } = useSelector(
		(state: RootState) => state.practiceSession.timer
	);

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (status === 'playing') {
			interval = setInterval(() => {
				dispatch(timerTick());
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [status, dispatch]);

	useEffect(() => {
		if (mode === 'countdown' && currentTime === 0 && status === 'playing') {
			dispatch(setTimerStatus('stopped'));
		}
	}, [mode, currentTime, status, dispatch]);

	const formatTime = (time: number) => {
		const minutes = Math.floor(Math.abs(time) / 60);
		const seconds = Math.abs(time) % 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	};

	return <div className="text-4xl font-bold">{formatTime(currentTime)}</div>;
};
