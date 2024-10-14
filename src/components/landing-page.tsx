import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
	return (
		<div className="">
			{/* Main Columns */}
			<div className="mt-2 flex flex-col gap-8 py-4 md:flex-row md:gap-8">
				{/* Info Card */}
				<div className="text-foreground flex flex-col justify-center gap-8 rounded-[--radius] border border-border/50 bg-secondary/50 px-8 py-10 shadow-lg md:w-[45%] md:px-12">
					<div className="space-y-4 text-xl md:text-3xl md:leading-relaxed">
						<h1>Welcome to Acme.</h1>
						<p>
							This is the example for the{' '}
							<a
								href="https://nextjs.org/learn/"
								className="text-primary underline hover:text-primary/80"
							>
								Next.js Learn Course
							</a>
							, brought to you by Vercel.
						</p>
					</div>

					{/* Button Container */}
					<div className="flex w-full flex-col gap-4 sm:flex-row">
						<Button asChild className="w-full sm:w-1/2">
							<Link href="/login">Log In</Link>
						</Button>
						<Button asChild variant="outline" className="w-full sm:w-1/2">
							<Link href="/signup">Sign Up</Link>
						</Button>
					</div>
				</div>

				{/* Hero Images */}
				<div className="flex items-center justify-center md:w-[55%]">
					<Image
						src="/hero-desktop.png"
						width={1000}
						height={760}
						className="hidden rounded-[--radius] md:block"
						alt="Screenshots of the app showing desktop version"
					/>
					<Image
						src="/hero-mobile.png"
						width={560}
						height={620}
						className="block rounded-[--radius] md:hidden"
						alt="Screenshot of the app showing mobile version"
					/>
				</div>
			</div>
		</div>
	);
}
