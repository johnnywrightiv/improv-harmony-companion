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
    <nav className="mb-4 rounded-b-md flex items-center justify-between border-b border-background-muted px-8 py-4">
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
      <div className="flex gap-2">
        {links.map((link) => (
          <Button
            key={link.name}
            variant={pathname === link.href ? 'secondary' : 'ghost'}
            asChild
          >
            <Link href={link.href}>
              {link.name}
            </Link>
          </Button>
        ))}
      </div>

      <ThemeToggle />
    </nav>
  );
}