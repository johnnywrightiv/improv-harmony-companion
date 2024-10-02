'use client';

import React from 'react';
// import NavigateButton from '@/components/navigate-button';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
	return (
		<div className="bg-error p-4">
			<h1 className="text-2xl">Oops, something went wrong!</h1>
			<p>
				<strong>Error:</strong> {error.message}
			</p>
			{/* <button
				className="mr-2 rounded bg-primary px-4 py-2 text-text hover:scale-105 hover:bg-blue-700"
				onClick={() => reset()}
			>
				Try again
			</button> */}
			{/* <NavigateButton route="/" label="Back to Home Page" /> */}
		</div>
	);
};

export default Error;
