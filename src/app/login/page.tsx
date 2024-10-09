import AcmeLogo from '@/components/acme-logo';
import LoginForm from '@/components/login-form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
	return (
		<main className="flex min-h-screen w-full items-start justify-center overflow-auto bg-background py-8 md:items-center">
			<div className="relative mx-auto w-full max-w-[400px] p-4">
				<div className="mb-6">
					<nav
						className="flex h-20 w-full items-end rounded-lg bg-gradient-to-br from-primary to-secondary p-3"
						tabIndex={0}
					>
						<Link href="/" className="cursor-pointer">
							<AcmeLogo />
						</Link>
					</nav>
				</div>

				<LoginForm />

				<nav className="mt-6 text-center text-sm">
					<p className="text-text-muted">
						Don&apos;t have an account?{' '}
						<Button
							variant="link"
							className="p-0 font-medium text-primary hover:text-accent"
							aria-label="Sign up for an account"
							asChild
						>
							<Link href="/signup">Sign up</Link>
						</Button>
					</p>
				</nav>
			</div>
		</main>
	);
}
