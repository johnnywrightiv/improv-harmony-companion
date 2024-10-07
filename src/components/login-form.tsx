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
						<p className="text-muted-foreground text-sm">
							Enter your email and password to login to your account.
						</p>
					</div>

					{error && (
						<div className="bg-destructive/15 flex items-center gap-2 rounded-md p-3 text-sm text-error">
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
										<Mail className="text-muted-foreground absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
									</div>
								</FormControl>
								<div className="flex gap-2 text-error">
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
										<Key className="text-muted-foreground absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
									</div>
								</FormControl>
								<div className="flex gap-2 text-error">
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
							<FormItem className="flex flex-row items-start space-x-3 space-y-0">
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className="space-y-1 leading-none">
									<FormLabel>Remember me</FormLabel>
									<FormDescription>
										Keep me logged in for 30 days
									</FormDescription>
								</div>
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Logging in...
							</>
						) : (
							<>
								Login
								<ArrowRight className="ml-2 h-4 w-4" />
							</>
						)}
					</Button>
				</form>
			</Form>

			<div className="mt-4">
				<Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
					<DialogTrigger asChild>
						<Button variant="link" className="p-0">
							Forgot password?
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Reset Password</DialogTitle>
							<DialogDescription>
								Enter your email address and we'll send you a link to reset your
								password.
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
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter your email"
													autoComplete="email"
													{...field}
												/>
											</FormControl>
											<FormMessage className="text-error" />
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
											>
												Close
											</Button>
										</DialogClose>
									</div>
								) : (
									<Button type="submit" className="w-full" disabled={isLoading}>
										{isLoading ? (
											<>
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
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