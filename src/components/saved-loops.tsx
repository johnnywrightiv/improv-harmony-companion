// 'use client';

// import React from 'react';
// import { Music } from 'lucide-react';
// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardHeader,
// 	CardTitle,
// } from '@/components/ui/card';
// import placeholderData from '@/data/placeholder-data.json';
// import ListItem from './list-item';

// const SavedLoops = () => {
// 	const loops = placeholderData.loops;

// 	const handleLoopClick = (loopId: string) => {
// 		const loop = loops.find((l) => l.loopId === loopId);
// 		if (loop) {
// 			alert(`Loop: ${loop.name}`);
// 		}
// 	};

// 	return (
// 		<Card>
// 			<CardHeader>
// 				<CardTitle>Saved Loops</CardTitle>
// 				<CardDescription>Your custom loop configurations</CardDescription>
// 			</CardHeader>
// 			<CardContent>
// 				{loops.map((loop) => (
// 					<ListItem
// 						key={loop.loopId}
// 						icon={Music}
// 						title={loop.name}
// 						subtitle={`${loop.genre} - ${loop.config.tempo} BPM`}
// 						onClick={() => handleLoopClick(loop.loopId)}
// 					/>
// 				))}
// 			</CardContent>
// 		</Card>
// 	);
// };

// export default SavedLoops;

'use client';

import React from 'react';
import { Music } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import placeholderData from '@/data/placeholder-data.json';
import ListItem from './list-item';

const SavedLoops = () => {
	const userData = placeholderData.users[0]; // Using the first user from placeholder data
	const allLoops = placeholderData.loops;
	const userLoops = allLoops.filter((loop) => loop.userId === userData.id);

	const handleLoopClick = (loopId: string) => {
		const loop = userLoops.find((l) => l.loopId === loopId);
		if (loop) {
			alert(`Loop: ${loop.name}`);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Saved Loops</CardTitle>
				<CardDescription>Your custom loop configurations</CardDescription>
			</CardHeader>
			<CardContent>
				{userLoops.map((loop) => (
					<ListItem
						key={loop.loopId}
						icon={Music}
						title={loop.name}
						subtitle={`${loop.genre} - ${loop.config.tempo} BPM`}
						onClick={() => handleLoopClick(loop.loopId)}
					/>
				))}
			</CardContent>
		</Card>
	);
};

export default SavedLoops;
