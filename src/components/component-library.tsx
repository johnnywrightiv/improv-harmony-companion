import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ComponentLibrary() {
	return (
		<>
			{/* Style Guide Example */}
			<div className="space-y-6 p-4 text-text">
				<div>
					<h1 className="text-primary">Heading 1 (Playfair Display)</h1>
					<h2 className="text-secondary">Heading 2 (Playfair Display)</h2>
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

			{/* Component Library */}
			<div className="space-y-8 text-text">
				<h1 className="text-3xl font-bold">Component Library</h1>

				<Tabs defaultValue="buttons" className="w-full">
					<TabsList>
						<TabsTrigger value="buttons">Buttons</TabsTrigger>
						<TabsTrigger value="cards">Cards</TabsTrigger>
						<TabsTrigger value="alerts">Alerts</TabsTrigger>
					</TabsList>

					<TabsContent value="buttons" className="space-y-4">
						<h2 className="text-2xl font-semibold">Buttons</h2>
						<div className="flex flex-wrap gap-4">
							<Button>Default Button</Button>
							<Button variant="secondary">Secondary Button</Button>
							<Button variant="destructive">Destructive Button</Button>
							<Button variant="outline">Outline Button</Button>
							<Button variant="ghost">Ghost Button</Button>
						</div>
					</TabsContent>

					<TabsContent value="cards" className="space-y-4">
						<h2 className="text-2xl font-semibold">Cards</h2>
						<div className="grid gap-4 md:grid-cols-2">
							<Card>
								<CardHeader>
									<CardTitle>Card Title</CardTitle>
									<CardDescription>Card Description</CardDescription>
								</CardHeader>
								<CardContent>
									<p>Card Content</p>
								</CardContent>
								<CardFooter>
									<Button>Action</Button>
								</CardFooter>
							</Card>
						</div>
					</TabsContent>

					<TabsContent value="alerts" className="space-y-4">
						<h2 className="text-2xl font-semibold">Alerts</h2>
						<div className="space-y-4">
							<Alert>
								<AlertTitle>Default Alert</AlertTitle>
								<AlertDescription>
									This is a default alert message.
								</AlertDescription>
							</Alert>

							<Alert variant="destructive">
								<AlertTitle>Destructive Alert</AlertTitle>
								<AlertDescription>
									This is a destructive alert message.
								</AlertDescription>
							</Alert>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</>
	);
}
