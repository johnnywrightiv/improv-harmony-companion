import React from 'react';
import { SignOut } from '@/components/sign-out';
import { ThemeSelect } from '@/components/theme-selector';

const UserSettings = () => {
	return (
		<div className="space-y-4">
			{/* Theme Toggle  */}
			<div>
				<ThemeSelect />{' '}
				<span className="text-muted-foreground">Toggle Light/Dark Theme</span>
			</div>
			{/* Sign Out Button - in user settings */}
			<SignOut />
		</div>
	);
};

export default UserSettings;
