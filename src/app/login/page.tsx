import AcmeLogo from '@/components/acme-logo';
import LoginForm from '@/components/login-form';
import Link from 'next/link';

export default function LoginPage() {
	return (
		<main className="flex items-center justify-center md:h-screen">
			<div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
				<div className="flex h-20 w-full items-end rounded-lg bg-gradient-to-br from-primary to-secondary p-3 ">
					<Link href="/">
						<AcmeLogo />
					</Link>
				</div>
				<LoginForm />
			</div>
		</main>
	);
}
