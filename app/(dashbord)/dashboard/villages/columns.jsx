"use client";
import { Checkbox } from "@/components/ui/checkbox";
import SortButton from "@/components/dashboard/sort-button";
import { ReloadIcon } from "@radix-ui/react-icons";
import VillageRowAction from "@/components/dashboard/villages/rowAction";
import { AiOutlineDelete } from "react-icons/ai";

export const VillageColumns = (villages, setVillages) => {
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
			accessorKey: "shortcode",
			header: ({ column }) => {
				return <SortButton name={"Short Code"} column={column} />;
			},
		},
		{
			accessorKey: "streets",
			header: ({ column }) => {
				return <SortButton name={"Streets"} column={column} />;
			},
		},
		{
			id: "actions",
			header: ({ table }) => {
				return (
					table.getIsAllPageRowsSelected() && (
						<AiOutlineDelete className="text-red-500" />
					)
				);
			},
			cell: function ({ row }) {
				return (
					<VillageRowAction
						packages={villages}
						setPackages={setVillages}
						index={row.index}
					/>
				);
			},
		},
	];
};
