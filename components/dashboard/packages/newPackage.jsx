"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import { newPackageFormSchema } from "@/utils/forms";

export function NewPackageModal({ setPackages, packages }) {
	const { toast } = useToast();
	const [createLoading, setCreateLoading] = useState(false);
	const form = useForm({
		resolver: zodResolver(newPackageFormSchema),
		defaultValues: {
			name: "",
			price: "",
			type: "CHANNEL",
			status: true,
		},
	});

	async function handleCreate(values) {
		setCreateLoading(true);
		const res = await fetch("/api/packages/", {
			method: "POST",
			body: JSON.stringify(values),
			headers: { "Content-Type": "application/json" },
		});
		let resData = await res.json();
		setCreateLoading(false);
		if (res.ok && resData) {
			toast({
				description: "Package Created Successfully!",
			});
			form.reset();
			setPackages([...packages, resData.data]);
			return;
		}
		toast({
			description: resData?.message || "Something Went Wrong!",
		});
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={"secondary"} size={"sm"}>
					<PlusIcon />
					<span className="hidden md:inline">New Package</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create Package</DialogTitle>
					<DialogDescription>
						Enter New details about New Package
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleCreate)}
						className="space-y-5"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Package Name..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Price Per Month</FormLabel>
									<FormControl>
										<Input
											placeholder="Package Price..."
											{...field}
											type={"number"}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Type</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select Type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="CHANNEL">
													Channel
												</SelectItem>
												<SelectItem value="PACKAGE">
													Package
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem className={"flex justify-between"}>
									<FormLabel>Status</FormLabel>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit" disabled={createLoading}>
								<ReloadIcon
									className={
										"mr-2 h-4 w-4 animate-spin " +
										createLoading
											? "hidden"
											: ""
									}
								/>
								<span>Create</span>
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
