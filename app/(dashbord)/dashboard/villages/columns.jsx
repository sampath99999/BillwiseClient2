"use client";
import { Checkbox } from "@/components/ui/checkbox";
import SortButton from "@/components/dashboard/sort-button";
import { ReloadIcon } from "@radix-ui/react-icons";
import VillageRowAction from "@/components/dashboard/villages/rowAction";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Link from "next/link";

export const VillageColumns = (villages, setVillages) => {
	return [
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
				return (
					<>
						<SortButton name={"Streets"} column={column} />
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<AiOutlineQuestionCircle />
								</TooltipTrigger>
								<TooltipContent>
									<p>Click on Count to see Streets</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</>
				);
			},
			cell: ({ row }) => {
				return (
					<Link href={"./villages/" + row.original?.id + "/streets"}>
						{row.original?._count?.Streets}
					</Link>
				);
			},
		},
		{
			id: "actions",
			cell: function ({ row }) {
				return (
					<VillageRowAction
						villages={villages}
						setVillages={setVillages}
						index={row.index}
					/>
				);
			},
		},
	];
};
