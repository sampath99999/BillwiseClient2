"use client";
import SortButton from "@/components/dashboard/sort-button";
import StreetRowAction from "@/components/dashboard/streets/rowAction";

export const StreetColumns = (streets, setStreets) => {
	return [
		{
			accessorKey: "name",
			header: ({ column }) => {
				return <SortButton name={"Name"} column={column} />;
			},
		},
		{
			id: "actions",
			cell: function ({ row }) {
				return (
					<StreetRowAction
						streets={streets}
						setStreets={setStreets}
						index={row.index}
					/>
				);
			},
		},
	];
};
