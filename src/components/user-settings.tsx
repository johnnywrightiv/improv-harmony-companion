'use client';

import React from 'react';
import { SignOutButton } from '@/components/sign-out-button';
import { ThemeSelect } from '@/components/theme-selector';
import SetPracticeGoalDialog from '@/components/set-practice-goal';
import { ToneSelector } from './tone-selector';

const UserSettings = () => {
	return (
		<div className="space-y-4">
			<ul>
				<li>SETTING: Chord Mode (chords/arpeggios?)</li>
				<li>SETTING: Countdown (1,2,3,4 pre-roll?)</li>
				<li>
					SETTING: Advanced Theory (Show Relative/Parallel Scales & Modes?)
				</li>
				<li>- User Profile</li>
				<li>- Account Management</li>
				<li>- Notifications / Reminders</li>
				<li>
					- Playback Settings (countdown, chord/arp mode, volume, instrument,
					advanced theory)
				</li>
				<li>- About, T&C, etc.</li>
			</ul>
			<ToneSelector />
			<SetPracticeGoalDialog />
			<ThemeSelect />
			<SignOutButton />
		</div>
	);
};

export default UserSettings;
