import AcmeLogo from '@/components/acme-logo';
import LoginForm from '@/components/login-form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
	return (
		<main className="flex items-center justify-center md:h-screen">
			<div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
				<nav className="flex h-20 w-full items-end rounded-lg bg-gradient-to-br from-primary to-secondary p-3">
					<Link href="/" className="cursor-pointer">
						<AcmeLogo />
					</Link>
				</nav>
				<LoginForm />
				<nav className="mt-6 text-center text-sm">
					<p className="text-text-muted">
						Don&apos;t have an account?{' '}
						<Link href="/signup" passHref>
							<Button
								variant="link"
								className="p-0 font-medium text-primary hover:text-accent"
								aria-label="Sign up for an account"
								role="link"
							>
								Sign up
							</Button>
						</Link>
					</p>
				</nav>
			</div>
		</main>
	);
}
