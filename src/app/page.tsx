import LandingPage from '@/components/landing-page';
import NavBar from '@/components/nav-bar';

export default function Home() {
	return (
		<div className="container mx-auto flex min-h-screen flex-col p-8">
			{/* Main Content */}
			<main className="flex-grow">
				<NavBar />
				<LandingPage />
			</main>

			{/* Footer */}
			<footer className="mt-8 text-center text-sm text-muted-foreground">
				Your footer content
			</footer>
		</div>
	);
}
