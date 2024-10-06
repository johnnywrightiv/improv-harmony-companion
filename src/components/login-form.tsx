'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
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

// Login form schema
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

// Password reset form schema
const resetSchema = z.object({
	email: z
		.string()
		.min(1, 'Email is required')
		.email('Invalid email address')
		.trim()
		.toLowerCase(),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type ResetFormValues = z.infer<typeof resetSchema>;

export default function LoginForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [isResetLoading, setIsResetLoading] = useState(false);
	const [resetEmailSent, setResetEmailSent] = useState(false);
	const [resetDialogOpen, setResetDialogOpen] = useState(false);

	const loginForm = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
			rememberMe: false,
		},
	});

	const resetForm = useForm<z.infer<typeof resetSchema>>({
		resolver: zodResolver(resetSchema),
		defaultValues: {
			email: '',
		},
	});

	async function onSubmit(data: LoginFormValues) {
		try {
			setIsLoading(true);

			// Simulate API call - replace with your actual API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			console.log('Login submitted:', {
				email: data.email,
				rememberMe: data.rememberMe,
				passwordLength: data.password.length, // log password length only, not the password
			});

			// Here you would typically:
			// 1. Send data to your API
			// 2. Handle the response
			// 3. Store tokens/session
			// 4. Redirect user
		} catch (error) {
			console.error('Login error:', error);
			// Here you would typically:
			// 1. Show error message to user
			// 2. Possibly retry the request
		} finally {
			setIsLoading(false);
		}
	}

	async function onResetSubmit(data: ResetFormValues) {
		try {
			setIsResetLoading(true);

			// Simulate API call - replace with your actual API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			console.log('Reset requested for:', data.email);

			// Here you would typically:
			// 1. Send reset request to your API
			// 2. Handle the response
			// 3. Show success message

			setResetEmailSent(true);

			// Reset form after successful submission
			resetForm.reset();
		} catch (error) {
			console.error('Reset error:', error);
			// Here you would typically:
			// 1. Show error message to user
			// 2. Possibly retry the request
		} finally {
			setIsResetLoading(false);
		}
	}

	function closeResetDialog() {
		setResetDialogOpen(false);
		setResetEmailSent(false);
		resetForm.reset();
	}

	return (
		<div className="mx-auto w-full max-w-md">
			<Form {...loginForm}>
				<form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-2">
						<h3 className="tracking-tight">Login</h3>
						<p className="text-muted-foreground text-sm">
							Enter your email and password to login to your account.
						</p>
					</div>

					<FormField
						control={loginForm.control}
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
									{loginForm.formState.errors.email && (
										<AlertCircle className="h-4 w-4" />
									)}
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>

					<FormField
						control={loginForm.control}
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
									{loginForm.formState.errors.password && (
										<AlertCircle className="h-4 w-4" />
									)}
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>

					<FormField
						control={loginForm.control}
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
									<FormDescription className="text-text-muted">
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
									<Button
										type="submit"
										className="w-full"
										disabled={isResetLoading}
									>
										{isResetLoading ? (
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
