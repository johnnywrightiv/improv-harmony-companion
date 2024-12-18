'use client';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CirclePower } from 'lucide-react';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';

export function SignOutButton() {
	const form = useForm();
	const { logout } = useAuth();
	const router = useRouter();

	const handleSignOut = async () => {
		console.log('User signed out');
		logout();
		router.push('/');
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSignOut)}>
				<Button
					variant="ghost"
					className={clsx(
						'flex h-[48px] items-center justify-start gap-2 rounded-[--radius] border border-border bg-background p-2 px-3 text-sm font-medium text-muted-foreground hover:bg-secondary/30 hover:text-card-foreground'
					)}
					type="submit"
				>
					<CirclePower className="w-6" />
					<div>Sign Out</div>
				</Button>
			</form>
		</Form>
	);
}
