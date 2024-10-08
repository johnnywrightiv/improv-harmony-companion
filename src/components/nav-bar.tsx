'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

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
		<nav
			className="mb-4 flex items-center justify-between rounded-b-md border-b border-background-muted px-8 py-4"
			aria-label="Main navigation"
		>
			{/* Logo Section */}
			<Link
				href="/"
				className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
				aria-label="Go to homepage"
			>
				<Image src="/circle-logo-black.png" alt="" width={40} height={40} />
			</Link>

			{/* Navigation Links */}
			<ul className="flex list-none gap-2" role="list">
				{links.map((link) => (
					<li key={link.name}>
						<Button
							variant={pathname === link.href ? 'secondary' : 'ghost'}
							asChild
						>
							<Link
								href={link.href}
								aria-current={pathname === link.href ? 'page' : undefined}
								className="focus:outline-none focus:ring-2 focus:ring-primary"
							>
								{link.name}
							</Link>
						</Button>
					</li>
				))}
			</ul>

			<ThemeToggle />
		</nav>
	);
}
