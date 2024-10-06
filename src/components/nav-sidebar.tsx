'use client';

import Link from 'next/link';
import AcmeLogo from '@/components/acme-logo';
import {
	CirclePower,
	CircleUser,
	House,
	File,
	CircleDollarSign,
	ChevronLeft,
	Settings,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '@/store/sidebar-slice';
import type { RootState } from '@/store/store';
import { Button } from './ui/button';
import { Form } from './ui/form';

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
			className={clsx('flex h-full flex-col transition-all duration-300', {
				'md:w-64': isVisible,
				'md:w-16': !isVisible,
			})}
		>
			<div className="flex h-full flex-col px-3 py-4 md:px-2">

				{/* Logo Section */}
				<div className="relative mb-2 flex h-20 items-end justify-start rounded-md bg-gradient-to-br from-primary to-secondary  py-2 md:h-40">
					<Link href="/">
						<AcmeLogo isVisible={isVisible} />
					</Link>
										
					{/* show/hide button - only visible on md and above */}
					<Button
						variant="icon"
						onClick={() => dispatch(toggleSidebar())}
						className={clsx(
							'absolute top-2 hidden rounded-full p-2 text-text hover:bg-accent md:block'
						)}
					>
						<ChevronLeft
							className={clsx('h-6 w-6 transition-transform', {
								'rotate-180': !isVisible, // Rotates the Chevron based on sidebar visibility
							})}
						/>
					</Button>

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
										'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-background/muted p-3 text-sm text-primary font-medium hover:text-text md:flex-none md:justify-start md:p-2 md:px-3',
										{
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
					<div className="fixed bottom-0 left-0 right-0 flex flex-row justify-between space-x-2 border-t border-primary bg-background/muted p-2 md:hidden">
						{links.map((link) => {
							const LinkIcon = link.icon;
							return (
								<Link
									key={link.name}
									href={link.href}
									className={clsx(
										'flex h-[48px] grow items-center justify-center rounded-md p-3 text-sm font-medium text-primary hover:text-text hover:bg-secondary/30',
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
					<Form>
						<form
							action={async () => {
								// await signOut();
							}}
							className="hidden md:block"
						>
							<Button 
								variant="icon" 
								className={clsx(
									'flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium bg-background text-primary hover:text-text hover:bg-secondary/30 md:flex-none md:justify-start md:p-2 md:px-3'
								)}
								type="submit"
							>
								<CirclePower className="w-6" />
								{isVisible && <div className="hidden md:block">Sign Out</div>}
							</Button>
						</form>
					</Form>


				</div>
			</div>
		</div>
	);
}
