import Link from 'next/link';
import Image from 'next/image';
import AcmeLogo from '@/components/acme-logo';
import { Button } from './ui/button';

export default function Home() {
	return (
		<div className="flex flex-col">
			{/* Logo */}
			<nav className="flex h-auto items-end rounded-lg bg-gradient-to-br from-primary to-secondary p-4">
				<Link href="/" className="cursor-pointer">
					<AcmeLogo />
				</Link>
			</nav>

			{/* Main Columns */}
			<div className="mt-4 flex grow flex-col gap-4 md:flex-row">
				{/* Info Card */}
				<div className="flex flex-col justify-center gap-6 rounded-lg bg-background-muted px-6 py-8 text-text md:w-2/5 md:px-12">
					<div className="text-xl md:text-3xl md:leading-normal">
						<h1>Welcome to Acme.</h1>
						<span>This is the example for the </span>
						<a href="https://nextjs.org/learn/" className="text-accent">
							Next.js Learn Course
						</a>
						, brought to you by Vercel.
					</div>

					{/* Button Container */}
					<div className="flex w-full gap-4">
						<Button asChild className="w-1/2">
							<Link href="/login">Log In</Link>
						</Button>
						<Button asChild variant="outline" className="w-1/2">
							<Link href="/signup">Sign Up</Link>
						</Button>
					</div>
				</div>

				{/* Hero Images */}
				<div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
					<Image
						src="/hero-desktop.png"
						width={1000}
						height={760}
						className="hidden md:block"
						alt="Screenshots of the app showing desktop version"
					/>
					<Image
						src="/hero-mobile.png"
						width={560}
						height={620}
						className="block dark:invert md:hidden"
						alt="Screenshot of the app showing mobile version"
					/>
				</div>
			</div>
		</div>
	);
}
