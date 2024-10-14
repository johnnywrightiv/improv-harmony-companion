'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
	Mail,
	Key,
	User,
	AlertCircle,
	ArrowRight,
	Loader2,
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
import { useAuth } from '@/lib/hooks/useAuth';

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
	const { signup, isLoading, error, isAuthenticated } = useAuth();
	const router = useRouter();

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

	useEffect(() => {
		if (isAuthenticated) {
			router.push('/dashboard');
		}
	}, [isAuthenticated, router]);

	async function onSubmit(data: SignupFormValues) {
		console.log('Signup submitted:', {
			email: data.email,
			firstName: data.firstName,
			lastName: data.lastName,
			username: data.username,
			passwordLength: data.password.length, // log password length only, not the password!
		});
		await signup(data.email, data.password, data.username);
	}

	return (
		<div className="mx-auto w-full max-w-md">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-2">
						<h3 className="tracking-tight">Sign Up</h3>
						<p className="text-sm text-muted-foreground">
							Create an account to get started.
						</p>
					</div>

					{error && (
						<div className="flex items-center gap-2 rounded-[--radius] bg-destructive/15 p-3 text-sm text-destructive">
							<AlertCircle className="h-4 w-4" />
							{error}
						</div>
					)}

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
											<User className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
										</div>
									</FormControl>
									<div className="flex gap-2 text-destructive">
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
											<User className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
										</div>
									</FormControl>
									<div className="flex gap-2 text-destructive">
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
										<AtSign className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
									</div>
								</FormControl>
								<div className="flex gap-2 text-destructive">
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
										<Key className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
									</div>
								</FormControl>
								<div className="flex gap-2 text-destructive">
									{form.formState.errors.confirmPassword && (
										<AlertCircle className="h-4 w-4" />
									)}
									<FormMessage />
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
						aria-label={isLoading ? 'Signing up...' : 'Sign up'}
					>
						{isLoading ? (
							<>
								<Loader2
									className="mr-2 h-4 w-4 animate-spin"
									aria-hidden="true"
								/>
								Signing up...
							</>
						) : (
							<>
								Sign Up
								<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />{' '}
							</>
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
}
