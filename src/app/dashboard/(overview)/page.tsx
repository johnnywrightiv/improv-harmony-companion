'use client'; // remove and place in DashboardHome once we actually fetch data if possible rather than declaring in page.tsx

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
