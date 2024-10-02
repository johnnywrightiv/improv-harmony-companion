// import Image from 'next/image';
// import NextExample from './next-example';
import ComponentLibrary from '@/components/component-library';

export default function Home() {
	return (
		<div className="container mx-auto p-8">
			<main>
				<ComponentLibrary />
				{/* <NextExample /> */}
			</main>
			<footer className="mt-8 text-center text-text-muted">
				Your footer content
			</footer>
		</div>
	);
}
