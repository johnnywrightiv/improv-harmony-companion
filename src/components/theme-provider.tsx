// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';

// type Theme = 'light' | 'dark';

// type ThemeContextType = {
// 	theme: Theme;
// 	toggleTheme: () => void;
// };

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export function ThemeProvider({ children }: { children: React.ReactNode }) {
// 	const [theme, setTheme] = useState<Theme>('light');

// 	useEffect(() => {
// 		// On mount, read the theme from localStorage or system preference
// 		const savedTheme = localStorage.getItem('theme') as Theme;
// 		const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
// 			.matches
// 			? 'dark'
// 			: 'light';
// 		setTheme(savedTheme || systemTheme);
// 	}, []);

// 	useEffect(() => {
// 		// When theme changes, update the document class and localStorage
// 		document.documentElement.classList.toggle('dark', theme === 'dark');
// 		localStorage.setItem('theme', theme);
// 	}, [theme]);

// 	const toggleTheme = () => {
// 		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
// 	};

// 	return (
// 		<ThemeContext.Provider value={{ theme, toggleTheme }}>
// 			{children}
// 		</ThemeContext.Provider>
// 	);
// }

// export function useTheme() {
// 	const context = useContext(ThemeContext);
// 	if (context === undefined) {
// 		throw new Error('useTheme must be used within a ThemeProvider');
// 	}
// 	return context;
// }

'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
	theme: Theme;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = useState(false);
	const [theme, setTheme] = useState<Theme>('light');

	useEffect(() => {
		setMounted(true);
		const storedTheme = localStorage.getItem('theme') as Theme | null;
		if (storedTheme) {
			setTheme(storedTheme);
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setTheme('dark');
		}
	}, []);

	useEffect(() => {
		if (!mounted) return;

		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(theme);
		localStorage.setItem('theme', theme);
	}, [theme, mounted]);

	if (!mounted) {
		return null;
	}

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
}