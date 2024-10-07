'use client';

import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { increment, decrement } from '@/store/counter-slice';
import { RootState } from '@/store/store';

export function Counter() {
	const dispatch = useDispatch();
	const count = useSelector((state: RootState) => state.counter.value);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Counter: {count}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex justify-center gap-4">
					<Button onClick={() => dispatch(decrement())}>-</Button>
					<Button onClick={() => dispatch(increment())}>+</Button>
				</div>
			</CardContent>
		</Card>
	);
}
