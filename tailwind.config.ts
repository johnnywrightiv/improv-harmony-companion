// tailwind.config.ts
import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate'; // Import shadcn-ui plugin

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		// Include the paths from shadcn (tailwind.config.js)
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
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
				gradient: 'var(--gradient)', // Primary > Secondary, Linear 135deg
				success: 'var(--success)',
				error: 'var(--error)',
				warning: 'var(--warning)',
			},

			keyframes: {
				// Merge animations from shadcn-ui
				'accordion-down': {
					from: { height: '0' }, // Use '0' as a string
					to: { height: 'var(--radix-accordion-content-height)' }, // Keep this as is
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' }, // Keep this as is
					to: { height: '0' }, // Use '0' as a string
				},
			},

			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		fontFamily: {
			sans: ['var(--font-geist-sans)', 'Arial', 'sans-serif'],
			mono: ['var(--font-geist-mono)', 'monospace'],
			heading: ['var(--font-heading)', 'serif'],
			decorative: ['var(--font-decorative)', 'cursive'],
		},
	},
	plugins: [
		tailwindcssAnimate, // Add shadcn-ui animation plugin
	],
};

export default config;
