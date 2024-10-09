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
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem, } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';


import { Counter } from '@/components/counter';
import { ThemeToggle } from '@/components/theme-toggle';
import { PlaybackControls } from '@/components/playback-controls';
import { SearchBar } from '@/components/search-bar';
import { SignOut } from '@/components/sign-out';
import LoginForm from '@/components/login-form';
import SignupForm from '@/components/signup-form';

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
							<h3 className="text-accent">Heading 3 (Playfair Display)</h3>
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

						{/* Decorative Text */}
						<div className="flex justify-between">
							<p className="decorative-text text-sm">
								Decorative Text (Pacifico)
							</p>
							<p className="text-sm text-text-muted">.875rem</p>
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
						{/* Buttons */}
						<Card>
							<CardHeader>
								<CardTitle>Buttons</CardTitle>
								<CardDescription>
									Various button styles and sizes
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex flex-wrap gap-4">
									<Button>Default</Button>
									<Button variant="secondary">Secondary</Button>
									<Button variant="destructive">Destructive</Button>
									<Button variant="outline">Outline</Button>
									<Button variant="ghost">Ghost</Button>
									<Button disabled>Disabled</Button>
									<Button size="sm">Small</Button>
									<Button size="lg">Large</Button>
									<Button>
										<Search className="mr-2 h-4 w-4" /> With Icon
									</Button>
								</div>
							</CardContent>
						</Card>

						{/* Toggle */}
						<Card>
							<CardHeader>
								<CardTitle>Toggle</CardTitle>
								<CardDescription>A two-state button</CardDescription>
							</CardHeader>
							<CardContent className="space-x-4">
								<Toggle>Toggle</Toggle>
								<Toggle defaultPressed>Pressed</Toggle>
								<Toggle disabled>Disabled</Toggle>
							</CardContent>
						</Card>

						{/* Inputs & Labels */}
						<Card>
							<CardHeader>
								<CardTitle>Inputs & Labels</CardTitle>
								<CardDescription>Text input fields</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<Input placeholder="Default input" />
								<Input placeholder="Disabled input" disabled />
								<div className="space-y-2">
									<Label htmlFor="labeled-input">Labeled Input</Label>
									<Input id="labeled-input" placeholder="Input with label" />
								</div>
							</CardContent>
						</Card>

						{/* Textarea */}
						<Card>
							<CardHeader>
								<CardTitle>Textarea</CardTitle>
								<CardDescription>Multi-line text input field</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<Textarea placeholder="Type your message here." />
							</CardContent>
						</Card>

						{/* Checkbox */}
						<Card>
							<CardHeader>
								<CardTitle>Checkbox</CardTitle>
								<CardDescription>Selectable checkbox inputs</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center space-x-2">
									<Checkbox id="terms" />
									<Label htmlFor="terms">Accept terms and conditions</Label>
								</div>
								<div className="flex items-center space-x-2">
									<Checkbox id="disabled" disabled />
									<Label htmlFor="disabled">Disabled checkbox</Label>
								</div>
							</CardContent>
						</Card>

						{/* Select */}
						<Card>
							<CardHeader>
								<CardTitle>Select</CardTitle>
								<CardDescription>Dropdown selection component</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<Select>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Select a fruit" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="apple">Apple</SelectItem>
										<SelectItem value="banana">Banana</SelectItem>
										<SelectItem value="blueberry">Blueberry</SelectItem>
										<SelectItem value="grapes">Grapes</SelectItem>
										<SelectItem value="pineapple">Pineapple</SelectItem>
									</SelectContent>
								</Select>
							</CardContent>
						</Card>

						{/* Switch */}
						<Card>
							<CardHeader>
								<CardTitle>Switch</CardTitle>
								<CardDescription>Toggle switch component</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center space-x-2">
									<Switch id="airplane-mode" />
									<Label htmlFor="airplane-mode">Airplane Mode</Label>
								</div>
							</CardContent>
						</Card>

						{/* Radio Group */}
						<Card>
							<CardHeader>
								<CardTitle>Radio Group</CardTitle>
								<CardDescription>Group of radio button inputs</CardDescription>
							</CardHeader>

							<CardContent className="space-y-4">
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
							</CardContent>
						</Card>

						{/* Sliders */}
						<Card>
							<CardHeader>
								<CardTitle>Sliders</CardTitle>
								<CardDescription>Range input sliders</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<Slider defaultValue={[50]} max={100} step={1} />
								<Slider defaultValue={[25, 75]} max={100} step={1} />
								<Slider defaultValue={[30]} max={100} step={1} disabled />
							</CardContent>
						</Card>

						{/* Avatar */}
						<Card>
							<CardHeader>
								<CardTitle>Avatar</CardTitle>
								<CardDescription>
									User profile pictures or placeholders
								</CardDescription>
							</CardHeader>
							<CardContent className="flex gap-4">
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
							</CardContent>
						</Card>

						{/* Cards */}
						<Card>
							<CardHeader>
								<CardTitle>Cards</CardTitle>
								<CardDescription>
									Versatile container for various types of content
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<Card>
									<CardHeader>
										<CardTitle>Simple Card</CardTitle>
										<CardDescription>
											A basic card with a header
										</CardDescription>
									</CardHeader>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle>Card with Content</CardTitle>
										<CardDescription>
											A card with a header and content
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
											A card with a header, content, and footer
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
							</CardContent>
						</Card>

						{/* Alerts */}
						<Card>
							<CardHeader>
								<CardTitle>Alerts</CardTitle>
								<CardDescription>Informational alert messages</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<Alert>
									<AlertTitle>Default Alert</AlertTitle>
									<AlertDescription>
										This is a default alert message.
									</AlertDescription>
								</Alert>
								<Alert className="border-error bg-error/10">
									<AlertTitle className="text-error">Error Alert</AlertTitle>
									<AlertDescription>
										This is an error alert message.
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
								<Alert className="border-success bg-success/10">
									<AlertTitle className="text-success">
										Success Alert
									</AlertTitle>
									<AlertDescription>
										This is a success alert message.
									</AlertDescription>
								</Alert>
							</CardContent>
						</Card>

						{/* Combobox */}
						{/* <Card>
							<CardHeader>
								<CardTitle>Combobox</CardTitle>
								<CardDescription>Searchable dropdown selection</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<Command className="rounded-lg border shadow-md">
									<CommandInput placeholder="Type a command or search..." />
									<CommandEmpty>No results found.</CommandEmpty>
									<CommandGroup heading="Suggestions">
										<CommandItem>Calendar</CommandItem>
										<CommandItem>Search Emoji</CommandItem>
										<CommandItem>Calculator</CommandItem>
									</CommandGroup>
								</Command>
							</CardContent>
						</Card> */}
					</TabsContent>

					<TabsContent value="molecules" className="space-y-8">
						{/* Search Bar */}
						<Card>
							<CardHeader>
								<CardTitle>Search Bar</CardTitle>
								<CardDescription>
									Combination of input and button
								</CardDescription>
							</CardHeader>
							<CardContent>
								<SearchBar />
							</CardContent>
						</Card>

						{/* Counter */}
						<Card>
							<CardHeader>
								<CardTitle>Counter</CardTitle>
								<CardDescription>
									Interactive counter with Redux integration
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Counter />
							</CardContent>
						</Card>

						{/* Theme Toggle */}
						<Card>
							<CardHeader>
								<CardTitle>Theme Toggle</CardTitle>
								<CardDescription>
									Switch between light and dark themes
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ThemeToggle />
							</CardContent>
						</Card>

						{/* Playback Controls */}
						<Card>
							<CardHeader>
								<CardTitle>Playback Controls</CardTitle>
								<CardDescription>
									Audio or video playback control buttons
								</CardDescription>
							</CardHeader>
							<CardContent>
								<PlaybackControls />
							</CardContent>
						</Card>

						{/* Dropdown Menu */}
						<Card>
							<CardHeader>
								<CardTitle>Dropdown Menu</CardTitle>
								<CardDescription>Expandable menu with options</CardDescription>
							</CardHeader>
							<CardContent>
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
							</CardContent>
						</Card>

						{/* Dialog */}
						<Card>
							<CardHeader>
								<CardTitle>Dialog</CardTitle>
								<CardDescription>
									Modal dialog for important actions
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Dialog>
									<DialogTrigger asChild>
										<Button variant="outline">Open Dialog</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Are you sure?</DialogTitle>
											<DialogDescription>
												This action cannot be undone.
											</DialogDescription>
										</DialogHeader>
										<div className="flex justify-end space-x-2">
											<Button variant="outline">Cancel</Button>
											<Button variant="destructive">Delete</Button>
										</div>
									</DialogContent>
								</Dialog>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="organisms" className="space-y-8">
						{/* Form Example */}
						<Card>
							<CardHeader>
								<CardTitle>Forms (Sign Up Form Example)</CardTitle>
								<CardDescription>User sign up form component</CardDescription>
							</CardHeader>
							<CardContent>
								<SignupForm />
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="templates" className="space-y-8">
						nothing yet check back later
					</TabsContent>
				</Tabs>
			</section>
		</div>
	);
}