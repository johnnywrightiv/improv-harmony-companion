'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

type ColorInfo = {
	name: string;
	bgClass: string;
	textClass: string;
};

type ColorValues = {
	hsl: string;
	hex: string;
};

const colors: ColorInfo[] = [
	{
		name: 'Foreground',
		bgClass: 'bg-foreground',
		textClass: 'text-foreground',
	},
	{
		name: 'Background',
		bgClass: 'bg-background',
		textClass: 'text-background',
	},
	{ name: 'Primary', bgClass: 'bg-primary', textClass: 'text-primary' },
	{
		name: 'Destructive',
		bgClass: 'bg-destructive',
		textClass: 'text-destructive',
	},
	{ name: 'Secondary', bgClass: 'bg-secondary', textClass: 'text-secondary' },
	{ name: 'Warning', bgClass: 'bg-warning', textClass: 'text-warning' },
	{ name: 'Accent', bgClass: 'bg-accent', textClass: 'text-accent' },
	{ name: 'Success', bgClass: 'bg-success', textClass: 'text-success' },
];

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
	r /= 255;
	g /= 255;
	b /= 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0;
	let s = 0;
	const l = (max + min) / 2;

	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}

		h /= 6;
	}

	return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

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
	const [colorValues, setColorValues] = useState<ColorValues>({
		hsl: '',
		hex: '',
	});
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

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
				const [h, s, l] = rgbToHsl(r, g, b);
				const hex = rgbToHex(r, g, b);
				setColorValues({
					hsl: `hsl(${h}, ${s}%, ${l}%)`,
					hex: hex,
				});
			}
		};

		if (mounted) {
			updateColorValues();
		}
	}, [color.textClass, resolvedTheme, mounted]);

	if (!mounted) {
		return null;
	}

	return (
		<div className="space-y-2">
			{color.name === 'Foreground' ? (
				<div
					className="h-20 rounded-[--radius] border-2 border-border/50"
					style={{ backgroundColor: colorValues.hsl }}
				/>
			) : (
				<div
					className={`h-20 rounded-[--radius] border-2 border-border/50 ${color.bgClass}`}
				/>
			)}
			<p className="text-sm font-medium">{color.name}</p>
			<p className="text-xs text-muted-foreground">
				HSL:{' '}
				<span
					className={
						color.name === 'Background' ? 'text-foreground' : color.textClass
					}
				>
					{colorValues.hsl}
				</span>
			</p>
			<p className="text-xs text-muted-foreground">
				HEX:{' '}
				<span
					className={
						color.name === 'Background' ? 'text-foreground' : color.textClass
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
