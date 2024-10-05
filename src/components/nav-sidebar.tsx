'use client';

import Link from 'next/link';
import AcmeLogo from '@/components/acme-logo';
import {
	CirclePower,
	CircleUser,
	House,
	File,
	CircleDollarSign,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
	{ name: 'Home', href: '/dashboard', icon: House },
	{ name: 'Orders', href: '/dashboard/orders', icon: CircleDollarSign },
	{ name: 'Invoices', href: '/dashboard/invoices', icon: File },
	{ name: 'Customers', href: '/dashboard/customers', icon: CircleUser },
	// Add more links as needed
];

export default function NavSidebar() {
	const pathname = usePathname();

	return (
		<div className="flex h-full flex-col px-3 py-4 md:px-2">
			{/* Logo Section */}
			<Link
				className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
				href="/"
			>
				<div className="w-32 text-white md:w-40">
					<AcmeLogo />
				</div>
			</Link>

			{/* Navigation Links */}
			<div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
				{links.map((link) => {
					const LinkIcon = link.icon;
					return (
						<Link
							key={link.name}
							href={link.href}
							className={clsx(
								'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
								{
									'bg-sky-100 text-blue-600': pathname === link.href,
								}
							)}
						>
							<LinkIcon className="w-6" />
							<p className="hidden md:block">{link.name}</p>
						</Link>
					);
				})}

				<div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

				{/* Sign out button */}
				<form
					action={async () => {
						// await signOut();
					}}
				>
					<button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
						<CirclePower className="w-6" />
						<div className="hidden md:block">Sign Out</div>
					</button>
				</form>
			</div>
		</div>
	);
}
