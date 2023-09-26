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
import {
	Select,
	SelectContent,
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
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { newVillageFormSchema } from "@/utils/forms";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export function NewVillageModal({ villages, setVillages }) {
	const { toast } = useToast();
	const [createLoading, setCreateLoading] = useState(false);
	const form = useForm({
		resolver: zodResolver(newVillageFormSchema),
		defaultValues: {
			name: "",
			shortcode: "",
		},
	});

	async function handleCreate(values) {
		setCreateLoading(true);
		const res = await fetch("/api/villages/", {
			method: "POST",
			body: JSON.stringify(values),
			headers: { "Content-Type": "application/json" },
		});
		let resData = await res.json();
		setCreateLoading(false);
		if (res.ok && resData) {
			toast({
				description: "Village Created Successfully!",
			});
			form.reset();
			setVillages([...villages, resData.data]);
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
					<span className="hidden md:inline">New Village</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create Village</DialogTitle>
					<DialogDescription>
						Enter New details about New Village
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
							name="shortcode"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger>
													Short Code
												</TooltipTrigger>
												<TooltipContent>
													<p>
														3 Characters small code
														which specifies village
														ex: Khammam - KMM
													</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Package Short Code..."
											{...field}
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
