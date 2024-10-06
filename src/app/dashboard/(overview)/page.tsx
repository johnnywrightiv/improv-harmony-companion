'use client';

import React, { useState, useEffect } from 'react';
import DashboardSkeleton from '@/app/skeletons';
import DashboardHome from '@/components/dashboard-home';

const ProfilePage = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulate API call
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	if (isLoading) {
		return <DashboardSkeleton />;
	}

	return <DashboardHome />;
};

export default ProfilePage;
