// import Image from 'next/image';
import TestComponent from '@/components/test-component';
// import NextExample from './next-example';

export default function Home() {
	return (
		<div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
			<main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
				<div id="next-js-boilerplate">
					<TestComponent />
					{/* <NextExample /> */}
				</div>
			</main>

			<footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
				footer
			</footer>
		</div>
	);
}
