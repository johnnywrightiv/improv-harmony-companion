'use client';

import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { increment, decrement } from '@/store/counter-slice';
import { RootState } from '@/store/store';

export function Counter() {
	const dispatch = useDispatch();
	const count = useSelector((state: RootState) => state.counter.value);

	return (
		<div>
			<div className="flex items-center justify-start gap-4">
				<Button onClick={() => dispatch(decrement())}>-</Button>
				<div>
					<h2 className="w-12 text-center">{count}</h2>{' '}
				</div>
				<Button onClick={() => dispatch(increment())}>+</Button>
			</div>
		</div>
	);
}
