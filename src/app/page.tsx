import HomePage from '@/components/home-page';

export default function Home() {
	return (
		<div className="container mx-auto p-8">
			<main>
				<HomePage />
			</main>
			<footer className="mt-8 text-center text-text-muted">
				Your footer content
			</footer>
		</div>
	);
}
