'use client';

import { Search } from 'lucide-react';
import { ColorSwatches } from './color-swatches';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Toggle } from '@/components/ui/toggle';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Counter } from '@/components/counter';
import { ThemeToggle } from '@/components/theme-toggle';
import { PlaybackControls } from '@/components/playback-controls';
import { SearchBar } from '@/components/search-bar';
import { SignOut } from '@/components/sign-out';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ComponentLibrary() {
	return (
		<div className="space-y-8 p-4">
			{/* Color & Type Section */}
			<section className="flex">
				<div className="w-1/2 pr-8">
					<h2 className="mb-4 text-2xl font-bold">Color Swatches</h2>
					<ColorSwatches />
				</div>

				<div>
					<Separator orientation="vertical" />
				</div>

				{/* Typography Section */}
				<div className="w-1/2 space-y-6 pl-8">
					<h2 className="mb-4 text-2xl font-bold">Typography</h2>

					<div className="space-y-6">
						{/* Heading 1 */}
						<div className="flex justify-between">
							<h1 className="text-3xl text-primary">H1 (Playfair Display)</h1>
							<p className="text-sm text-muted-foreground">3rem</p>
						</div>

						{/* Heading 2 */}
						<div className="flex justify-between">
							<h2 className="text-2xl text-secondary">
								Heading 2 (Playfair Display)
							</h2>
							<p className="text-sm text-muted-foreground">2.25rem</p>
						</div>

						{/* Heading 3 */}
						<div className="flex justify-between">
							<h3 className="text-xl text-accent">
								Heading 3 (Playfair Display)
							</h3>
							<p className="text-sm text-muted-foreground">1.875rem</p>
						</div>

						{/* Heading 4 */}
						<div className="flex justify-between">
							<h4 className="text-lg">Heading 4 (Playfair Display)</h4>
							<p className="text-sm text-muted-foreground">1.5rem</p>
						</div>

						{/* Heading 5 */}
						<div className="flex justify-between">
							<h5 className="text-base">Heading 5 (Playfair Display)</h5>
							<p className="text-sm text-muted-foreground">1.25rem</p>
						</div>

						{/* Heading 6 */}
						<div className="flex justify-between">
							<h6 className="text-sm">Heading 6 (Playfair Display)</h6>
							<p className="text-sm text-muted-foreground">1rem</p>
						</div>

						{/* Body Text */}
						<div className="flex justify-between">
							<p>Body Text (Geist Sans)</p>
							<p className="text-sm text-muted-foreground">1rem</p>
						</div>

						{/* Decorative Text */}
						<div className="flex justify-between">
							<p className="font-decorative text-sm">
								Decorative Text (Pacifico)
							</p>
							<p className="text-sm text-muted-foreground">.875rem</p>
						</div>

						{/* Small Text */}
						<div className="flex justify-between">
							<p className="text-sm">Small Text (Geist Sans)</p>
							<p className="text-sm text-muted-foreground">.875rem</p>
						</div>

						{/* XS Text */}
						<div className="flex justify-between">
							<p className="text-xs">Extra Small Text (Geist Sans)</p>
							<p className="text-sm text-muted-foreground">.75rem</p>
						</div>

						{/* Monospace Text */}
						<div className="flex justify-between">
							<p className="font-mono text-xs">Monospace (Geist Mono)</p>
							<p className="text-sm text-muted-foreground">.75rem</p>
						</div>
					</div>
				</div>
			</section>

			<Separator orientation={'horizontal'} />

			{/* Assets Section */}
			<section className="space-y-4">
				<h2>Assets</h2>
				<div className="grid grid-cols-3 gap-8">
					{/* Logo section */}
					<div>
						<h3>Logo</h3>
						<p className="text-sm text-text-muted">Primary logo usage</p>
					</div>

					{/* Icons & Controls section */}
					<div>
						<h3>Icons & Controls</h3>
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

			<Separator orientation={'horizontal'} />

			{/* Atomic Design UI Components Section */}
			<div className="space-y-8 p-4">
				<h1 className="mb-6 text-3xl font-bold">UI Component Library</h1>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{/* Card Example Section */}
					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Card</h2>
						<Card className="max-w-md">
							<CardHeader>
								<CardTitle>Card Title</CardTitle>
								<CardDescription>Card description goes here.</CardDescription>
							</CardHeader>
							<CardContent>
								<p>This is the main content of the card.</p>
							</CardContent>
							<CardFooter className="flex justify-between">
								<Button variant="outline">Cancel</Button>
								<Button>Save</Button>
							</CardFooter>
						</Card>
					</section>

					{/* Buttons Section */}
					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Buttons</h2>
						<div className="grid grid-cols-2 gap-4">
							<Button>Default</Button>
							<Button variant="outline">Outline</Button>
							<Button variant="secondary">Secondary</Button>
							<Button variant="ghost">Ghost</Button>
							<Button variant="destructive">Destructive</Button>
							<Button variant="link">Link</Button>
							<Button size="sm">Small</Button>
							<Button size="lg">Large</Button>
							{/* <Button>Default</Button> */}
							<Button>
								<Search className="mr-2 h-4 w-4" /> With Icon
							</Button>
							<Button disabled>Disabled</Button>
						</div>
					</section>

					{/* Inputs Section */}
					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Inputs</h2>
						<div className="space-y-2">
							<Label htmlFor="default-input">Default Input</Label>
							<Input id="default-input" placeholder="Default input" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="disabled-input">Disabled Input</Label>
							<Input
								id="disabled-input"
								placeholder="Disabled input"
								disabled
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="textarea">Textarea</Label>
							<Textarea id="textarea" placeholder="Type your message here." />
						</div>
					</section>

					{/* Alerts Section */}
					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Alerts</h2>
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
							<Alert variant="warning">
								<AlertTitle>Warning Alert</AlertTitle>
								<AlertDescription>
									This is a warning alert message.
								</AlertDescription>
							</Alert>
							<Alert variant="success">
								<AlertTitle>Success Alert</AlertTitle>
								<AlertDescription>
									This is a success alert message.
								</AlertDescription>
							</Alert>
						</div>
					</section>

					{/* Menu and Misc Section */}
					<section className="space-y-8	">
						<h3>Menu Helpers & Misc.</h3>
						<div>
							<h6>Dropdown Menu</h6>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline">Open Menu</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem>Profile</DropdownMenuItem>
									<DropdownMenuItem>Settings</DropdownMenuItem>
									<DropdownMenuItem>Logout</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						<div>
							<h6>Modal (Dialog Window)</h6>
							<Dialog>
								<DialogTrigger asChild>
									<Button variant="outline">Open Dialog</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Example Dialog</DialogTitle>
										<DialogDescription>
											This is a dialog component.
										</DialogDescription>
									</DialogHeader>
									<div className="flex justify-end space-x-2">
										<Button variant="outline">Cancel</Button>
										<Button>Continue</Button>
									</div>
								</DialogContent>
							</Dialog>
						</div>
						<div>
							<h6>Tab Navigation</h6>
							<Tabs defaultValue="tab1" className="w-full">
								<TabsList>
									<TabsTrigger value="tab1">Tab 1</TabsTrigger>
									<TabsTrigger value="tab2">Tab 2</TabsTrigger>
									<TabsTrigger value="tab3">Tab 3</TabsTrigger>
								</TabsList>
								<TabsContent value="tab1">Content of Tab 1</TabsContent>
								<TabsContent value="tab2">Content of Tab 2</TabsContent>
								<TabsContent value="tab3">Content of Tab 3</TabsContent>
							</Tabs>
						</div>
						<div>
							<h6>Toggle Button</h6>
							<div className="flex space-x-4">
								<Toggle>Toggle</Toggle>
								<Toggle defaultPressed>Pressed</Toggle>
								<Toggle disabled>Disabled</Toggle>
							</div>
						</div>
						<div>
							<h6>Avatar</h6>
							<div className="flex space-x-2">
								<Avatar>
									<AvatarImage
										src="https://github.com/shadcn.png"
										alt="@shadcn"
									/>
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<Avatar>
									<AvatarFallback>JD</AvatarFallback>
								</Avatar>
							</div>
						</div>
					</section>

					{/* Additional Form Inputs Section */}
					<section className="space-y-8">
						<h3 className="font-semibold">Additional Form Inputs</h3>

						<div>
							<h6>Select</h6>
							<Select>
								<SelectTrigger>
									<SelectValue placeholder="Select a fruit" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="apple">Apple</SelectItem>
									<SelectItem value="banana">Banana</SelectItem>
									<SelectItem value="blueberry">Blueberry</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-4">
							<div className="space-y-4">
								<h6>Slider</h6>
								<Slider defaultValue={[50]} max={100} step={1} />
								<Slider defaultValue={[25, 75]} max={100} step={1} />
								<div className="opacity-50">
									<Slider defaultValue={[30]} max={100} step={1} disabled />
								</div>
							</div>

							<div className="space-y-4">
								<h6 className="font-semibold">Switch</h6>
								<div className="flex items-center space-x-2">
									<Switch id="airplane-mode" />
									<Label htmlFor="airplane-mode">Airplane Mode</Label>
								</div>
								<div className="flex items-center space-x-2">
									<Switch id="disabled-switch" disabled />
									<Label htmlFor="disabled-switch">Disabled Switch</Label>
								</div>
							</div>

							<div className="space-x-2">
								<h6>Checkbox</h6>
								<div className="space-x-2">
									<Checkbox id="terms" />
									<Label htmlFor="terms">Accept terms and conditions</Label>
								</div>
								<div className="space-x-2">
									<Checkbox disabled id="terms" />
									<Label htmlFor="terms">Accept terms and conditions</Label>
								</div>
							</div>

							<div className="space-x-2">
								<h6>Radio Group</h6>

								<RadioGroup defaultValue="comfortable">
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="default" id="r1" />
										<Label htmlFor="r1">Default</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="comfortable" id="r2" />
										<Label htmlFor="r2">Comfortable</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="compact" id="r3" />
										<Label htmlFor="r3">Compact</Label>
									</div>
								</RadioGroup>
							</div>

							<div className="flex items-center space-x-2"></div>
						</div>
					</section>

					{/* Custom Components Section */}
					<section className="col-span-full">
						<Separator orientation={'horizontal'} />

						<h2>Custom Components</h2>
						<div className="flex items-end justify-around">
							<div>
								<h6>Search Bar (w/ Redux)</h6>
								<SearchBar />
							</div>
							<div>
								<h6>Counter (w/ Redux)</h6>
								<Counter />
							</div>
							<div>
								<h6>Playback Controls</h6>
								<PlaybackControls />
							</div>
							<div>
								<h6>Light/Dark Mode</h6>
								<ThemeToggle />
							</div>
							<div>
								<h6>Sign Out (Sidebar)</h6>
								<SignOut />
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
