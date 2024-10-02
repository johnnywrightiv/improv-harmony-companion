'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setTheme } from '@/store/theme-slice';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const dispatch = useDispatch();
	const themeMode = useSelector((state: RootState) => state.theme.mode);

	// Load saved theme on mount
	useEffect(() => {
		const savedTheme = localStorage.getItem('theme') as
			| 'light'
			| 'dark'
			| 'system'
			| null;
		if (savedTheme) {
			dispatch(setTheme(savedTheme));
		}
	}, [dispatch]);

	// Apply theme changes and save to localStorage
	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove('light', 'dark');

		let effectiveTheme = themeMode;
		if (themeMode === 'system') {
			effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';
		}

		root.classList.add(effectiveTheme);
		localStorage.setItem('theme', themeMode);
	}, [themeMode]);

	return <>{children}</>;
}
