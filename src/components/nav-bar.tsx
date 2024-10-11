'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import AcmeLogo from '@/components/acme-logo';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

// Map of links to display in the navigation bar.
const links = [
	{ name: 'Home', href: '/' },
	{ name: 'Branding', href: '/branding' },
	// Add more links as needed
];

export default function NavBar() {
	const pathname = usePathname();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<div className="mb-4">
			<nav className="flex h-auto items-center justify-between rounded-lg bg-gradient-to-br from-primary to-secondary p-4">
				{/* Logo Section */}
				<Link href="/" className="cursor-pointer" aria-label="Go to homepage">
					<AcmeLogo displayText={false} />
				</Link>

				{/* Desktop Navigation Links */}
				<ul
					className="hidden flex-1 list-none justify-center gap-2 md:flex"
					role="list"
				>
					{links.map((link) => (
						<li key={link.name}>
							<Button
								variant="link"
								className={
									pathname === link.href
										? 'text-foreground text-md font-bold underline'
										: 'text-text/80'
								}
								asChild
							>
								<Link
									href={link.href}
									aria-current={pathname === link.href ? 'page' : undefined}
								>
									{link.name}
								</Link>
							</Button>
						</li>
					))}
				</ul>

				{/* Mobile Menu Button */}
				<button
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					className="text-foreground md:hidden"
					aria-expanded={mobileMenuOpen}
					aria-controls="mobile-menu"
				>
					{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>

				{/* Theme Toggle */}
				<div className="hidden md:block">
					<ThemeToggle />
				</div>
			</nav>

			{/* Mobile Menu */}
			<div
				className={`overflow-hidden transition-all duration-300 md:hidden
          ${mobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}
			>
				<div
					className={`rounded-lg bg-card p-4 transition-all duration-300
          ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
				>
					<ul className="flex flex-col gap-2">
						{links.map((link, index) => (
							<li
								key={link.name}
								className="transition-all duration-300"
								style={{
									transitionDelay: mobileMenuOpen ? `${index * 75}ms` : '0ms',
									opacity: mobileMenuOpen ? 1 : 0,
									transform: mobileMenuOpen
										? 'translateX(0)'
										: 'translateX(-1rem)',
								}}
							>
								<Button
									variant="ghost"
									className={clsx(
										'w-full justify-start',
										pathname === link.href ? 'font-bold text-primary' : ''
									)}
									asChild
								>
									<Link href={link.href}>{link.name}</Link>
								</Button>
							</li>
						))}
					</ul>
					<div
						className={clsx(
							'mt-4 flex justify-start pl-4',
							'transform transition-all duration-300'
						)}
						style={{
							transitionDelay: mobileMenuOpen
								? `${links.length * 100}ms`
								: '0ms',
							opacity: mobileMenuOpen ? 1 : 0,
							transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(1rem)',
						}}
					>
						<ThemeToggle />
					</div>
				</div>
			</div>
		</div>
	);
}
