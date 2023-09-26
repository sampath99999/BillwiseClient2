"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import {
	DotsHorizontalIcon,
	DotsVerticalIcon,
	ReloadIcon,
} from "@radix-ui/react-icons";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { useForm } from "react-hook-form";
import { newPackageFormSchema } from "@/utils/forms";
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
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function VillageRowAction({ villages, setVillages, index }) {
	let { toast } = useToast();
	let [editLoading, setEditLoading] = useState(false);
	let [editDialogOpen, setEditDialogOpen] = useState(false);

	const deleteVillage = async function () {
		let tempVillages = villages;
		tempVillages[index].loading = true;
		setVillages([...tempVillages]);
		let response = await fetch("/api/villages", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				ids: [villages[index].id],
			}),
		});

		let responseData = await response.json();
		if (response.ok && responseData) {
			tempVillages.splice(index, 1);
			setVillages([...tempVillages]);
			toast({
				description: "Village Deleted Successfully!",
			});
			return;
		}
		tempVillages[0].loading = false;
		setVillages([...tempVillages]);
		toast({
			description: responseData.message || "Something went wrong",
		});
	};
	const form = useForm({
		resolver: zodResolver(newPackageFormSchema),
		defaultValues: {
			...villages[index],
		},
	});

	async function handleEdit(values) {}
	return (
		<AlertDialog>
			<Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className={"p-0 index h-8 w-8 focus-visible:ring-0"}
						>
							<DotsHorizontalIcon />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56">
						<DialogTrigger asChild>
							<DropdownMenuItem className="cursor-pointer">
								Edit
							</DropdownMenuItem>
						</DialogTrigger>
						<DropdownMenuItem>
							<AlertDialogTrigger className="w-full text-left">
								Delete
							</AlertDialogTrigger>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Edit Package</DialogTitle>
						<DialogDescription>
							Make changes to package here. Click save when you're
							done.
						</DialogDescription>
					</DialogHeader>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleEdit)}
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
									<FormItem
										className={"flex justify-between"}
									>
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
								<Button type="submit" disabled={editLoading}>
									<ReloadIcon
										className={
											"mr-2 h-4 w-4 animate-spin " +
											editLoading
												? "hidden"
												: ""
										}
									/>
									<span>Update</span>
								</Button>{" "}
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you sure you want to delete?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This will delete the package
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={() => deleteVillage()}>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
