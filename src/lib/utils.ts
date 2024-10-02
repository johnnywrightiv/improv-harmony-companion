import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const capitalize = (input: string): string => {
	if (typeof input !== 'string' || input.length === 0) return input;
	return input.charAt(0).toUpperCase() + input.slice(1);
};
