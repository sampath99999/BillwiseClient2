"use client";
import { Checkbox } from "@/components/ui/checkbox";
import SortButton from "@/components/dashboard/sort-button";
import { Button } from "@/components/ui/button";
import {
	DotsVerticalIcon,
	Pencil2Icon,
	ReloadIcon,
} from "@radix-ui/react-icons";
import PackageRowAction from "@/components/dashboard/packages/rowAction";

export const CustomerColumns = (packages, setPackages) => {
	return [
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
			cell: ({ row }) =>
				row?.original?.loading ? (
					<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Checkbox
						checked={row.getIsSelected()}
						onCheckedChange={(value) => row.toggleSelected(!!value)}
						aria-label="Select row"
					/>
				),
		},
		{
			accessorKey: "name",
			header: ({ column }) => {
				return <SortButton name={"Name"} column={column} />;
			},
		},
		{
			accessorKey: "price",
			header: ({ column }) => {
				return <SortButton name={"Price"} column={column} />;
			},
			cell: ({ row }) => {
				return "₹ " + row?.original?.price;
			},
		},
		{
			accessorKey: "type",
			header: "Type",
			cell: ({ row }) => {
				return (
					<span>
						{[...row.original.type][0].toUpperCase() +
							[...row.original.type]
								.slice(1)
								.join("")
								.toLowerCase()}
					</span>
				);
			},
		},
		{
			accessorKey: "status",
			header: "Status",
			filterOperator: "eq",
			cell: ({ row }) => {
				if (row.original.status) {
					return (
						<div
							className={
								"p-2 text-green-500 flex gap-2 items-center"
							}
						>
							<span
								className={
									"px-1 py-1 bg-green-500 rounded-full"
								}
							></span>
							<span>Active</span>
						</div>
					);
				} else {
					return (
						<div
							className={
								"p-2 text-red-500 flex gap-2 items-center"
							}
						>
							<span
								className={"px-1 py-1 bg-red-500 rounded-full"}
							></span>
							<span>InActive</span>
						</div>
					);
				}
			},
			filterFn: (row, columnId, value) => {
				return (
					row.original.status === (value == "Active" ? true : false)
				);
			},
		},
		{
			id: "actions",
			cell: function ({ row }) {
				return (
					<PackageRowAction
						packages={packages}
						setPackages={setPackages}
						index={row.index}
					/>
				);
			},
		},
	];
};
