'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { Mail, Key, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from '@/components/ui/dialog';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
	email: z
		.string()
		.min(1, 'Email is required')
		.email('Invalid email address')
		.trim()
		.toLowerCase(),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(8, 'Password must be at least 8 characters')
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			'Password must contain uppercase, lowercase, number and special character'
		)
		.trim(),
	rememberMe: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const resetSchema = z.object({
	email: z
		.string()
		.min(1, 'Email is required')
		.email('Invalid email address')
		.trim()
		.toLowerCase(),
});

type ResetFormValues = z.infer<typeof resetSchema>;

export default function LoginForm() {
	const [resetDialogOpen, setResetDialogOpen] = useState(false);
	const [resetEmailSent, setResetEmailSent] = useState(false);
	const { login, isLoading, error, isAuthenticated } = useAuth();
	const router = useRouter();

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
			rememberMe: false,
		},
	});

	const resetForm = useForm<ResetFormValues>({
		resolver: zodResolver(resetSchema),
		defaultValues: {
			email: '',
		},
	});

	useEffect(() => {
		if (isAuthenticated) {
			console.log('User authenticated, redirecting to dashboard');
			router.push('/dashboard');
		}
	}, [isAuthenticated, router]);

	async function onSubmit(data: LoginFormValues) {
		console.log('Login submitted:', {
			email: data.email,
			rememberMe: data.rememberMe,
			passwordLength: data.password.length, // log password length only, not the password
		});
		await login(data.email, data.password);
		// Backend implementation:
		// 1. Validate credentials against the database
		// 2. Generate and store session token
		// 3. Return session token and user data
		// 4. Front-end stores session token in localStorage or secure cookie
	}

	async function onResetSubmit(data: ResetFormValues) {
		try {
			// Simulate API call - replace with your actual API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			console.log('Reset requested for:', data.email);
			setResetEmailSent(true);
			resetForm.reset();
			// Backend implementation:
			// 1. Generate a unique reset token and store it with the user's email and expiration time
			// 2. Send an email to the user with a link containing the reset token
			// 3. When the user clicks the link, verify the token and allow password reset
		} catch (error) {
			console.error('Reset error:', error);
		}
	}

	function closeResetDialog() {
		setResetDialogOpen(false);
		setResetEmailSent(false);
		resetForm.reset();
	}

	return (
		<div className="mx-auto w-full max-w-md">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-2">
						<h3 className="tracking-tight">Login</h3>
						<p className="text-sm text-muted-foreground">
							Enter your email and password to login to your account.
						</p>
					</div>

					{error && (
						<div className="flex items-center gap-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
							<AlertCircle className="h-4 w-4" />
							{error}
						</div>
					)}

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											placeholder="Enter your email"
											autoComplete="email"
											{...field}
											className="pl-10"
										/>
										<Mail className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
									</div>
								</FormControl>
								<div className="flex gap-2 text-destructive">
									{form.formState.errors.email && (
										<AlertCircle className="h-4 w-4" />
									)}
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											type="password"
											placeholder="Enter your password"
											autoComplete="current-password"
											{...field}
											className="pl-10"
										/>
										<Key className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
									</div>
								</FormControl>
								<div className="flex gap-2 text-destructive">
									{form.formState.errors.password && (
										<AlertCircle className="h-4 w-4" />
									)}
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="rememberMe"
						render={({ field }) => (
							<FormItem className="flex cursor-pointer flex-row items-start space-x-3 space-y-0">
								<FormControl>
									<Checkbox
										id="rememberMe"
										checked={field.value}
										onCheckedChange={field.onChange}
										role="checkbox"
										aria-checked={field.value}
										tabIndex={0} // Make it focusable via Tab
										onKeyDown={(e) => {
											if (e.key === ' ' || e.key === 'Enter') {
												// Toggle checkbox on Space or Enter key
												field.onChange(!field.value);
												e.preventDefault(); // Prevent default behavior (scrolling)
											}
										}}
									/>
								</FormControl>
								<div className="space-y-1 leading-none">
									<FormLabel htmlFor="rememberMe">Remember me</FormLabel>
									<FormDescription>
										Keep me logged in for 30 days
									</FormDescription>
								</div>
							</FormItem>
						)}
					/>

					<Button
						type="submit"
						className="w-full"
						tabIndex={0}
						disabled={isLoading}
						aria-busy={isLoading}
						aria-label={isLoading ? 'Logging in...' : 'Login'}
					>
						{isLoading ? (
							<>
								<Loader2
									className="mr-2 h-4 w-4 animate-spin"
									aria-hidden="true"
								/>{' '}
								Logging in...
							</>
						) : (
							<>
								Login
								<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />{' '}
							</>
						)}
					</Button>
				</form>
			</Form>

			<div className="mt-4">
				<Dialog
					open={resetDialogOpen}
					onOpenChange={setResetDialogOpen}
					aria-labelledby="reset-dialog-title"
					aria-describedby="reset-dialog-description"
				>
					<DialogTrigger asChild>
						<Button variant="link" className="p-0" tabIndex={0}>
							Forgot password?
						</Button>
					</DialogTrigger>

					<DialogContent>
						<DialogHeader>
							<DialogTitle id="reset-dialog-title">Reset Password</DialogTitle>
							<DialogDescription id="reset-dialog-description">
								Enter your email address and we&apos;ll send you a link to reset
								your password.
							</DialogDescription>
						</DialogHeader>

						<Form {...resetForm}>
							<form
								onSubmit={resetForm.handleSubmit(onResetSubmit)}
								className="space-y-4"
							>
								<FormField
									control={resetForm.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor="email">Email</FormLabel>
											<FormControl>
												<Input
													id="email"
													placeholder="Enter your email"
													autoComplete="email"
													{...field}
													aria-required="true"
													tabIndex={0} // Ensure the input is tabbable
												/>
											</FormControl>
											<FormMessage className="text-destructive" />
										</FormItem>
									)}
								/>

								{resetEmailSent ? (
									<div className="space-y-4">
										<p className="text-sm text-success">
											If an account exists for that email, you will receive a
											password reset link shortly.
										</p>
										<DialogClose asChild>
											<Button
												type="button"
												variant="secondary"
												className="w-full"
												onClick={closeResetDialog}
												aria-label="Close dialog"
												tabIndex={0}
											>
												Close
											</Button>
										</DialogClose>
									</div>
								) : (
									<Button
										type="submit"
										className="w-full"
										disabled={isLoading}
										aria-busy={isLoading}
										aria-label={
											isLoading ? 'Sending reset link...' : 'Send Reset Link'
										}
									>
										{isLoading ? (
											<>
												<Loader2
													className="mr-2 h-4 w-4 animate-spin"
													aria-hidden="true"
												/>
												Sending...
											</>
										) : (
											'Send Reset Link'
										)}
									</Button>
								)}
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
