'use client';

import NavSidebar from '@/components/nav-sidebar';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import clsx from 'clsx';

export default function Layout({ children }: { children: React.ReactNode }) {
	const isVisible = useSelector((state: RootState) => state.sidebar.isVisible);

	return (
		<div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
			<div
				className={clsx(
					'w-full flex-none transition-all duration-300 md:overflow-y-auto',
					{
						'md:w-64': isVisible,
						'md:w-20': !isVisible,
					}
				)}
			>
				<NavSidebar />
			</div>
			<div className="flex-grow px-6 pb-[76px] md:overflow-y-auto md:py-12 md:pb-6">
				{children}
			</div>
		</div>
	);
}
