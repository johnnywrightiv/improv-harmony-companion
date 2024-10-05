import Link from 'next/link';
import Image from 'next/image';
// import heroImage from '../../public/hero-image.jpg';
// import AcmeLogo from "@/app/acme-logo";

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col p-6">
			<div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
				{/* <AcmeLogo /> */}
			</div>
			<div className="mt-4 flex grow flex-col gap-4 md:flex-row">
				<div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
					<div className="relative h-0 w-0 border-b-[26px] border-l-[15px] border-r-[15px] border-b-black border-l-transparent border-r-transparent" />
					<div
						className={'text-xl text-gray-800 md:text-3xl md:leading-normal'}
					>
						<div>
							<h1>Welcome to Acme.</h1>
						</div>
						<span>This is the example for the </span>
						<a href="https://nextjs.org/learn/" className="text-blue-500">
							Next.js Learn Course
						</a>
						, brought to you by Vercel.
					</div>
					<Link
						href="/login"
						className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
					>
						<span>Log in</span>
					</Link>
				</div>
				<div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
					{/* Add Hero Images Here */}
					<Image
						src="/hero-desktop.png"
						width={1000}
						height={760}
						className="hidden dark:invert md:block"
						alt="Screenshots of the dashboard project showing desktop version"
					/>
					<Image
						src="/hero-mobile.png"
						width={560}
						height={620}
						className="block dark:invert md:hidden"
						alt="Screenshot of the dashboard project showing mobile version"
					/>
				</div>
			</div>
		</div>
	);
}
