"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { DotsHorizontalIcon, ReloadIcon } from "@radix-ui/react-icons";
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
import { useForm } from "react-hook-form";
import { newVillageFormSchema } from "@/utils/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

export default function VillageRowAction({ villages, setVillages, index }) {
	let { toast } = useToast();
	let [editLoading, setEditLoading] = useState(false);
	let [editDialogOpen, setEditDialogOpen] = useState(false);

	const deleteVillage = async function () {
		let tempVillages = villages;
		tempVillages[index].loading = true;
		setVillages([...tempVillages]);
		if (parseInt(villages[index]._count.Streets) > 0) {
			toast({
				description:
					"Village cannot be removed, Please remove streets first.",
			});
			return;
		}
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
		resolver: zodResolver(newVillageFormSchema),
		defaultValues: {
			...villages[index],
		},
	});

	async function handleEdit(values) {
		let fieldsEdited = Object.keys(form.formState.dirtyFields);
		if (fieldsEdited.length === 0) {
			setEditDialogOpen(false);
			return false;
		}

		let editedVillage = {};
		for (const key of fieldsEdited) {
			if (values.hasOwnProperty(key)) {
				editedVillage[key] = values[key];
			}
		}

		let data = {
			id: villages[index].id,
			data: editedVillage,
		};

		setEditLoading(true);
		let response = await fetch("/api/villages", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		let responseData = await response.json();
		if (response.ok && responseData) {
			setEditDialogOpen(false);
			setEditLoading(false);
			villages[index] = responseData;
			setVillages([...villages]);
			toast({
				description: "Village Updated Successfully!",
			});
			return true;
		}
		setEditLoading(false);
		toast({
			description: responseData.message || "Something went wrong",
		});
	}
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
						<DialogTitle>Edit Village</DialogTitle>
						<DialogDescription>
							Make changes to Village here. Click save when you're
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
												placeholder="Village Name..."
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
										<FormLabel>Short Code</FormLabel>
										<FormControl>
											<Input
												placeholder="Village Short Code..."
												{...field}
												type={"text"}
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
									<span>Save</span>
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
