'use client'; // remove once we remove useEffect & useState for loading simulation (i.e. once we fetch real data)

import React, { useState, useEffect } from 'react';
import { ProgressSkeleton } from '@/app/skeletons';
import ProgressPage from '@/components/progress-page';

const Progress = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulate API call
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);
		return () => clearTimeout(timer);
	}, []);

	if (isLoading) {
		return <ProgressSkeleton />;
	}

	return <ProgressPage />;
};

export default Progress;
