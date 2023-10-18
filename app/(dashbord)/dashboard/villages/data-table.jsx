"use client";

import { useState } from "react";
import { VillageColumns } from "./columns";
import { useToast } from "@/components/ui/use-toast";
import {
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
	flexRender,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import VillageFilters from "@/components/dashboard/villages/filter";

export function VillageDataTable({ data }) {
	const [villages, SetVillages] = useState([...data]);
	const [sorting, setSorting] = useState([]);
	const [columnFilters, setColumnFilters] = useState([]);
	const columns = VillageColumns(villages, SetVillages);
	let { toast } = useToast();

	const table = useReactTable({
		data: villages,
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

	return (
		<>
			<VillageFilters
				villages={villages}
				table={table}
				setVillages={SetVillages}
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
