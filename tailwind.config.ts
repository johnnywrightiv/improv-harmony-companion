// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				text: {
					DEFAULT: 'var(--text)',
					muted: 'var(--text-muted)',
				},
				background: {
					DEFAULT: 'var(--background)',
					muted: 'var(--background-muted)',
				},
				primary: {
					DEFAULT: 'var(--primary)', // Default primary color
					light: 'var(--primary-light)', // Lighter version
					dark: 'var(--primary-dark)', // Darker version
					muted: 'var(--primary-muted)', // Muted version
				},
				secondary: {
					DEFAULT: 'var(--secondary)', // Default secondary color
					light: 'var(--secondary-light)', // Lighter version
					dark: 'var(--secondary-dark)', // Darker version
					muted: 'var(--secondary-muted)', // Muted version
				},
				accent: {
					DEFAULT: 'var(--accent)', // Default accent color
					light: 'var(--accent-light)', // Lighter version
					dark: 'var(--accent-dark)', // Darker version
					muted: 'var(--accent-muted)', // Muted version
				},
				gradient: 'var(--gradient)', // Primary to Secondary, Linear 135deg
				success: 'var(--success)',
				error: 'var(--error)',
				warning: 'var(--warning)',
			},

			fontFamily: {
				sans: ['Arial', 'Helvetica', 'sans-serif'],
			},
		},
	},
	plugins: [],
};

export default config;
