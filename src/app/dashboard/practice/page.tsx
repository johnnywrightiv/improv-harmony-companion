'use client';
// remove once we remove useEffect & useState for loading simulation (i.e. once we fetch real data)
import React, { useState, useEffect } from 'react';
import { PracticeSkeleton } from '@/app/skeletons';
import PracticePage from '@/components/practice-page';

const Practice = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulate API call
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);
		return () => clearTimeout(timer);
	}, []);

	if (isLoading) {
		return <PracticeSkeleton />;
	}

	return <PracticePage />;
};

export default Practice;
