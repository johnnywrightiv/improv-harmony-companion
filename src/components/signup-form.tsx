'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import {
	Mail,
	Key,
	User,
	AlertCircle,
	ArrowRight,
	Loader2,
	UserCircle,
	AtSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Sign-up form schema
const signupSchema = z
	.object({
		firstName: z
			.string()
			.min(1, 'First name is required')
			.max(50, 'First name must be 50 characters or less'),
		lastName: z
			.string()
			.min(1, 'Last name is required')
			.max(50, 'Last name must be 50 characters or less'),
		username: z
			.string()
			.min(3, 'Username must be at least 3 characters')
			.max(30, 'Username must be 30 characters or less')
			.regex(
				/^[a-zA-Z0-9_]+$/,
				'Username can only contain letters, numbers, and underscores'
			),
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
		confirmPassword: z.string().min(1, 'Please confirm your password'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<SignupFormValues>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	async function onSubmit(data: SignupFormValues) {
		try {
			setIsLoading(true);

			// Simulate API call - replace with your actual API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			console.log('Signup submitted:', {
				firstName: data.firstName,
				lastName: data.lastName,
				username: data.username,
				email: data.email,
				passwordLength: data.password.length, // log password length only, not the password
			});

			// Here you would typically:
			// 1. Send data to your API
			// 2. Handle the response
			// 3. Store tokens/session
			// 4. Redirect user
		} catch (error) {
			console.error('Signup error:', error);
			// Here you would typically:
			// 1. Show error message to user
			// 2. Possibly retry the request
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="mx-auto w-full max-w-md">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-2">
						<h3 className="tracking-tight">Sign Up</h3>
						<p className="text-muted-foreground text-sm">
							Create an account to get started.
						</p>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>First Name</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												placeholder="First name"
												{...field}
												className="pl-10"
											/>
											<User className="text-muted-foreground absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
										</div>
									</FormControl>
									<div className="flex gap-2 text-error">
										{form.formState.errors.firstName && (
											<AlertCircle className="h-4 w-4" />
										)}
										<FormMessage />
									</div>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last Name</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												placeholder="Last name"
												{...field}
												className="pl-10"
											/>
											<User className="text-muted-foreground absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
										</div>
									</FormControl>
									<div className="flex gap-2 text-error">
										{form.formState.errors.lastName && (
											<AlertCircle className="h-4 w-4" />
										)}
										<FormMessage />
									</div>
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											placeholder="Choose a username"
											{...field}
											className="pl-10"
										/>
										<AtSign className="text-muted-foreground absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
									</div>
								</FormControl>
								<div className="flex gap-2 text-error">
									{form.formState.errors.username && (
										<AlertCircle className="h-4 w-4" />
									)}
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>

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
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											type="password"
											placeholder="Confirm your password"
											{...field}
											className="pl-10"
										/>
										<Key className="text-muted-foreground absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
									</div>
								</FormControl>
								<div className="flex gap-2 text-error">
									{form.formState.errors.confirmPassword && (
										<AlertCircle className="h-4 w-4" />
									)}
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Signing up...
							</>
						) : (
							<>
								Sign Up
								<ArrowRight className="ml-2 h-4 w-4" />
							</>
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
}
