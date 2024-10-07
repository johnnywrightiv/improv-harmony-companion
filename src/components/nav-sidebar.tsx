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
		<div
			className={clsx('flex h-full flex-col p-2 transition-all duration-300', {
				'md:w-64': isVisible,
				'md:w-20': !isVisible,
			})}
		>
			<div className="relative">
				{/* show/hide button - only visible on md and above */}
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
				>
					<ChevronLeft
						className={clsx('h-6 w-6 transition-transform', {
							'rotate-180': !isVisible,
						})}
					/>
				</Button>

				{/* Logo Section */}
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
					>
						<AcmeLogo isVisible={isVisible} />
					</Link>
				</div>
			</div>

			{/* Navigation Links */}
			<div className="flex grow flex-col justify-between">
				<div className="hidden md:flex md:grow md:flex-col md:space-y-2">
					{links.map((link) => {
						const LinkIcon = link.icon;
						return (
							<Link
								key={link.name}
								href={link.href}
								className={clsx(
									'flex h-[48px] items-center rounded-md text-sm font-medium text-primary hover:text-text',
									{
										'justify-start gap-2 p-2 px-3': isVisible,
										'justify-center p-1': !isVisible,
										'bg-secondary/30 text-text': pathname === link.href,
									}
								)}
							>
								<LinkIcon className="w-6" />
								{isVisible && <p className="hidden md:block">{link.name}</p>}
							</Link>
						);
					})}
				</div>

				{/* Mobile bottom navigation */}
				<div className="bg-background/muted fixed bottom-0 left-0 right-0 flex flex-row justify-between space-x-2 border-t border-primary p-2 md:hidden">
					{links.map((link) => {
						const LinkIcon = link.icon;
						return (
							<Link
								key={link.name}
								href={link.href}
								className={clsx(
									'flex h-[48px] grow items-center justify-center rounded-md p-3 text-sm font-medium text-primary hover:bg-secondary/30 hover:text-text',
									{
										'bg-secondary/30 text-text': pathname === link.href,
									}
								)}
							>
								<LinkIcon className="w-6" />
							</Link>
						);
					})}
				</div>

				{/* Sign out button - only visible on desktop */}
				<SignOut />
			</div>
		</div>
	);
}
