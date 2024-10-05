import ComponentLibrary from './component-library';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Styles() {
	return (
		<div className="container mx-auto p-8">
			<nav className="mb-8 flex justify-end">
				<Link href="/">
					<Button variant="ghost">Back to Home</Button>
				</Link>
			</nav>
			<main>
				<ComponentLibrary />
			</main>
		</div>
	);
}
