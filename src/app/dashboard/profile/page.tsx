'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { SignOut } from '@/components/sign-out';

export default function Profile() {
	return (
		<div className="space-y-4">
			<h2>Profile</h2>

			<h5>User Settings</h5>
			{/* Theme Toggle  */}
			<ThemeToggle />

			{/* Sign Out Button - in user settings */}
			<SignOut />
		</div>
	);
}
