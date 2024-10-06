'use client';

import { Search } from 'lucide-react';
import { ColorSwatches } from './color-swatches';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Counter } from '@/components/counter';
import { ThemeToggle } from '@/components/theme-toggle';
import { PlaybackControls } from '@/components/playback-controls';

export default function ComponentLibrary() {
	return (
		<div className="space-y-8 p-4">
			{/* Color Section */}
			<section className="grid grid-cols-2 gap-8">
				<div className="space-y-4">
					<ColorSwatches />
				</div>

				{/* Typography Section */}
				<div className="space-y-6 p-4 text-text">
					<h2 className="mb-4">Typography</h2>

					<div className="space-y-6">
						{/* Heading 1 */}
						<div className="flex justify-between">
							<h1 className="text-primary">H1 (Playfair Display)</h1>
							<p className="text-sm text-text-muted">3rem</p>
						</div>

						{/* Heading 2 */}
						<div className="flex justify-between">
							<h2 className="text-secondary">Heading 2 (Playfair Display)</h2>
							<p className="text-sm text-text-muted">2.25rem</p>
						</div>

						{/* Heading 3 */}
						<div className="flex justify-between">
							<h3>Heading 3 (Playfair Display)</h3>
							<p className="text-sm text-text-muted">1.875rem</p>
						</div>

						{/* Heading 4 */}
						<div className="flex justify-between">
							<h4>Heading 4 (Playfair Display)</h4>
							<p className="text-sm text-text-muted">1.5rem</p>
						</div>

						{/* Heading 5 */}
						<div className="flex justify-between">
							<h5>Heading 5 (Playfair Display)</h5>
							<p className="text-sm text-text-muted">1.25rem</p>
						</div>

						{/* Heading 6 */}
						<div className="flex justify-between">
							<h6>Heading 6 (Playfair Display)</h6>
							<p className="text-sm text-text-muted">1rem</p>
						</div>

						{/* Body Text */}
						<div className="flex justify-between">
							<p>Body Text (Geist Sans)</p>
							<p className="text-sm text-text-muted">1rem</p>
						</div>

						{/* Small Text */}
						<div className="flex justify-between">
							<p className="text-sm">Small Text (Geist Sans)</p>
							<p className="text-sm text-text-muted">.875rem</p>
						</div>

						{/* XS Text */}
						<div className="flex justify-between">
							<p className="text-xs">Extra Small Text (Geist Sans)</p>
							<p className="text-sm text-text-muted">.75rem</p>
						</div>

						{/* Monospace Text */}
						<div className="flex justify-between">
							<p className="font-mono text-xs">Monospace (Geist Mono)</p>
							<p className="text-sm text-text-muted">.75rem</p>
						</div>
						{/* Decorative Text */}
						<div className="flex justify-between">
							<p className="decorative-text text-xs text-accent">
								Decorative Text (Pacifico)
							</p>
							<p className="text-sm text-text-muted">.75rem</p>
						</div>
					</div>
				</div>
			</section>

			{/* Assets Section */}
			<section className="space-y-4">
				<h2>Assets</h2>
				<div className="grid grid-cols-3 gap-8">
					{/* Logo section */}
					<div>
						<h3>Logo</h3>
						<p className="text-sm text-text-muted">Primary logo usage</p>
					</div>

					{/* Controls/Icons section */}
					<div>
						<h3>Icons</h3>
						<div className="flex gap-4">
							<ThemeToggle />
							<PlaybackControls />
						</div>
						<p className="mt-2 text-sm text-text-muted">
							Control icons using Lucide React icons
						</p>
					</div>

					{/* Additional section */}
					<div>
						<h3>Images & Misc. Assets</h3>
						<p className="text-sm text-text-muted">Any other relevant assets</p>
					</div>
				</div>
			</section>

			{/* Atomic Design Components */}
			<section className="space-y-4">
				<h2>Components</h2>
				<Tabs defaultValue="atoms" className="w-full">
					<TabsList>
						<TabsTrigger value="atoms">Atoms</TabsTrigger>
						<TabsTrigger value="molecules">Molecules</TabsTrigger>
						<TabsTrigger value="organisms">Organisms</TabsTrigger>
						<TabsTrigger value="templates">Templates</TabsTrigger>
					</TabsList>

					<TabsContent value="atoms" className="space-y-8">
						{/* Buttons Section */}
						<section className="space-y-4">
							<h3>Buttons</h3>
							<Card>
								<CardHeader>
									<CardTitle>Button Variants</CardTitle>
									<CardDescription>
										Different styles of buttons for various contexts
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex flex-wrap gap-4">
										<Button>Default Button</Button>
										<Button variant="test">test gradient</Button>
										<Button variant="secondary">Secondary</Button>
										<Button variant="destructive">Destructive</Button>
										<Button variant="outline">Outline</Button>
										<Button variant="ghost">Ghost</Button>
									</div>
									<div className="flex flex-wrap gap-4">
										<Button disabled>Disabled</Button>
										<Button size="sm">Small</Button>
										<Button size="lg">Large</Button>
										<Button>
											<Search className="mr-2 h-4 w-4" /> With Icon
										</Button>
									</div>
								</CardContent>
							</Card>
						</section>

						{/* Inputs Section */}
						<section className="space-y-4">
							<h3>Inputs & Labels</h3>
							<div className="grid gap-4">
								<Input placeholder="Default input" />
								<Input placeholder="Disabled input" disabled />
								<div className="space-y-2">
									<Label htmlFor="labeled-input">Labeled Input</Label>
									<Input id="labeled-input" placeholder="With label" />
								</div>
								<div className="relative">
									<Input placeholder="With icon" className="pl-8" />
									<Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
								</div>
							</div>
						</section>

						{/* Sliders Section */}
						<section className="space-y-4">
							<h3>Sliders</h3>
							<Card>
								<CardHeader>
									<CardTitle>Slider Variants</CardTitle>
									<CardDescription>
										Different styles and configurations of sliders
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-8">
									<div className="space-y-4">
										<div className="space-y-2">
											<Label>Default Slider</Label>
											<Slider defaultValue={[50]} max={100} step={1} />
										</div>
										<div className="space-y-2">
											<Label>Range Slider</Label>
											<Slider defaultValue={[25, 75]} max={100} step={1} />
										</div>
										<div className="space-y-2">
											<Label>Disabled Slider</Label>
											<Slider defaultValue={[30]} max={100} step={1} disabled />
										</div>
									</div>
								</CardContent>
							</Card>
						</section>

						{/* Alerts Section */}
						<section className="space-y-4">
							<h3>Alerts</h3>
							<div className="grid gap-4">
								<Alert>
									<AlertTitle>Default Alert</AlertTitle>
									<AlertDescription>
										This is a default alert message.
									</AlertDescription>
								</Alert>

								<Alert variant="destructive">
									<AlertTitle>Error Alert</AlertTitle>
									<AlertDescription>
										This is an error alert message.
									</AlertDescription>
								</Alert>

								<Alert className="border-success bg-success/10">
									<AlertTitle className="text-success">
										Success Alert
									</AlertTitle>
									<AlertDescription>
										This is a success alert message.
									</AlertDescription>
								</Alert>

								<Alert className="border-warning bg-warning/10">
									<AlertTitle className="text-warning">
										Warning Alert
									</AlertTitle>
									<AlertDescription>
										This is a warning alert message.
									</AlertDescription>
								</Alert>
							</div>
						</section>
					</TabsContent>

					<TabsContent value="molecules" className="space-y-8">
						{/* Search Bar Molecule */}
						<section className="space-y-4">
							<h3>Search Bar</h3>
							<Card>
								<CardHeader>
									<CardTitle>Search Component</CardTitle>
									<CardDescription>
										Combination of input, label, and button atoms
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-2">
										<Label htmlFor="search">Search</Label>
										<div className="relative flex w-full max-w-sm items-center">
											<Input
												id="search"
												placeholder="Search..."
												className="pr-20"
											/>
											<Button className="absolute right-0 h-full rounded-l-none">
												<Search className="h-4 w-4" />
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						</section>

						{/* Counter Section */}
						<section className="space-y-4">
							<h3>Counter</h3>
							<Card>
								<CardHeader>
									<CardTitle>Counter Component</CardTitle>
									<CardDescription>
										Interactive counter with Redux integration
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Counter />
								</CardContent>
							</Card>
						</section>

						{/* Cards Section */}
						<section className="space-y-4">
							<h3>Cards</h3>
							<div className="grid gap-6 md:grid-cols-2">
								<Card>
									<CardHeader>
										<CardTitle>Simple Card</CardTitle>
										<CardDescription>
											A basic card with header only
										</CardDescription>
									</CardHeader>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle>Card with Content</CardTitle>
										<CardDescription>
											A card with header and content
										</CardDescription>
									</CardHeader>
									<CardContent>
										<p>This is the main content area of the card.</p>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle>Card with Footer</CardTitle>
										<CardDescription>
											A card with header, content, and footer
										</CardDescription>
									</CardHeader>
									<CardContent>
										<p>This card has a footer with actions.</p>
									</CardContent>
									<CardFooter className="flex justify-between">
										<Button variant="ghost">Cancel</Button>
										<Button>Save</Button>
									</CardFooter>
								</Card>

								<Card className="border-error">
									<CardHeader>
										<CardTitle className="text-error">Error Card</CardTitle>
										<CardDescription>
											A card styled to show an error state
										</CardDescription>
									</CardHeader>
									<CardContent>
										<p>This card indicates an error or warning.</p>
									</CardContent>
								</Card>
							</div>
						</section>
					</TabsContent>

					<TabsContent value="organisms" className="space-y-4">
						<h3>Example Organism (form/modal/navbar)</h3>
						<div>...insert code here...</div>
					</TabsContent>

					<TabsContent value="templates" className="space-y-4">
						<h3>
							Templates/Layouts/Skeletons (landing page, first time page,
							practice page, settings window/page, etc.)
						</h3>
						<div>...insert code here...</div>
					</TabsContent>
				</Tabs>
			</section>
		</div>
	);
}
