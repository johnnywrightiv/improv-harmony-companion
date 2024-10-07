import { useSelector } from 'react-redux';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CirclePower } from 'lucide-react';
import clsx from 'clsx';
import type { RootState } from '@/store/store';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';

export function SignOut() {
	const isVisible = useSelector((state: RootState) => state.sidebar.isVisible);
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
			<form
				onSubmit={form.handleSubmit(handleSignOut)}
				className="hidden md:block"
			>
				<Button
					variant="ghost"
					className={clsx(
						'flex h-[48px] w-full items-center rounded-md bg-background text-sm font-medium text-primary hover:bg-secondary/30 hover:text-text',
						{
							'justify-start gap-2 p-2 px-3': isVisible,
							'justify-center p-1': !isVisible,
						}
					)}
					type="submit"
				>
					<CirclePower className="w-6" />
					{isVisible && <div>Sign Out</div>}
				</Button>
			</form>
		</Form>
	);
}
