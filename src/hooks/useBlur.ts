import { useEffect, useRef, MutableRefObject } from 'react';

function useBlur(callback: () => void): MutableRefObject<HTMLElement | null> {
	const ref = useRef<HTMLElement | null>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		}

		function handleEscapeKey(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				callback();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscapeKey);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscapeKey);
		};
	}, [callback]);

	return ref;
}

export default useBlur;
