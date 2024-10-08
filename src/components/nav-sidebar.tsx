'use client';

import Link from 'next/link';
import AcmeLogo from '@/components/acme-logo';
import {
	CircleUser,
	House,
	File,
	CircleDollarSign,
	ChevronLeft,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '@/store/sidebar-slice';
import type { RootState } from '@/store/store';
import { Button } from './ui/button';
import { SignOut } from '@/components/sign-out';

const links = [
	{ name: 'Home', href: '/dashboard', icon: House },
	{ name: 'Orders', href: '/dashboard/orders', icon: CircleDollarSign },
	{ name: 'Invoices', href: '/dashboard/invoices', icon: File },
	{ name: 'Profile', href: '/dashboard/profile', icon: CircleUser },
];

export default function NavSidebar() {
	const pathname = usePathname();
	const dispatch = useDispatch();
	const isVisible = useSelector((state: RootState) => state.sidebar.isVisible);

	return (
		<nav
			className={clsx('flex h-full flex-col p-2 transition-all duration-300', {
				'md:w-64': isVisible,
				'md:w-20': !isVisible,
			})}
			aria-label="Main Navigation"
		>
			<div className="relative">
				<Button
					variant="ghost"
					onClick={() => dispatch(toggleSidebar())}
					className={clsx(
						'top absolute z-10 hidden rounded-full p-2 text-text hover:bg-secondary/30 md:block',
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
						'relative mb-2 flex items-center justify-center rounded-md bg-gradient-to-br from-primary to-secondary',
						{
							'h-40 p-1': isVisible,
							'h-30 p-2': !isVisible,
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
						<AcmeLogo isVisible={isVisible} />
					</Link>
				</div>
			</div>

			<div className="flex grow flex-col justify-between">
				<ul
					className="hidden md:flex md:grow md:flex-col md:space-y-2"
					role="list"
				>
					{links.map((link) => {
						const LinkIcon = link.icon;
						return (
							<li key={link.name}>
								<Link
									href={link.href}
									className={clsx(
										'flex h-[48px] items-center rounded-md text-sm font-medium text-primary hover:text-text focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
										{
											'justify-start gap-2 p-2 px-3': isVisible,
											'justify-center p-1': !isVisible,
											'bg-secondary/30 text-text': pathname === link.href,
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

				<div
					className="bg-background/muted fixed bottom-0 left-0 right-0 flex flex-row justify-between space-x-2 border-t border-primary p-2 md:hidden"
					role="navigation"
					aria-label="Mobile Navigation"
				>
					{links.map((link) => {
						const LinkIcon = link.icon;
						return (
							<Link
								key={link.name}
								href={link.href}
								className={clsx(
									'flex h-[48px] grow items-center justify-center rounded-md p-3 text-sm font-medium text-primary hover:bg-secondary/30 hover:text-text focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
									{
										'bg-secondary/30 text-text': pathname === link.href,
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

				<SignOut />
			</div>
		</nav>
	);
}
