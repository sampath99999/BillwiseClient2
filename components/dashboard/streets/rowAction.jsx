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
import {
	newPackageFormSchema,
	newStreetFormSchema,
	newVillageFormSchema,
} from "@/utils/forms";
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

export default function StreetRowAction({ streets, setStreets, index }) {
	let { toast } = useToast();
	let [editLoading, setEditLoading] = useState(false);
	let [editDialogOpen, setEditDialogOpen] = useState(false);

	const deleteStreet = async function () {
		let tempStreets = streets;
		tempStreets[index].loading = true;
		setStreets([...tempStreets]);
		let response = await fetch("/api/streets", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				ids: [streets[index].id],
			}),
		});

		let responseData = await response.json();
		if (response.ok && responseData) {
			tempStreets.splice(index, 1);
			setStreets([...tempStreets]);
			toast({
				description: "Street Deleted Successfully!",
			});
			return;
		}
		tempStreets[0].loading = false;
		setStreets([...tempStreets]);
		toast({
			description: responseData.message || "Something went wrong",
		});
	};
	const form = useForm({
		resolver: zodResolver(newStreetFormSchema),
		defaultValues: {
			...streets[index],
		},
	});

	async function handleEdit(values) {
		let fieldsEdited = Object.keys(form.formState.dirtyFields);
		if (fieldsEdited.length === 0) {
			setEditDialogOpen(false);
			return false;
		}

		let editedStreet = {};
		for (const key of fieldsEdited) {
			if (values.hasOwnProperty(key)) {
				editedStreet[key] = values[key];
			}
		}

		let data = {
			id: streets[index].id,
			data: editedStreet,
		};

		setEditLoading(true);
		let response = await fetch("/api/streets", {
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
			streets[index] = responseData;
			setStreets([...streets]);
			toast({
				description: "Street Updated Successfully!",
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
						<DialogTitle>Edit Street</DialogTitle>
						<DialogDescription>
							Make changes to Street here. Click save when you're
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
												placeholder="Street Name..."
												{...field}
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
						This will delete the Street
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={() => deleteStreet()}>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
