'use client';

import NavSidebar from '@/components/nav-sidebar';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import clsx from 'clsx';

export default function Layout({ children }: { children: React.ReactNode }) {
	const isVisible = useSelector((state: RootState) => state.ui.sidebarVisible);

	return (
		<div className="flex h-screen flex-col lg:flex-row lg:overflow-hidden">
			<div
				className={clsx(
					'w-full flex-none transition-all duration-300 lg:overflow-y-auto',
					{
						'lg:w-64': isVisible,
						'lg:w-20': !isVisible,
					}
				)}
			>
				<NavSidebar />
			</div>
			<div className="flex-grow px-6 pb-[76px] lg:overflow-y-auto lg:py-12 lg:pb-6">
				{children}
			</div>
		</div>
	);
}
