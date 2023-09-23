"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";

const FormSchema = z.object({
	username: z
		.string()
		.min(3, {
			message: "Username must be atleast 3 Characters long!",
		})
		.max(20, {
			message: "Username must be atmost 20 Characters long!",
		}),
	password: z
		.string()
		.min(3, {
			message: "Password must be atleast 3 Characters long!",
		})
		.max(50, {
			message: "Password must be atmost 50 Characters long!",
		}),
});

function Login() {
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});
	const [loading, setLoading] = useState(false);
	const params = useSearchParams();
	const router = useRouter();

	const onInit = () => {
		let errorMessages = {
			token_expired: "Please Login Again!",
			user_inactive: "User is inactive!",
			network_inactive: "Network is inactive!",
		};
		const error = params.get("error");
		if (error) {
			form.setError("username", {
				type: "manual",
				message: errorMessages[error],
			});
		}
		window.history.replaceState(null, "", "/login");
	};
	useEffect(() => {
		onInit();
	}, []);

	async function loginUser(values) {
		setLoading(true);
		const res = await signIn("credentials", {
			username: values.username,
			password: values.password,
			redirect: false,
		});
		if (res?.error) {
			form.setError("username", {
				type: "manual",
				message: res.error,
			});
			setLoading(false);
			return;
		}
		router.push("/dashboard");
	}

	return (
		<>
			<div className="w-3/4 lg:w-1/5 md:w-2/4 m-auto p-5 rounded-md py-14">
				<img src="/logo.png" alt="" className="w-[100px] m-auto" />
				<h3 className="text-center font-bold">Welcome Back</h3>
				<p className="text-center text-xs text-gray-400">
					Enter Your Realm: Login to Manage Your Network
				</p>
				<div className="my-10"></div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(loginUser)}
						className="space-y-5"
					>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											placeholder="sampath..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
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
										<Input
											placeholder="password..."
											{...field}
											type="password"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="w-full"
							disabled={loading}
						>
							{loading && (
								<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
							)}
							Log In
						</Button>
					</form>
				</Form>
			</div>
		</>
	);
}

export default Login;
