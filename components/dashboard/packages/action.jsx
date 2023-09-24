"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CheckIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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

export default function PackageAction({
	deletePackages,
	changePackageStatusBulk,
}) {
	const [loading, setLoading] = useState(false);
	const [bulkMethod, setBulkMethod] = useState();
	const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

	const handleBulkMethod = async () => {
		if (bulkMethod === "delete") {
			setDeleteConfirmOpen(true);
		}
		if (bulkMethod === "active") {
			setLoading(true);
			await changePackageStatusBulk(true);
			setLoading(false);
		}
		if (bulkMethod === "inactive") {
			setLoading(true);
			await changePackageStatusBulk(false);
			setLoading(false);
		}
	};

	const handleDeleteConfirm = async function () {
		setLoading(true);
		await deletePackages();
		setLoading(false);
	};
	return (
		<>
			<Select
				value={bulkMethod}
				onValueChange={(value) => {
					setBulkMethod(value);
				}}
			>
				<SelectTrigger className={"md:w-[200px]"}>
					<SelectValue placeholder={"Action"} />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value={"inactive"}>InActive</SelectItem>
					<SelectItem value={"active"}>Active</SelectItem>
					<SelectItem value={"delete"}>Delete</SelectItem>
				</SelectContent>
			</Select>
			<Button size={"sm"} onClick={handleBulkMethod} disabled={loading}>
				{loading && (
					<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
				)}
				<span className={"hidden md:inline"}>Apply</span>
				<span className={"inline md:hidden"}>
					<CheckIcon />
				</span>
			</Button>
			<AlertDialog
				open={isDeleteConfirmOpen}
				onOpenChange={setDeleteConfirmOpen}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Are you sure you want to delete?
						</AlertDialogTitle>
						<AlertDialogDescription>
							This will delete the selected packages!
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => handleDeleteConfirm()}
						>
							Delete Selected
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
