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
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { newCustomerFormSchema } from "@/utils/forms";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function NewStreetModal({ customers, setCustomers }) {
	const { toast } = useToast();
	const [createLoading, setCreateLoading] = useState(false);
	const [villages, setVillages] = useState([]);

	const form = useForm({
		resolver: zodResolver(newCustomerFormSchema),
	});

	async function init() {
		const res = await fetch("/api/villages/");
		let resData = await res.json();
		if (res.ok && resData) {
			if (resData.data.length == 0) {
				toast({
					description: "No Villages were found",
				});
				return false;
			}
			setVillages([...resData.data]);
			return;
		} else {
			toast({
				description: resData?.message || "Cannot fetch Villages",
			});
		}
	}

	useEffect(() => {
		init();
	}, []);

	async function handleCreate(values) {}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={"secondary"} size={"sm"}>
					<PlusIcon />
					<span className="hidden md:inline">New Customer</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create Customer</DialogTitle>
					<DialogDescription>
						Enter Customer Details
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
											placeholder="Street Name..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="village"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Village</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select Village" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{villages.map((village) => (
												<SelectItem value={village?.id}>
													{village?.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
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
