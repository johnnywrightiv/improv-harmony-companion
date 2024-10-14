import AcmeLogo from '@/components/acme-logo';
import SignupForm from '@/components/signup-form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SignupPage() {
	return (
		<main className="flex min-h-screen w-full items-start justify-center overflow-auto bg-background py-8 md:items-center">
			<div className="relative mx-auto w-full max-w-[400px] p-4">
				<div className="mb-6">
					<nav className="flex h-20 w-full items-end rounded-[--radius] bg-gradient-to-br from-primary to-secondary p-3">
						<Link href="/" className="cursor-pointer">
							<AcmeLogo displayText={true} />
						</Link>
					</nav>
				</div>

				<SignupForm />

				<nav className="mt-6 text-center text-sm">
					<p className="text-muted-foreground">
						Already have an account?{' '}
						<Button
							variant="link"
							className="p-0 font-medium text-primary hover:text-accent"
							aria-label="Log in to your account"
							asChild
						>
							<Link href="/login">Log in</Link>
						</Button>
					</p>
				</nav>
			</div>
		</main>
	);
}
