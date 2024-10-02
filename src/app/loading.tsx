import React from 'react';

const Loading = () => {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="border-warning border-t-primary h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-solid"></div>
		</div>
	);
};

export default Loading;
