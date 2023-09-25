"use client";

import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import PackageFilter from "@/components/dashboard/packages/filter";
import { CustomerColumns } from "./columns";
import { useToast } from "@/components/ui/use-toast";

export function DataTable({ data }) {
	const [sorting, setSorting] = useState([]);
	const [columnFilters, setColumnFilters] = useState([]);
	const [packages, setPackages] = useState([...data]);
	const columns = CustomerColumns(packages, setPackages);
	let { toast } = useToast();

	const table = useReactTable({
		data: packages,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	});

	const deletePackages = async function () {
		let packagesSelected = table.getSelectedRowModel().rows;
		let packageIds = [];
		let tempPackages = [...packages];

		if (packagesSelected.length == 0) {
			toast({
				title: "No packages selected",
				description: "Please select a package to delete!",
				variant: "destructive",
			});
			return;
		}
		for (let pkg in packagesSelected) {
			packageIds.push(packages[pkg].id);
		}
		setPackages([...tempPackages]);
		let response = await fetch("/api/packages", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				ids: packageIds,
			}),
		});

		let responseData = await response.json();
		if (response.ok && responseData) {
			toast({
				description: "Package Deleted Successfully!",
			});
			tempPackages = [...packages];
			for (let pkg in packagesSelected) {
				tempPackages.splice(pkg, 1);
			}
			setPackages([...tempPackages]);
			return;
		}
		toast({
			description: responseData.message || "Something went wrong",
		});
	};

	const changePackageStatusBulk = async function (status) {
		let packagesSelected = table.getSelectedRowModel().rows;
		let packageIds = [];
		let tempPackages = [...packages];

		if (packagesSelected.length == 0) {
			toast({
				title: "No packages selected",
				description: "Please select a package to update!",
				variant: "destructive",
			});
			return;
		}
		for (let pkg in packagesSelected) {
			packageIds.push(packages[pkg].id);
		}
		setPackages([...tempPackages]);
		let response = await fetch("/api/packages", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				ids: packageIds,
				status,
			}),
		});

		let responseData = await response.json();
		if (response.ok && responseData) {
			toast({
				description: "Package Updated Successfully!",
			});
			tempPackages = [...packages];
			for (let pkg in packagesSelected) {
				tempPackages[pkg].status = status;
			}
			setPackages([...tempPackages]);
			return;
		}
		toast({
			description: responseData.message || "Something went wrong",
		});
	};

	return (
		<>
			<PackageFilter
				filters={columnFilters}
				table={table}
				setPackages={setPackages}
				packages={packages}
				deletePackages={deletePackages}
				changePackageStatusBulk={changePackageStatusBulk}
			/>

			<div className="rounded-md border mt-3">
				<Table>
					<TableHeader>
						{table
							.getHeaderGroups()
							.map((headerGroup, headerIndex) => (
								<TableRow key={headerIndex}>
									{headerGroup.headers.map(
										(header, rowIndex) => {
											return (
												<TableHead
													key={rowIndex}
													className={
														"whitespace-nowrap"
													}
												>
													{header.isPlaceholder
														? null
														: flexRender(
																header.column
																	.columnDef
																	.header,
																header.getContext()
														  )}
												</TableHead>
											);
										}
									)}
								</TableRow>
							))}
					</TableHeader>
					<TableBody>
						{table?.getRowModel().rows?.length ? (
							table?.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={
										row.getIsSelected() && "selected"
									}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className={"whitespace-nowrap"}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</>
	);
}
