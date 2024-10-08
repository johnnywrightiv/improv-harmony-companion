import AcmeLogo from '@/components/acme-logo';
import SignupForm from '@/components/signup-form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SignupPage() {
	return (
		<main className="flex items-center justify-center md:h-screen">
			<div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
				<nav className="flex h-20 w-full items-end rounded-lg bg-gradient-to-br from-primary to-secondary p-3">
					<Link href="/" className="cursor-pointer">
						<AcmeLogo />
					</Link>
				</nav>
				<SignupForm />
				<nav className="mt-6 text-center text-sm">
					<p className="text-text-muted">
						Already have an account?{' '}
						<Link href="/login" passHref legacyBehavior>
							<Button
								variant="link"
								className="p-0 font-medium text-primary hover:text-accent"
								aria-label="Log in to your account"
								role="link"
							>
								Log in
							</Button>
						</Link>
					</p>
				</nav>
			</div>
		</main>
	);
}
