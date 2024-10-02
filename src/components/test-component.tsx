export default function TestComponent() {
	return (
		<div className="space-y-6 p-4">
			<div>
				<h1>Heading 1 (Playfair Display)</h1>
				<h2>Heading 2 (Playfair Display)</h2>
				<h3>Heading 3 (Playfair Display)</h3>
				<h4>Heading 4 (Playfair Display)</h4>
				<h5>Heading 5 (Playfair Display)</h5>
				<h6>Heading 6 (Playfair Display)</h6>
			</div>

			<div>
				<p className="mb-4">This is regular body text using Geist Sans.</p>
				<p className="mb-6 font-mono text-secondary">
					This is monospace text using Geist Mono.
				</p>
				<p className="decorative-text text-accent">
					This is decorative text using Pacifico!
				</p>
			</div>
		</div>
	);
}
