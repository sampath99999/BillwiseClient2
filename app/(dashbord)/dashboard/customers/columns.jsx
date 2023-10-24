"use client";
import { Checkbox } from "@/components/ui/checkbox";
import SortButton from "@/components/dashboard/sort-button";
import Link from "next/link";

export const CustomerColumns = [
	{
		accessorKey: "index",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) =>
					table.toggleAllPageRowsSelected(!!value)
				}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
	},
	{
		accessorKey: "id",
		header: ({ column }) => {
			return <SortButton name={"ID"} column={column} />;
		},
	},
	{
		accessorKey: "name",
		header: ({ column }) => {
			return <SortButton name={"Name"} column={column} />;
		},
		cell: ({ row }) => {
			return (
				<Link href={"/dashboard/customers/" + row.original?.id}>
					{row.original?.first_name + " " + row.original?.last_name}
				</Link>
			);
		},
	},
	{
		accessorKey: "father_name",
		header: ({ column }) => {
			return <SortButton name={"Father Name"} column={column} />;
		},
	},
	{
		accessorKey: "phone_no",
		header: ({ column }) => {
			return <SortButton name={"Phone No"} column={column} />;
		},
	},
	{
		accessorKey: "street",
		header: ({ column }) => {
			return <SortButton name={"Street"} column={column} />;
		},
		cell: ({ row }) => row.original?.street?.name,
	},
	{
		accessorKey: "village",
		header: ({ column }) => {
			return <SortButton name={"Village"} column={column} />;
		},
		cell: ({ row }) => row.original?.village?.name,
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			if (row.original.status === "Active") {
				return (
					<div
						className={"p-2 text-green-500 flex gap-2 items-center"}
					>
						<span
							className={"px-1 py-1 bg-green-500 rounded-full"}
						></span>
						<span>Active</span>
					</div>
				);
			} else {
				return (
					<div className={"p-2 text-red-500 flex gap-2 items-center"}>
						<span
							className={"px-1 py-1 bg-red-500 rounded-full"}
						></span>
						<span>InActive</span>
					</div>
				);
			}
		},
	},
	{
		accessorKey: "last_active_date",
		header: ({ column }) => {
			return <SortButton name={"Last Active Date"} column={column} />;
		},
	},
	{
		header: "Actions",
		cell: function ({ row }) {
			return <></>;
		},
	},
];
