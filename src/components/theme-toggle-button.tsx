'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setTheme } from '@/store/theme-slice';

export function ThemeToggle() {
	const dispatch = useDispatch();
	const themeMode = useSelector((state: RootState) => state.theme.mode);

	const toggleTheme = () => {
		const modes = ['light', 'dark'] as const;
		const currentIndex = modes.indexOf(themeMode);
		const nextIndex = (currentIndex + 1) % modes.length;
		dispatch(setTheme(modes[nextIndex]));
	};

	return (
		<button
			onClick={toggleTheme}
			className="fixed right-4 top-4 rounded-md bg-primary p-2 text-background"
		>
			Theme: {themeMode.charAt(0).toUpperCase() + themeMode.slice(1)}
		</button>
	);
}
