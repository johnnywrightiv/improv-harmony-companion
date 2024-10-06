import HomePage from '@/components/home-page';
import NavBar from '@/components/nav-bar';

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen container mx-auto p-8">
			{/* Main Content */}
			<main className="flex-grow">
				<NavBar />
				<HomePage />
			</main>

			{/* Footer */}
			<footer className="mt-8 text-sm text-center text-text-muted">
				Your footer content
			</footer>
		</div>
	);
}
