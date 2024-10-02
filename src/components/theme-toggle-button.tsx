'use client';

import { useTheme } from './theme-provider';

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className="bg-primary fixed right-4 top-4 rounded-md p-2 text-background"
		>
			{theme === 'light' ? 'Dark' : 'Light'}
		</button>
	);
}
