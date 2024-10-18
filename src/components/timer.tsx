import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setTimerStatus, timerTick } from '@/store/session-slice';

export const Timer: React.FC = () => {
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

	return (
		<div className="text-4xl font-bold">{formatTime(timer.currentTime)}</div>
	);
};
