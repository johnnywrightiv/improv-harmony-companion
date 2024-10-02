// import Image from 'next/image';
// import NextExample from './next-example';
import TestComponent from '@/components/test-component';
import ComponentLibrary from '@/components/component-library';

export default function Home() {
	return (
		<div className="container mx-auto p-8">
			<main>
				<TestComponent />
				<ComponentLibrary />
				{/* <NextExample /> */}
			</main>
			<footer className="mt-8 text-center text-gray-500">
				Your footer content
			</footer>
		</div>
	);
}
