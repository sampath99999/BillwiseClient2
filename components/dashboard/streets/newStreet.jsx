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
import { newStreetFormSchema } from "@/utils/forms";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export function NewStreetModal({ streets, setStreets, village_id }) {
	const { toast } = useToast();
	const [createLoading, setCreateLoading] = useState(false);
	const form = useForm({
		resolver: zodResolver(newStreetFormSchema),
		defaultValues: {
			name: "",
		},
	});

	async function handleCreate(values) {
		setCreateLoading(true);
		const res = await fetch("/api/streets/", {
			method: "POST",
			body: JSON.stringify({ ...values, village_id }),
			headers: { "Content-Type": "application/json" },
		});
		let resData = await res.json();
		setCreateLoading(false);
		if (res.ok && resData) {
			toast({
				description: "Street Created Successfully!",
			});
			form.reset();
			setStreets([...streets, resData.data]);
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
					<span className="hidden md:inline">New Street</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create Street</DialogTitle>
					<DialogDescription>
						Enter New details about New Street
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
