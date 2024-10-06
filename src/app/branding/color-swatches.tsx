'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

type ColorInfo = {
	name: string;
	bgClass: string;
	textClass: string;
};

const colors: ColorInfo[] = [
	{ name: 'Text', bgClass: 'bg-text', textClass: 'text-text' },
	{
		name: 'Background',
		bgClass: 'bg-background',
		textClass: 'text-background',
	},
	{ name: 'Primary', bgClass: 'bg-primary', textClass: 'text-primary' },
	{ name: 'Success', bgClass: 'bg-success', textClass: 'text-success' },
	{ name: 'Secondary', bgClass: 'bg-secondary', textClass: 'text-secondary' },
	{ name: 'Warning', bgClass: 'bg-warning', textClass: 'text-warning' },
	{ name: 'Accent', bgClass: 'bg-accent', textClass: 'text-accent' },
	{ name: 'Error', bgClass: 'bg-error', textClass: 'text-error' },
];

function rgbToHex(r: number, g: number, b: number): string {
	return (
		'#' +
		[r, g, b]
			.map((x) => {
				const hex = x.toString(16);
				return hex.length === 1 ? '0' + hex : hex;
			})
			.join('')
	);
}

function ColorSwatch({ color }: { color: ColorInfo }) {
	const [colorValues, setColorValues] = useState({ rgb: '', hex: '' });
	const { theme, systemTheme } = useTheme();

	useEffect(() => {
		const updateColorValues = () => {
			const testEl = document.createElement('div');
			testEl.className = color.textClass;
			document.body.appendChild(testEl);

			const computedStyle = window.getComputedStyle(testEl);
			const colorValue = computedStyle.color;
			document.body.removeChild(testEl);

			const rgbMatch = colorValue.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			if (rgbMatch) {
				const [r, g, b] = rgbMatch.map(Number);
				const hex = rgbToHex(r, g, b);
				setColorValues({ rgb: colorValue, hex: hex });
			}
		};

		// Only run on client-side
		if (typeof window !== 'undefined') {
			updateColorValues();
		}
	}, [color.textClass, theme, systemTheme]);

	return (
		<div className="space-y-2">
			<div
				className={`h-20 rounded-md border-2 border-background-muted ${color.bgClass}`}
			/>
			<p className="text-sm font-medium">{color.name}</p>
			<p className="text-xs text-text-muted">
				RGB:{' '}
				<span
					className={
						color.name === 'Background' || color.bgClass === 'bg-background'
							? 'text-text'
							: color.textClass
					}
				>
					{colorValues.rgb}
				</span>
			</p>
			<p className="text-xs text-text-muted">
				HEX:{' '}
				<span
					className={
						color.name === 'Background' || color.bgClass === 'bg-background'
							? 'text-text'
							: color.textClass
					}
				>
					{colorValues.hex}
				</span>
			</p>
		</div>
	);
}

export function ColorSwatches() {
	return (
		<div className="space-y-4">
			<h2>Colors</h2>
			<div className="grid grid-cols-2 gap-4">
				{colors.map((color) => (
					<ColorSwatch key={color.name} color={color} />
				))}
			</div>
		</div>
	);
}
