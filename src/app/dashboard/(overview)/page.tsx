'use client'; // remove once we remove useEffect & useState for loading simulation (i.e. once we fetch real data)

import React, { useState, useEffect } from 'react';
import DashboardSkeleton from '@/app/skeletons';
import DashboardHome from '@/components/dashboard-home';

const Overview = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulate API call
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	if (isLoading) {
		return <DashboardSkeleton />;
	}

	return <DashboardHome />;
};

export default Overview;
