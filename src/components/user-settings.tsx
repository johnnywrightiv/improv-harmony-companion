import React from 'react';
import { SignOutButton } from '@/components/sign-out-button';
import { ThemeSelect } from '@/components/theme-selector';

const UserSettings = () => {
	return (
		<div className="space-y-4">
			<ThemeSelect />
			<SignOutButton />

		</div>
	);
};

export default UserSettings;
