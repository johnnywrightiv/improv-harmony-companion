'use client';

import { CirclePower } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import clsx from 'clsx';

export default function Profile() {
	return (
		<div className="space-y-4">
			<h2>Profile</h2>

			<h5>User Settings</h5>
			{/* Theme Toggle  */}
			<ThemeToggle />
			
			{/* Sign Out Button - in user settings */}
			<Form>
				<form
					action={async () => {
						// await signOut();
					}}
					className="mt-8"
				>
					<Button
						variant="destructive"
						className={clsx(
							'flex w-1/8 items-center justify-center gap-2 rounded-md p-3'
						)}
						type="submit"
					>
						<CirclePower className="w-6" />
						<span>Sign Out</span>
					</Button>
				</form>
			</Form>

		</div>
	);
}
