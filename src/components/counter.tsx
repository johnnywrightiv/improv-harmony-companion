'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../store/counter-slice'; // Import the actions
import { RootState } from '../store/store'; // Import RootState from your store

const CounterComponent: React.FC = () => {
	const dispatch = useDispatch();

	// Get the current counter value from the Redux store
	const count = useSelector((state: RootState) => state.counter.value);

	return (
		<div style={{ textAlign: 'center', marginTop: '20px' }}>
			<h1>Counter: {count}</h1>
			<div>
				<button
					onClick={() => dispatch(decrement())}
					style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
				>
					-
				</button>
				<button
					onClick={() => dispatch(increment())}
					style={{ padding: '10px', fontSize: '16px' }}
				>
					+
				</button>
			</div>
		</div>
	);
};

export default CounterComponent;
