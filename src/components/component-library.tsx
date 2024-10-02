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
		<div className="space-y-8">
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
	);
}
