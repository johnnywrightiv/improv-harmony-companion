'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the navigation bar.
// Depending on the size of the application, this would be stored in a database.
const links = [
	{ name: 'Home', href: '/' },
	{ name: 'Branding', href: '/branding' },
	// Add more links as needed
];

export default function NavBar() {
	const pathname = usePathname();

	return (
		<nav className="mb-8 flex items-center justify-between px-8 py-4 shadow-md shadow-accent/50">
			{/* Logo Section */}
			<div className="flex items-center gap-4">
				<Link href="/">
					<Image
						src="/circle-logo-black.png"
						alt="Logo"
						width={40}
						height={40}
						className="cursor-pointer"
					/>
				</Link>
			</div>

			{/* Navigation Links */}
			<div className="flex gap-4">
				{links.map((link) => (
					<Link
						key={link.name}
						href={link.href}
						className={clsx(
							'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200',
							{
								'bg-sky-100 text-blue-600': pathname === link.href,
								'hover:bg-gray-100': pathname !== link.href,
							}
						)}
					>
						{link.name}
					</Link>
				))}
			</div>
		</nav>
	);
}
