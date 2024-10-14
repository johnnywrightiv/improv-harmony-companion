'use client';

import Link from 'next/link';
import AcmeLogo from '@/components/acme-logo';
import {
	CircleUser,
	House,
	ChartColumnBig,
	Music,
	ChevronLeft,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '@/store/sidebar-slice';
import type { RootState } from '@/store/store';
import { Button } from './ui/button';

const mainLinks = [
	{ name: 'Home', href: '/dashboard', icon: House },
	{ name: 'Practice', href: '/dashboard/practice', icon: Music },
	{ name: 'Progress', href: '/dashboard/progress', icon: ChartColumnBig },
];

const settingsLink = {
	name: 'Settings',
	href: '/dashboard/settings',
	icon: CircleUser,
};

export default function NavSidebar() {
	const pathname = usePathname();
	const dispatch = useDispatch();
	const isVisible = useSelector((state: RootState) => state.sidebar.isVisible);

	return (
		<nav
			className={`flex h-full flex-col p-2 transition-all duration-300
        ${isVisible ? 'md:w-64' : 'md:w-20'}`}
			aria-label="Main Navigation"
		>
			<div className="relative">
				<Button
					variant="ghost"
					onClick={() => dispatch(toggleSidebar())}
					className={clsx(
						'top text-foreground absolute z-10 hidden rounded-[--radius] p-2 hover:bg-secondary/30 md:block',
						{
							'right-2': isVisible,
							'left-1/2 -translate-x-1/2': !isVisible,
						}
					)}
					aria-label={isVisible ? 'Collapse sidebar' : 'Expand sidebar'}
				>
					<ChevronLeft
						className={clsx('h-6 w-6 transition-transform', {
							'rotate-180': !isVisible,
						})}
					/>
				</Button>

				<div
					className={clsx(
						'relative mb-2 flex items-center justify-center rounded-[--radius] bg-gradient-to-br from-primary to-secondary',
						{
							'h-40 p-1': isVisible,
							'h-30	 p-2': !isVisible,
						}
					)}
				>
					<Link
						href="/"
						className={clsx('flex items-center justify-center', {
							'w-full': isVisible,
							'mt-8 h-12 w-12 pl-2': !isVisible,
						})}
						aria-label="Go to homepage"
					>
						<AcmeLogo displayText={isVisible} />
					</Link>
				</div>
			</div>

			<div className="flex grow flex-col justify-between">
				{/* Main links */}
				<ul className="hidden md:flex md:flex-col md:space-y-2" role="list">
					{mainLinks.map((link) => {
						const LinkIcon = link.icon;
						return (
							<li key={link.name}>
								<Link
									href={link.href}
									className={clsx(
										'flex h-[48px] items-center rounded-[--radius] text-sm font-medium text-muted-foreground hover:text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary',
										{
											'justify-start gap-2 p-2 px-3': isVisible,
											'justify-center p-1': !isVisible,
											'hover:text-foreground bg-secondary/30  text-primary ring-1 ring-ring hover:text-primary':
												pathname === link.href,
										}
									)}
									aria-current={pathname === link.href ? 'page' : undefined}
								>
									<LinkIcon className="w-6" aria-hidden="true" />
									{isVisible && (
										<span className="hidden md:block">{link.name}</span>
									)}
									<span className="sr-only">{link.name}</span>
								</Link>
							</li>
						);
					})}
				</ul>

				{/* Settings link at bottom */}
				<div className="hidden md:block">
					<Link
						href={settingsLink.href}
						className={clsx(
							'flex h-[48px] items-center rounded-[--radius] text-sm font-medium text-muted-foreground hover:text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary',
							{
								'justify-start gap-2 p-2 px-3': isVisible,
								'justify-center p-1': !isVisible,
								'bg-secondary/30  text-primary ring-1 ring-ring hover:text-primary':
									pathname === settingsLink.href, // Active state
							}
						)}
						aria-current={pathname === settingsLink.href ? 'page' : undefined}
					>
						<settingsLink.icon className="w-6" aria-hidden="true" />
						{isVisible && (
							<span className="hidden md:block">{settingsLink.name}</span>
						)}
						<span className="sr-only">{settingsLink.name}</span>
					</Link>
				</div>

				{/* Mobile Dashboard Nav */}
				<div
					className="fixed bottom-0 left-0 right-0 z-10 flex flex-row justify-between space-x-2 border-t border-primary bg-background p-2 md:hidden"
					role="navigation"
					aria-label="Mobile Navigation"
				>
					{[...mainLinks, settingsLink].map((link) => {
						const LinkIcon = link.icon;
						return (
							<Link
								key={link.name}
								href={link.href}
								className={clsx(
									'flex h-[48px] grow items-center justify-center rounded-[--radius] p-3 text-sm font-medium text-muted-foreground hover:bg-secondary/30 hover:text-card-foreground focus:outline-none focus:ring-1 focus:ring-primary',
									{
										'bg-secondary/30 text-primary hover:text-primary':
											pathname === link.href, // Active state
									}
								)}
								aria-current={pathname === link.href ? 'page' : undefined}
							>
								<LinkIcon className="w-6" aria-hidden="true" />
								<span className="sr-only">{link.name}</span>
							</Link>
						);
					})}
				</div>
			</div>
		</nav>
	);
}
