'use client';

import React from 'react';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
	return (
		<div className="bg-error p-4">
			<h1>Oops, something went wrong!</h1>
			<p>
				<strong>Error:</strong> {error.message}
			</p>
			<button
				className="mr-2 rounded bg-primary px-4 py-2 text-text hover:scale-105 hover:bg-accent"
				onClick={() => reset()}
			>
				Try again
			</button>
		</div>
	);
};

export default Error;
