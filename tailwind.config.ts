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
					DEFAULT: 'rgba(var(--text))', // Default text color
					muted: 'rgba(var(--text-muted))', // Muted text color
				},
				background: {
					DEFAULT: 'rgba(var(--background))', // Default background color
					muted: 'rgba(var(--background-muted))', // Muted background color
				},
				primary: 'rgba(var(--primary))', // Default primary color
				secondary: 'rgba(var(--secondary))', // Default secondary color
				accent: 'rgba(var(--accent))', // Default accent color
				gradient: 'var(--gradient)', // Primary > Secondary, Linear 135deg
				success: 'rgba(var(--success))',
				error: 'rgba(var(--error))',
				warning: 'rgba(var(--warning))',
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
				shimmer: {
					'100%': { transform: 'translateX(100%)' },
				},
			},

			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				shimmer: 'shimmer 2s infinite',
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
